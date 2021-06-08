/*
* Implement a function that returns the summary of the current user's latest conversations,
* sorted by the latest message's timestamp (most recent conversation first).
*
* Make sure to have good unit tests in addition to the provided integration test!
*
* You have the following REST API available (base URL provided as a constant):
*
* Get current user's conversations: GET /conversations
* Get messages in a conversation: GET /conversations/:conversation_id/messages
* Get user by ID: GET /users/:user_id
*
* The result should be an array of objects of the following shape/type:
* {
*   id : string;
*   latest_message: {
*     body : string;
*     from_user : {
*       id: string;
*       avatar_url: string;
*     };
*     created_at : ISOString;
*   };
* }
*
*/
const API_BASE_URL = "https://rechomework.prd.mz.internal.unity3d.com/api";

async function getConversationsOfCurrentUser () {
	const response = await fetch(`${API_BASE_URL}/conversations`);
  return response.json();
}

async function getMessagesInConversation (conversation) {
	const response = await fetch(`${API_BASE_URL}/conversations/${conversation}/messages`);
  return response.json();
}

async function getUserById (user) {
	const response = await fetch(`${API_BASE_URL}/users/${user}`);
  return response.json();
}

async function getMessagesInConversations (conversations) {
	const messagesInConversations = await Promise.all(conversations.map(conversation => getMessagesInConversation(conversation.id)))
  return messagesInConversations.reduce((prev, next) => prev.concat(next));
}

async function getRecentConversationSummaries () {
  const conversations = await getConversationsOfCurrentUser();
  const messagesInConversations = await getMessagesInConversations(conversations);
  const userIds = messagesInConversations.map(message => message.from_user_id);
  const users = await Promise.all(userIds.map(getUserById));
  const summaries = conversations.map(conversation => {
  	const messages = messagesInConversations.filter(message => message.conversation_id === conversation.id);
    messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  	const latestMessage = messages[0];    
    const user = users.find(user => user.id === latestMessage.from_user_id);
  	return {
    	id: conversation.id,
      latest_message: {
      	id: latestMessage.id,
        body: latestMessage.body,
        from_user: {
        	id: user.id,
          avatar_url: user.avatar_url 
        },
        created_at: latestMessage.created_at
      }      
    };
  });
  summaries.sort((a, b) => new Date(b.latest_message.created_at) - new Date(a.latest_message.created_at));
  return summaries;  
}

// Configure Mocha, telling both it and chai to use BDD-style tests.
mocha.setup("bdd");
chai.should();

describe('getRecentConversationSummaries()', () => {
	it('should return the current user\'s latest conversations sorted by latest message\'s timestamp', async () => {
    const result = await getRecentConversationSummaries();
    console.log(result);
    result.should.deep.equal([
      {
        id: "1",
        latest_message: {
          id: "1",
          body: "Moi!",
          from_user: {
            id: "1",
            avatar_url: "http://placekitten.com/g/300/300",
          },
          created_at: "2016-08-25T10:15:00.670Z",
        },
      },
      {
        id: "2",
        latest_message: {
          id: "2",
          body: "Hello!",
          from_user: {
            id: "3",
            avatar_url: "http://placekitten.com/g/302/302",
          },
          created_at: "2016-08-24T10:15:00.670Z",
        },
      },
      {
        id: "3",
        latest_message: {
          id: "3",
          body: "Hi!",
          from_user: {
            id: "1",
            avatar_url: "http://placekitten.com/g/300/300",
          },
          created_at: "2016-08-23T10:15:00.670Z",
        },
      },
      {
        id: "4",
        latest_message: {
          id: "4",
          body: "Morning!",
          from_user: {
            id: "5",
            avatar_url: "http://placekitten.com/g/304/304",
          },
          created_at: "2016-08-22T10:15:00.670Z",
        },
      },
      {
        id: "5",
        latest_message: {
          id: "5",
          body: "Pleep!",
          from_user: {
            id: "6",
            avatar_url: "http://placekitten.com/g/305/305",
          },
          created_at: "2016-08-21T10:15:00.670Z",
        },
      },
    ]);
  });
  
   // TODO: Add more tests
  it('should have 5 conversations with current user', async () => {
  	const result = await getConversationsOfCurrentUser();
    result.length.should.equal(5);
  });

 
  it('should return conversations of the current user', async () => {
  	const result = await getConversationsOfCurrentUser();
    result.should.deep.equal(
        [{
          id: "1",
          unread_message_count: 1,
          with_user_id: "2"
        }, {
          id: "2",
          unread_message_count: 0,
          with_user_id: "3"
        }, {
          id: "3",
          unread_message_count: 0,
          with_user_id: "4"
        }, {
          id: "4",
          unread_message_count: 0,
          with_user_id: "5"
        }, {
          id: "5",
          unread_message_count: 0,
          with_user_id: "6"
    }]);
  })
  
  it('should return messages in conversation by id', async () => {
  	const result = await getMessagesInConversation("1");
    result.should.deep.equal([{
      body: "Moi!",
      conversation_id: "1",
      created_at: "2016-08-25T10:15:00.670Z",
      from_user_id: "1",
      id: "1"
		}]);
  });
  
  it('should fetch the user', async () => {
  	const result = await getUserById("1");
    result.avatar_url.should.equal("http://placekitten.com/g/300/300");
    result.id.should.equal("1");
    result.username.should.equal("John");
  })
  
  it('should fetch all the messages in all the conversations', async () => {
  	const conversations = await getConversationsOfCurrentUser();
    const result = await getMessagesInConversations(conversations);
    result.length.should.equal(6);
  })
  
});

// Run all our test suites.  Only necessary in the browser.
mocha.run();
    

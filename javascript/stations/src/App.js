import { ApolloProvider } from '@apollo/client';
import Stations from './components/Stations';
import './App.css';
import client from './api/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Stations />
    </ApolloProvider>
  );
}

export default App;

package tests;
import java.util.List;
import java.util.ArrayList;
/*
 * 
Problem Statement

You are provided with a list of transactions representing consumers' purchases.
Each transaction can be either approved or rejected based on total sum of approved purchases the consumer made so far.
Specifically the transaction is rejected if total sum of purchases would increase above a certain number - creditLimit.
Otherwise the transaction is approved.

Your task is to process the list of transactions and return list of the rejected ones.
Input

You should write a function called findRejectedTransactions, which takes as input a list
of transactions to process and a creditLimit integer.

List<String> findRejectedTransactions(List<String> transactions, int creditLimit);

Transactions are provided in a CSV format. An example transaction may look this:

"John,Doe,john@doe.com,30,TR000"

Each transaction contains consumer details as well as an amount and an id:

    first name
    last name
    email
    amount
    transaction id

You should expect all the transactions being valid and containing all of the information listed above.

Additionally there is a creditLimit >= 0 defined that is equal to all the consumers.
Output

The function should return a list of Strings listing the transactions that supposed to be rejected
if the transactions were to be processed in a sequential manner following the initial order of elements.

A consumer is uniquely identified by all three of first name, last name and email,
i.e. two persons with equal names but different emails have separate credit line.
Examples

    findRejectedTransactions([], 0) returns empty list []
    findRejectedTransactions(["John,Doe,john@doe.com,200,TR0001"], 200) returns empty list [] - the only John Doe's transaction is approved
    findRejectedTransactions(["Jane,Doe,jane@doe.com,201,TR0001"], 200) returns empty list [TR0001] - the only Jane Doe's transaction is rejected since its amount 201 is greater than creditLimit = 200
    findRejectedTransactions(["Jane,Doe,jane@doe.com,199,TR0001", "Jane,Doe,jane@doe.com,2,TR0002"], 200) returns [TR0002] as approving the second transaction would make the credit limit exceeded


 */
public class Transactions {

	public static List<String> findRejectedTransactions(List<String> transactions, int creditLimit) {
		final List<String> failedTransactions = new ArrayList<>();
		final List<Transaction> passedTransactions = new ArrayList<>();
		transactions
		.stream()
		.map((transaction) -> transactionFromString(transaction))
		.forEach(transaction -> {
			if (transaction.transactionAmount > creditLimit 
					|| isTransactionLimitReached(transaction, passedTransactions, creditLimit)) {
				failedTransactions.add(transaction.code);
			} else {
				passedTransactions.add(transaction);
			}
		});
		return failedTransactions;
	}

	private final static class Transaction {
		private final String firstName;
		private final String lastName;
		private final String email;
		private final Integer transactionAmount;
		private final String code;		

		private Transaction(String firstName, String lastName, String email, 
				Integer transactionAmount, String code) {
			this.firstName = firstName;
			this.lastName = lastName;
			this.email = email;
			this.transactionAmount = transactionAmount;
			this.code = code;
		};

		private boolean sameUser(Transaction transaction) {
			return this.firstName.equals(transaction.firstName)
					&& this.lastName.equals(transaction.lastName)
					&& this.email.equals(transaction.email);
		}
	}

	private static boolean isTransactionLimitReached(Transaction transaction, List<Transaction> others, int creditLimit) {
		final Integer sumOfPreviousTransactions = others.stream()
				.filter(another -> transaction.sameUser(another))
				.mapToInt(another -> another.transactionAmount.intValue())
				.sum();
		return (transaction.transactionAmount + sumOfPreviousTransactions) > creditLimit;
	}

	private static Transaction transactionFromString(String transaction) {
		String[] transactionArray = transaction.split(",");
		return new Transaction(
				transactionArray[0],
				transactionArray[1],
				transactionArray[2],
				Integer.parseInt(transactionArray[3]),
				transactionArray[4]);
	}
}
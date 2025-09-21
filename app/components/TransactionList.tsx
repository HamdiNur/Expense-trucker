import { Transaction } from "@/types/Transaction";
import TransactionItem from "./TransactionItem";
import getTransactions from "../action/getTransaction";
const TransactionList = async () => {
  const { transactions, error } = await getTransactions(); // <-- use "transactions"

  if (error) return <p>{error}</p>;
  if (!transactions || transactions.length === 0) return <p>No transactions yet</p>;

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((t: Transaction) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;

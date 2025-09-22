// app/page.tsx
import AddTransaction from "./components/AddTransaction";
import Balance from "./components/Balance";
import Guest from "./components/Guest";
import { checkUser } from "@/lib/checkUser";
import IncomeExpense from "./components/IncomeExpense";
import TransactionList from "./components/TransactionList";
export default async function HomePage() {
  const user = await checkUser(); // <- ensures user is created in DB

  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h2>Welcome, {user.name || "User"}</h2>
     
        <Balance/>
        <IncomeExpense/>
      <AddTransaction/>
      <TransactionList/>
    </main>
  );
}

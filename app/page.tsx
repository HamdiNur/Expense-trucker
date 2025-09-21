// app/page.tsx
import AddTransaction from "./components/AddTransaction";
import Guest from "./components/Guest";
import { checkUser } from "@/lib/checkUser";

export default async function HomePage() {
  const user = await checkUser(); // <- ensures user is created in DB

  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h1>Welcome, {user.name || "User"}</h1>
      <AddTransaction/>
    </main>
  );
}

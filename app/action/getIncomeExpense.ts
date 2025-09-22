"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Find the DB user linked to Clerk userId
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return { error: "User not found in DB" };

    // Query transactions by DB user.id
    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
    });

    const amounts = transactions.map((t) => t.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => acc + item, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => acc + item, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    console.error(error);
    return { error: "Database error" };
  }
}

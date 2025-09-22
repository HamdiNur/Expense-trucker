"use server";

import { db } from "@/lib/db";
import { Transaction } from "@/types/Transaction";
import { auth } from "@clerk/nextjs/server";

export default async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return { error: "User not found in DB" };

    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { transactions }; // ✅ consistent naming
  } catch (error) {
    console.error(error);
    return { error: "Database error" };
  }
}

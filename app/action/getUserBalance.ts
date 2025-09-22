"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export default async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // 🔑 Find the DB user linked to Clerk userId
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return { error: "User not found in DB" };

    // ✅ Now query transactions by DB user.id
    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
    });

    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return { balance };
  } catch (error) {
    console.error(error);
    return { error: "Database error" };
  }
}

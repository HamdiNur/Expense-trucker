"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function deleteTransaction(
  transactionId: string
): Promise<{ message?: string; error?: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not found" };
  }

  try {
    // Find DB user by Clerk ID
    const user = await db.user.findUnique({ where: { clerkUserId: userId } });
    if (!user) return { error: "User not found in DB" };

    // Delete transaction
    await db.transaction.deleteMany({
      where: { id: transactionId, userId: user.id },
    });

    // Revalidate the page
    revalidatePath("/");

    return { message: "Transaction deleted" };
  } catch (error) {
    console.error(error);
    return { error: "Database error" };
  }
}

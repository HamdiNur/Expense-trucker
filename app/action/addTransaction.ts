"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

export default async function addTransaction(
  formData: FormData
): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  if (!textValue || textValue === "" || !amountValue) {
    return { error: "Text or amount is missing" };
  }

  const text = textValue.toString();
  const amount = parseFloat(amountValue.toString());

  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) return { error: "User not found in DB" };

  try {
    const transaction = await db.transaction.create({
      data: {
        text,
        amount,
        userId: user.id,
      },
    });

    // Revalidate home page after adding transaction
    revalidatePath("/");

    return { data: { text: transaction.text, amount: transaction.amount } };
  } catch (error) {
    console.error(error);
    return { error: "Transaction not added" };
  }
}

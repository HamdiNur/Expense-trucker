"use server";

import { currentUser } from "@clerk/nextjs/server";
import {db} from "@/lib/db"; // db.ts should export PrismaClient

export async function checkUser() {
  const user = await currentUser();
  console.log("Clerk currentUser():", user);

  if (!user) return null;

  let loggedInUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (loggedInUser) return loggedInUser;

  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      imageUrl: user.imageUrl,
      email: user.primaryEmailAddress?.emailAddress ?? "",
    },
  });

  console.log("New user created:", newUser);
  return newUser;
}

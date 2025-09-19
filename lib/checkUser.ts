// app/actions/checkUser.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;

  const loggedInUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (loggedInUser) return loggedInUser;

  return db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
}

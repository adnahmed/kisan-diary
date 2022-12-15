import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

type UserCreateInput = Omit<User, "createdAt" | "updatedAt" | "id">;
export async function createUser(user: UserCreateInput & { password: string }) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  try {
    return await prisma.user.create({
      data: {
        ...user,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    return null;
  }
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

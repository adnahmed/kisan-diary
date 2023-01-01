import type { User } from "@prisma/client";

export type UserCreateInput = Omit<User, "createdAt" | "updatedAt" | "id" | "regionName"> & { region: string };

export type UserResult = Omit<User, "createdAt" | "updatedAt" | "id" | "region"> 
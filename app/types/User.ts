import type { User } from "@prisma/client";

export type UserCreateInput = Omit<User, "createdAt" | "updatedAt" | "id" | "fromRegion"> & { region: string }

export type UserResult = Omit<User, "createdAt" | "updatedAt" | "id" | "region"> 
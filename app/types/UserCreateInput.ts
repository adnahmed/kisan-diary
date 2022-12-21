import type { User } from "@prisma/client";

type UserCreateInput = Omit<User, "createdAt" | "updatedAt" | "id" | "regionName"> & { region: string };
export default UserCreateInput;
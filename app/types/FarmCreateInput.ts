import type { Farm } from "@prisma/client";

type FarmCreateInput = Omit<Farm,
    "id" | "owner" |
    "createdAt" | "updatedAt" | "regionName"> & { region: string }
export default FarmCreateInput;
import type { Alert } from "@prisma/client";

type AlertCreateInput = Omit<Alert, "createdAt" | "updatedAt" | "id">;
export default AlertCreateInput;

import type { Alert } from "@prisma/client";

type AlertOutput = { createdAt: string; updatedAt: string } & Omit<
  Alert,
  "createdAt" | "updatedAt"
>;

export default AlertOutput;

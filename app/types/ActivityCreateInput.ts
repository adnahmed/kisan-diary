import type { Activity } from "@prisma/client";
import type { SetOptional } from 'type-fest';
type ActivityCreateInput = SetOptional<Omit<Activity, "id" | "createdAt" | "updatedAt">, "quanity" | "unitCost">
export default ActivityCreateInput;
import type { Activity } from "@prisma/client";

type ActivityWithTotalCost = Activity & { totalCost?: number };

export default ActivityWithTotalCost;
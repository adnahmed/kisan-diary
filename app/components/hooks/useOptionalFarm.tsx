import type { Farm } from "@prisma/client";
import { useMatchesData } from "~/utils";

export function useOptionalFarm(): Farm | undefined {
  const data = useMatchesData("root");
  if (!data || !isFarm(data.farm)) {
    return undefined;
  }
  return data.farm;
}
function isFarm(farm: any): farm is Farm {
  return farm && typeof farm === "object" && typeof farm.id === "string";
}

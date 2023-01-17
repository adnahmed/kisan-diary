import type ActivityCreateInput from "~/types/ActivityCreateInput";

export function SeedToActivity(seed: ActivityCreateInput[]) {
    return seed.map(activity => ({
        type: activity.type,
        name: activity.name,
        isOperation: activity.isOperation,
        quanity: activity.quanity,
        unitCost: activity.unitCost,
    }))
}
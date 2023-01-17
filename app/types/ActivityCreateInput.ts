import type { ActivityType } from "@prisma/client"

type ActivityCreateInput = {
    id?: string
    type: ActivityType
    name: string
    isOperation: boolean
    quanity?: number | null
    unitCost?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
}
export default ActivityCreateInput;
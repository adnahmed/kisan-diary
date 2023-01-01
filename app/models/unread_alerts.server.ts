import type { Crop, Farm, User } from "@prisma/client";
import { prisma } from "~/db.server";
interface UnreadAlertConditionProps {
    user: User; crops: Crop[]; farm: Farm
}
export const UnreadAlertCondition = (props: UnreadAlertConditionProps) => ({
    AND: {
        NOT: {
            readBy: {
                id: props.user.id
            }
        },
        alert: {
            affectedCrops: {
                every: {
                    id: { in: props.crops.map((crop) => crop.id) },
                },
            },
            affectedRegions: {
                every: {
                    name: props.farm.regionName,
                },
            },
        }
    },
});

async function fetchUnreadAlerts(props: UnreadAlertConditionProps) {
    return await prisma.alert.findMany({
        where: {
            ReadReciept: {
                every: {
                    ...UnreadAlertCondition({ user: props.user, crops: props.crops, farm: props.farm })
                },
            },
        },
        include: {
            affectedRegions: true,
            affectedCrops: true,
            _count: {
                select: { affectedCrops: true, affectedRegions: true },
            },
        },
    })
}

export default fetchUnreadAlerts;
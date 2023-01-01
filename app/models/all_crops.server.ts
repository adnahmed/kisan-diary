import type { Farm } from "@prisma/client";
import { prisma } from "~/db.server";

async function fetchAllCrops(farm: Farm) {
    return await prisma.crop.findMany({
        where: {
            farms: {
                every: {
                    id: farm.id,
                },
            },
        },
    });
}
export default fetchAllCrops;
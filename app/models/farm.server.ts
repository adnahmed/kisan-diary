import type { User } from "@prisma/client";
import { prisma } from "~/db.server";

async function fetchFarm(user: User) {
    return await prisma.farm.findUnique({
        where: {
            owner: user.id,
        },
    });
}

export default fetchFarm;
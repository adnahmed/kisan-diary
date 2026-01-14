import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) return json({ count: 0 });

  const count = await prisma.alert.count({
    where: {
      isRead: false,
      farmerId: user.id
    },
  });

  return json({ count });
}

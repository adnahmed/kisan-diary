import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import fetchAllCrops from "~/models/all_crops.server";
import fetchFarm from "~/models/farm.server";
import fetchUnreadAlerts from "~/models/unread_alerts.server";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Response("Crops Not Found");
  const farm = await fetchFarm(user);
  if (!farm) throw new Response("Crops Not Found");
  const crops = await fetchAllCrops(farm);
  if (!crops) throw new Response("Crops Not Found");
  return json({
    unread_alerts: await fetchUnreadAlerts({ user, farm, crops }),
  });
}

import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import fetchFarm from "~/models/farm.server";
import { getUser } from "~/session.server";
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  if (url.pathname === "/farmer") return redirect("/farmer/home");
  const user = await getUser(request);
  if (!user) throw new Response("Unable to Fetch Farm Information");
  return json({
    farm: await fetchFarm(user),
  });
}
export default function Home() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { route } from "routes-gen";
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  if (url.pathname === route("/farmer")) return redirect(route("/farmer/home"));
  return null;
}
export default function Home() {
  return <Outlet />;
}

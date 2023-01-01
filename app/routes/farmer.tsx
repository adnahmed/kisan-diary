import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  if (url.pathname === "/farmer") return redirect("/farmer/home");
  return null;
}
export default function Home() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

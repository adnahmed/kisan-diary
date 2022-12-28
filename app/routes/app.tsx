import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/index.css";
export const links: LinksFunction = () => [
  {
    href: styles,
    rel: "stylesheet",
  },
  {
    rel: "preload",
    href: "/public/favicon.ico",
  },
];
export async function loader({ request }) {
  const url = new URL(request.url);
  const user = await getUser(request);
  if (user && url.pathname === "/app") redirect(`/app/${user.role}/home`);
  return {};
}

export default function App() {
  return <Outlet />;
}

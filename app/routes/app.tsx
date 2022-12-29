import { Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import Header from "~/components/pages/Header";
import LandingContent from "~/components/pages/LandingContent";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/index.css";
import Footer from "../components/pages/Footer";

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
  return {
    user: user,
  };
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <Header isLoggedIn={user !== undefined} />
      <Outlet />
      {user === undefined && <LandingContent />}
      <Footer />
    </>
  );
}

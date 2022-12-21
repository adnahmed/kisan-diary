import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUser } from "~/session.server";

export async function loader({ request }) {
  const user = await getUser(request);
  return user ? redirect(`/app/${user.role}`) : {};
}
const LandingPage = () => <Outlet />;
export default LandingPage;

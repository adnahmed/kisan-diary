import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { route } from "routes-gen";

import { logout } from "~/session.server";

export async function action({ request }: ActionArgs) {
  return logout(request);
}

export async function loader() {
  return redirect(route("/"));
}

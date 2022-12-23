import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
export async function loader({ request }: LoaderArgs) {
  return redirect("/app");
}
export default function () {
  return <div>Index Route</div>;
}

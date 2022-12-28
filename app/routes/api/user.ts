import { getUser } from "~/session.server";
export async function loader({ request }) {
  return {
    user: await getUser(request),
  };
}

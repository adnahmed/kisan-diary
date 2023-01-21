import type { ActionArgs } from "@remix-run/server-runtime";
import { unstable_parseMultipartFormData } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import { SPREADSHEET_ROOT } from "~/helpers/FDSheet";
import uploadHandler from "~/helpers/uploadHandler";
import { getUser } from "~/session.server";

export async function action({ request }: ActionArgs) {
  try {
    const user = await getUser(request);
    if (!user) throw new Error("Unauthenticated");
    const form = await unstable_parseMultipartFormData(
      request,
      uploadHandler(true, SPREADSHEET_ROOT)
    );
    const file = form.get("file");
    return {
      path: file?.filepath,
    };
  } catch (err) {
    if (err instanceof Error) return typedjson({ error: err.message });
    else return typedjson({ error: err });
  }
}

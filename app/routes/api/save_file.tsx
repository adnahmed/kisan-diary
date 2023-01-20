import type { ActionArgs } from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import uploadHandler, {
  DefaultDownloadDirectory,
} from "~/helpers/uploadHandler";

export async function action({ request }: ActionArgs) {
  try {
    const form = await unstable_parseMultipartFormData(
      request,
      uploadHandler()
    );
    const file = form.get("file");
    const formFilename = form.get("filename");
    const filename = file?.filepath.split("\\").pop();
    return {
      uploadedUrl: `/${DefaultDownloadDirectory.split("/").pop()}/${
        formFilename || filename
      }`,
    };
  } catch (err) {
    if (err instanceof Error) return json({ error: err.message });
    else return json({ error: err });
  }
}

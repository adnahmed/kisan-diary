import type { ActionArgs } from "@remix-run/server-runtime";
import {
  json,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";
import { prisma } from "~/db.server";
import uploadHandler, {
  DefaultDownloadDirectory,
} from "~/helpers/uploadHandler";
import { getUser } from "~/session.server";

export async function action({ request }: ActionArgs) {
  try {
    const user = await getUser(request);
    if (!user)
      throw new Error(
        "Failed uploading file. error: Could not verify identity."
      );
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler()
    );
    const filenames = formData.getAll("filename");
    const files = formData.getAll("file");
    const uploadedUrls = [];
    let prismaData = [];
    for (const file of files) {
      let filename = file?.filepath.split("\\").pop();
      let path = `/${DefaultDownloadDirectory.split("/").pop()}/${filename}`;
      uploadedUrls.push({ url: path });
      if (user?.id)
        prismaData.push({
          name: path,
          userId: user.id,
        });
    }
    await prisma.expertFile.createMany({
      data: prismaData,
    });
    return {
      uploadedUrls,
    };
  } catch (err) {
    if (err instanceof Error) return json({ error: err.message });
    else return json({ error: err });
  }
}

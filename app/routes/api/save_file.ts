import type { ActionArgs } from "@remix-run/node";
import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
export async function action({ request }: ActionArgs) {
    const directory = "public/uploaded"
    const uploadHandler = unstable_composeUploadHandlers(
        unstable_createFileUploadHandler({
            maxPartSize: 5_000_000,
            file: ({ filename }: { filename: string }) => filename,
            directory: directory
        }),
        unstable_createMemoryUploadHandler()
    );
    try {

        const form = await unstable_parseMultipartFormData(request, uploadHandler);
        const file = form.get('file')
        const filename = file?.filepath.split('\\').pop()
        return {
            uploadedUrl: `/${directory.split('/').pop()}/${filename}`
        }
    } catch (err) {
        console.log(err)
        return null;
    }
};
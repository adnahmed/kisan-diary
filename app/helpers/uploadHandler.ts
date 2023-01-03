import {
    unstable_composeUploadHandlers,
    unstable_createFileUploadHandler,
    unstable_createMemoryUploadHandler,
} from '@remix-run/node';

export const directory = "public/uploaded";
const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
        maxPartSize: 5_000_000_000_000,
        file: ({ filename }: { filename: string }) => filename,
        directory: directory,
    }),
    unstable_createMemoryUploadHandler()
);

export default uploadHandler;
import {
    unstable_composeUploadHandlers,
    unstable_createFileUploadHandler,
    unstable_createMemoryUploadHandler,
} from '@remix-run/node';
export const DefaultDownloadDirectory = "public/uploaded"
const uploadHandler = (override = false, directory = DefaultDownloadDirectory) => unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
        maxPartSize: 5_000_000_000_000,
        file: ({ filename }: { filename: string }) => filename,
        directory: directory,
        avoidFileConflicts: !override
    }),
    unstable_createMemoryUploadHandler()
);
export default uploadHandler;
import { ExampleChatService } from "@chatscope/use-chat/dist/examples/ExampleChatService";
/* Storage needs to generate id for messages and groups */

// create serviceFactory
export const serviceFactory = (storage, updateState) => {
    return new ExampleChatService(storage, updateState);
};

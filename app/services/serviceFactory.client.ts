import type { IStorage, UpdateState } from "@chatscope/use-chat";
import ChatService from './ChatService';
import client_socket from "./chat.client";
/* Storage needs to generate id for messages and groups */

// create serviceFactory
export const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
    return new ChatService(storage, updateState, client_socket);
};

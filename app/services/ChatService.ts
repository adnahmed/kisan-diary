import type { ChatEvent, ChatEventHandler, ChatEventType, IChatService, IStorage, SendMessageServiceParams, SendTypingServiceParams, UpdateState } from "@chatscope/use-chat";
import type { Socket } from "socket.io-client";
import type EventHandlers from "~/types/EventHandlers";

class ChatService implements IChatService {
    eventHandlers: EventHandlers
    storage?: IStorage
    client_socket: Socket
    updateState: UpdateState
    constructor(storage: IStorage, update: UpdateState, client_socket: Socket) {
        // TODO: Add Event Handlers here...
        this.eventHandlers = {
            onMessage: (event: MessageEvent) => {
                /**
                 * TODO:
                 * 1. Add a message to the conversation to which the message was sent.
                 * 2. If a convo with given id exists and not active, 
                 * its unreadCounter will increment.
                 * 3. Remove Information about the sender who is writing from the conversation.
                 * 4. Re-render. 
                 * 
                 * NOTE!
                 // If a conversation with such id does not exist,
                 // the message will be added, but the conversation object will not be created.
                 // You have to take care of such a case yourself.
                 // You can check here if there is already a conversation in storage.
                 // If it is not there, you can create it before calling onMessage.
                 // After adding a conversation to the list, you don't need to manually run updateState
                 // because ChatProvider in onMessage will do it.
                 */

            },
            onConnectionStateChanged: () => { },
            onUserConnected: () => { },
            onUserDisconnected: () => { },
            onUserPresenceChanged: () => { },
            onUserTyping: () => {
                /*
                1. Add the user to list of users are typing in the conversation.
                2. Debounce
                3. Re-render
                */
            },
        }
        this.storage = storage;
        this.updateState = update;
        this.client_socket = client_socket
        /* 
        TODO: attach event handler for `chat-protocol` 
        1. Check type of event
        2. Verify if the sender is not same as reciever
        3. Initiate appropriate event on class

        */

    }
    // The ChatProvider registers callbacks with the service.
    // These callbacks are necessary to notify the provider of the changes.
    // For example, when your service receives a message, you need to run an onMessage callback,
    // because the provider must know that the new message arrived.
    // Here you need to implement callback registration in your service.
    on<T extends ChatEventType, H extends ChatEvent<T>>(evtType: T, evtHandler: ChatEventHandler<T, H>) {
        const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
        if (key in this.eventHandlers) {
            this.eventHandlers[key] = evtHandler;
        }
    }
    // The ChatProvider can unregister the callback.
    // In this case remove it from your service to keep it clean.
    off<T extends ChatEventType, H extends ChatEvent<T>>(evtType: T, evtHandler: ChatEventHandler<T, H>) {
        const key = `on${evtType.charAt(0).toUpperCase()}${evtType.substring(1)}`;
        if (key in this.eventHandlers) {
            this.eventHandlers[key] = () => { };
        }
    }
    sendMessage({ message, conversationId }: SendMessageServiceParams) {
        // Send Messages by dispatching events to socket.
    }

    sendTyping(params: SendTypingServiceParams) {
        // Sending Signalization events to socket.
    }
}

export default ChatService;
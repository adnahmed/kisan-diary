import type { ConversationId } from "@chatscope/use-chat";
import { Conversation, ConversationRole, Participant, TypingUsersList } from "@chatscope/use-chat";

export default function createConversation(id: ConversationId, name: string): Conversation {
    return new Conversation({
        id,
        participants: [
            new Participant({
                id: name,
                role: new ConversationRole([])
            })
        ],
        unreadCounter: 0,
        typingUsers: new TypingUsersList({ items: [] }),
        draft: ""
    });
}
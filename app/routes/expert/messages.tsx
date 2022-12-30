import type { FC } from "react";
import { useEffect } from "react";
import { HiEnvelope } from "react-icons/hi2";

interface Message {
  sentDate: Date;
  delivered: Date;
  sender: string;
  message: string;
  seen?: Date;
}
const ALL_MESSAGES: Message[] = [
  {
    sender: "Farhan",
    sentDate: new Date(),
    delivered: new Date(),
    message: "Hello, Please help me decide a suitable crop?",
    seen: new Date(),
  },
  {
    sender: "Waheed",
    sentDate: new Date(),
    delivered: new Date(),
    message: "Can you tell me how to set up a new Crop?",
  },
  {
    sender: "Nmberdar",
    sentDate: new Date(),
    delivered: new Date(),
    message: "Can you tell me how to set up a new Crop?",
  },
];

export function Messages() {
  return (
    <div className="messages">
      <div onClick={() => setShowChatBox(!showChatBox)}>
        <span>Messages</span>
        <div className="MessageEnvelope">
          <HiEnvelope
            style={{
              width: "2em",
              height: "2em",
            }}
          />
          <span className="MessageCount">
            {ALL_MESSAGES.filter((m) => m.seen === undefined).length}
          </span>
        </div>
      </div>
      <div className="ChatBox">
        {ALL_MESSAGES.map((m: Message) => {
          return <MessageBox message={m} />;
        })}
      </div>
    </div>
  );
}

interface MessageBoxProps {
  message: Message;
}
const MessageBox: FC<MessageBoxProps> = ({ message }) => {
  useEffect(() => {
    message.seen = new Date();
  });
  return (
    <div className="MessageBox">
      <span className="sender">{message.sender}</span>
      <span className="Message">{message.message}</span>
      <span className="SentDate">{message.sentDate.toLocaleDateString()}</span>
    </div>
  );
};

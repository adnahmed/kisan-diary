import { BasicStorage } from "@chatscope/use-chat";
import { nanoid } from "nanoid";
const messageIdGenerator = () => nanoid();
const groupIdGenerator = () => nanoid();
const chatStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
export default chatStorage;

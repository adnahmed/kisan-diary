// context.tsx
import { createContext } from "react";
import type { Socket } from "socket.io-client";

/* Socket-Io Context */
export const SocketIOContext = createContext<Socket | undefined>(undefined);

/* Emotion Style Context */
export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);

export interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
);

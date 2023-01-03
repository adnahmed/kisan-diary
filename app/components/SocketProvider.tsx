import type { ReactNode } from "react";
import type { Socket } from "socket.io-client";
import { SocketIOContext } from "../context";

type ProviderProps = {
  socket: Socket | undefined;
  children: ReactNode;
};

export function SocketProvider({ socket, children }: ProviderProps) {
  return (
    <SocketIOContext.Provider value={socket}>
      {children}
    </SocketIOContext.Provider>
  );
}

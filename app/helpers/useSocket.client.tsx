import { useContext } from "react";
import { SocketIOContext } from "../context";

export function useSocket() {
  return useContext(SocketIOContext);
}

import { useMatches } from "@remix-run/react";

export default function useLastMatch() {
  const matches = useMatches();
  return matches.slice(-1)[0];
}

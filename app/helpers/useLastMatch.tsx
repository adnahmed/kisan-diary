import { useMatches } from "@remix-run/react";

export default function useLastMatch() {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  return lastMatch.pathname.split("/").at(-1);
}

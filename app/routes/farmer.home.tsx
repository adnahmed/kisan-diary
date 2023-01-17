import { useCatch } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import styles from "~/styles/routes/farmer.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preload", href: "/assets/kisan_day.jpeg", as: "image" },
  ];
};
export default function Farmer() {
  return <div className="home"></div>;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

import { useCatch } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
// import styles from "~/styles/routes/farmer.css";
// export const links: LinksFunction = () => {
//   return [
//     { rel: "stylesheet", href: styles },
//     { rel: "preload", href: "/assets/kisan_day.jpeg", as: "image" },
//   ];
// };
export default function Farmer() {
  return (
    <div className="min-h-screen w-full bg-[url('/assets/kisan_day.jpeg')] bg-cover bg-center bg-no-repeat fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      {/* Dashboard content will go here within Layout outlet */}
    </div>
  );
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

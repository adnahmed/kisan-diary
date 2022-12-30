import { Link, useCatch } from "@remix-run/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import styles from "~/styles/routes/farmer.crop.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
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
export async function loader({ request }: LoaderArgs) {
  return {};
}
export default function CropCard() {
  return (
    <div className="crop-card">
      <div style={{ color: "green" }} className="heading">
        Farm Functions
      </div>
      <div className="crop-card options">
        <Link to="land-preparation">Land Preparation</Link>
        <Link to="sowing">Sowing</Link>
        <Link to="inputs">Inputs</Link>
        <Link to="harvesting">Harvesting</Link>
        <Link to="post-harvesting-and-storage">Post Harvest And Storage</Link>
        <Link to="marketing">Marketing</Link>
        <Link to="all-costs">All Costs</Link>
        <Link to="economic-analysis">Economic Analysis</Link>
      </div>
    </div>
  );
}

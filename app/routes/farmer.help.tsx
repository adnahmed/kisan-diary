import type { LinksFunction } from "@remix-run/node";
import PostCard, { links as PostCardLinks } from "~/components/PostCard";
import PostInput, {
  links as PostInputLinks,
} from "~/components/pages/PostInput";
import styles from "~/styles/routes/farmer.help.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...PostCardLinks(),
    ...PostInputLinks(),
  ];
};
export default function Help() {
  return (
    <div className="help_dashboard">
      <PostInput />
      <PostCard />
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

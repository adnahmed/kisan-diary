import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/components/PostCard.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export default function PostCard() {
  return (
    <div className="post__card">
      <div className="post__title"></div>
      <div className="post post__created"></div>
      <div className="post post__edited"></div>
      <div className="post post__tags"></div>
    </div>
  );
}

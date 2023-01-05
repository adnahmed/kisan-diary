import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/components/CommentList.css";
import Comment, { links as CommentLinks } from "./Comment";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }, ...CommentLinks()];
};
interface CommentListProps {
  for: "post" | "comment";
  id: string;
}
export default function CommentList(props: CommentListProps) {
  return (
    <div className="commentlist">
      <Comment />
    </div>
  );
}

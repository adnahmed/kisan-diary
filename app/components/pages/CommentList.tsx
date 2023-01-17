import type { LinksFunction } from "@remix-run/node";
import Comment from "./Comment";
import styles from "~/styles/components/CommentList.css";
import type PrismaOutputComment from "~/types/PrismaOutputCommentType";
import { links as CommentLinks } from "./Comment";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }, ...CommentLinks()];
};

interface CommentListProps {
  comments: PrismaOutputComment[];
  replies?: boolean;
}
export default function CommentList({
  comments,
  replies = false,
}: CommentListProps) {
  return (
    <div className={`commentlist ${replies && "commentlist__replies"}`}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

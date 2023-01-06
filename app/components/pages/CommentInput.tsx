import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/components/CommentInput.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
interface CommentProps {
  to: string; // id
  replies?: boolean;
}
export default function CommentInput({ replies = false, to }: CommentProps) {
  return (
    <div className={`commentpane ${replies && "replypane"}`}>
      <input
        type="text"
        className="commentpane__newcomment"
        placeholder={`Write a new ${replies ? "Reply" : "Comment"}`}
      />
      <button className="commmentpane__send">
        {replies ? <span>Reply</span> : <span>Send</span>}
      </button>
    </div>
  );
}

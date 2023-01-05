import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/components/CommentInput.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
interface CommentProps {
  replies?: boolean;
}
export default function CommentInput({ replies = false }: CommentProps) {
  return (
    <div className={`commentpane ${replies && "replypane"}`}>
      <input type="text" className="commentpane__newcomment" />
      <button className="commmentpane__send">
        {replies ? <span>Reply</span> : <span> Send </span>}
      </button>
    </div>
  );
}

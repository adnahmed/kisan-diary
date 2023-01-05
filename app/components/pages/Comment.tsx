import type { LinksFunction } from "@remix-run/node";
import { useState } from "react";
import styles from "~/styles/components/Comment.css";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
interface CommentProps {}
export default function Comment(props: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div className="comment">
      <div className="comment commenter">
        <img src="" alt="" className="commenter commenter__avatar" />
        <div className="commenter commenter__name">Dr. Kauser</div>
      </div>
      <div className="comment comment_date">3 days ago</div>
      <div className="comment comment_details">This is a good solution</div>
      <button className="comment comment_reply">Reply</button>
      <div className="comment replies">
        <button
          className={`comment__replies--${showReplies ? "show" : "hide"}`}
          onClick={() => setShowReplies(!showReplies)}
        >
          {showReplies ? <span>Hide Replies</span> : <span>Show Replies</span>}
        </button>
        {showReplies && <CommentList for={"comment"} id={""} />}
        <CommentInput replies />
      </div>
    </div>
  );
}

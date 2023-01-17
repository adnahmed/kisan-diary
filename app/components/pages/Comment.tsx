import type { Comment as CommentModal } from "@prisma/client";
import type { LinksFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { formatDistance } from "date-fns";
import { useState } from "react";
import styles from "~/styles/components/Comment.css";
import type PrismaOutputComment from "../../types/PrismaOutputCommentType";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
interface CommentProps {
  comment: PrismaOutputComment;
}
export default function Comment({ comment }: CommentProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const reply_fetcher = useFetcher<CommentModal[]>();
  function fetchReplies() {
    if (!showReplies) return;
    const form = new FormData();
    form.set("comment_id", comment.id);
    reply_fetcher.submit(form, {
      method: "post",
      action: "/api/fetch_replies",
    });
  }
  return (
    <div className="comment">
      <div className="comment commenter">
        <img
          src={`${"Commenter Avatar"}`}
          alt=""
          className="commenter commenter__avatar"
        />
        <div className="commenter commenter__name">{"Commenter Name"}</div>
      </div>
      <div className="comment comment_date">
        {formatDistance(new Date(comment.postedOn), new Date())}
      </div>
      <div className="comment comment_details">{comment.content}</div>
      <button className="comment comment_reply">Reply</button>
      <div className="comment replies">
        <button
          className={`comment__replies--${showReplies ? "show" : "hide"}`}
          onClick={() => {
            setShowReplies(!showReplies);
            fetchReplies();
          }}
        >
          {showReplies ? <span>Hide Replies</span> : <span>Show Replies</span>}
        </button>
        {showReplies &&
        (reply_fetcher.state === "submitting" ||
          reply_fetcher.state === "loading" ||
          reply_fetcher.state === "idle") ? (
          <div>loading...</div>
        ) : (
          reply_fetcher.data && (
            <CommentList replies comments={reply_fetcher.data} />
          )
        )}
        {showReplyInput && <CommentInput to={comment.id} replies />}
      </div>
    </div>
  );
}

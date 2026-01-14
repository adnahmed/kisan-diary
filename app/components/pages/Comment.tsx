import type { Comment as CommentModal } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { formatDistance } from "date-fns";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlassCard } from "~/components/GlassCard";
import Button from "~/components/form/button";
import type PrismaOutputComment from "../../types/PrismaOutputCommentType";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

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
    <div className="w-full">
      <GlassCard className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <FaUserCircle className="text-gray-400 text-3xl"/>
           <div className="flex flex-col">
              <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {"Commenter Name"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistance(new Date(comment.postedOn), new Date(), { addSuffix: true })}
              </div>
           </div>
        </div>
        
        <div className="text-gray-800 dark:text-gray-200 text-sm pl-11">
          {comment.content}
        </div>
        
        <div className="pl-11 flex gap-4 mt-2">
            <button 
                className="text-primary-600 hover:text-primary-700 text-xs font-semibold"
                onClick={() => setShowReplyInput(!showReplyInput)}
            >
                Reply
            </button>
             <button
                className="text-gray-500 hover:text-gray-600 text-xs font-semibold"
                onClick={() => {
                    setShowReplies(!showReplies);
                    // Defer fetch to next tick to ensure state update
                    setTimeout(fetchReplies, 0); 
                }}
            >
                {showReplies ? "Hide Replies" : "Show Replies"}
            </button>
        </div>

        {showReplyInput && <CommentInput to={comment.id} replies />}
      </GlassCard>
      
      {showReplies && (
        <div className="w-full">
            {(reply_fetcher.state === "submitting" ||
              reply_fetcher.state === "loading") ? (
              <div className="text-xs text-gray-400 pl-12 py-2">Loading replies...</div>
            ) : (
              reply_fetcher.data && (
                <CommentList replies comments={reply_fetcher.data} />
              )
            )}
        </div>
      )}
    </div>
  );
}

import Comment from "./Comment";
import type PrismaOutputComment from "~/types/PrismaOutputCommentType";

interface CommentListProps {
  comments: PrismaOutputComment[];
  replies?: boolean;
}

export default function CommentList({
  comments,
  replies = false,
}: CommentListProps) {
  return (
    <div className={`flex flex-col gap-4 w-full ${replies ? "pl-8 mt-2 border-l-2 border-gray-100 dark:border-gray-700" : "mt-6"}`}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

import type { Comment } from "@prisma/client";

export type CommentCreateWithoutReplyInput = Omit<Comment, "id" | "postedOn" | "updatedOn" | "postedBy" | "userId" | "replyId" | "postId">;
export type CommentCreateInput = Omit<Comment, "id" | "postedOn" | "updatedOn" | "postedBy" | "userId">;
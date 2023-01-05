import type { Post } from "@prisma/client";

type PostCreateInput = Omit<Post, "id" | "postedOn" | "updatedOn" | "postedBy" | "userId">;
export default PostCreateInput;


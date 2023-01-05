import type { PostTag } from "@prisma/client";

type PostTagCreateInput = Omit<PostTag, "id">;
export default PostTagCreateInput;

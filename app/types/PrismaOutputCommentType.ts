import type { Comment } from "@prisma/client";

type PrismaOutputComment = Omit<Comment, "postedOn" | "updatedOn"> & {
    postedOn: string;
    updatedOn: string;
};

export default PrismaOutputComment;
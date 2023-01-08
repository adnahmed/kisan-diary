import type { Issue } from "@prisma/client";

type IssueCreateInput = Omit<Issue, "id" | "postedOn" | "updatedOn" | "postedBy" | "userId" | "farmId">;
export default IssueCreateInput;


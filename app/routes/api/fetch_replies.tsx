import type { ActionArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const commentId = formData.get("comment_id");
  if (!commentId) return undefined;
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId.toString(),
    },
    include: {
      replies: true,
    },
  });
  return comment?.replies;
}

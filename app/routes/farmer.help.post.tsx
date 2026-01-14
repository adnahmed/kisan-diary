import type { LoaderArgs } from "@remix-run/node";
import { formatDistance } from "date-fns";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { GlassCard } from "~/components/GlassCard";
import CommentInput from "~/components/pages/CommentInput";

import { prisma } from "~/db.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("id");
  if (!postId) throw new Error("Id not provided.");
  return typedjson({
    post: await prisma.issue.findUnique({
      where: { id: postId },
    }),
  });
}

export default function Post() {
  const { post } = useTypedLoaderData<typeof loader>();
  return (
    post && (
      <div className="p-4 w-full flex justify-center">
        <GlassCard className="max-w-4xl w-full p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="font-semibold">
                    Posted {formatDistance(new Date(post.postedOn), new Date(), { addSuffix: true })}
                </div>
                {new Date(post.postedOn).getDate() !== new Date(post.updatedOn).getDate() && (
                    <div className="italic">
                        Edited {formatDistance(new Date(post.updatedOn), new Date(), { addSuffix: true })}
                    </div>
                )}
            </div>
            
            <div className="prose dark:prose-invert max-w-none border-b border-gray-200 dark:border-gray-700 pb-4">
                {post.content}
            </div>
            
            <div className="mt-2">
                 <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Add a Comment</h3>
                <CommentInput to={post.id} />
            </div>
        </GlassCard>
      </div>
    )
  );
}

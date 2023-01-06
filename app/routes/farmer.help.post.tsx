import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { formatDistance } from "date-fns";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import CommentInput, {
  links as CommentInputLinks,
} from "~/components/pages/CommentInput";
import CommentList, {
  links as CommentListLinks,
} from "~/components/pages/CommentList";

import { prisma } from "~/db.server";
import styles from "~/styles/routes/farmer.help.post.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...CommentInputLinks(),
    ...CommentListLinks(),
  ];
};

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const postId = params.get("id");
  if (!postId) throw new Error("Id not provided.");
  return typedjson({
    post: await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: true,
      },
    }),
  });
}

export default function Post() {
  const { post } = useTypedLoaderData<typeof loader>();
  return (
    post && (
      <div className="post">
        <div className="post post__title">{post.title}</div>
        <div className="post post__created">
          {formatDistance(post.postedOn, new Date())}
        </div>
        {post.postedOn.getDate() !== post.updatedOn.getDate() && (
          <div className="post post__edited">
            {formatDistance(post.updatedOn, new Date())}
          </div>
        )}
        <div className="post post__details">{post.content}</div>
        <CommentInput to={post.id} />
        <CommentList
          comments={post.comments.map((comment) => ({
            ...comment,
            postedOn: comment.postedOn.toDateString(),
            updatedOn: comment.updatedOn.toDateString(),
          }))}
        />
      </div>
    )
  );
}

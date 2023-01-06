import type { Post, PostTag } from "@prisma/client";
import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { formatDistance } from "date-fns";
import styles from "~/styles/components/PostCard.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface PostCardProps {
  post: Post;
  tags: PostTag[];
}
export default function PostCard({ post, tags }: PostCardProps) {
  return (
    <div className="post__card">
      <Link to={`post?id=${post.id}`}>
        <div className="post__title">{post.title}</div>
      </Link>
      <div className="post post__created">
        {formatDistance(post.postedOn, new Date())}
      </div>
      {post.postedOn.getDate() !== post.updatedOn.getDate() && (
        <div className="post post__edited">
          {formatDistance(post.updatedOn, new Date())}
        </div>
      )}
      <div className="post post__tags">
        {tags.map((tag) => (
          <span className="post post__tags tags__tag" key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

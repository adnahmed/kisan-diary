import type { Issue, Solution } from "@prisma/client";
import type { LinksFunction } from "@remix-run/node";
import { formatDistance } from "date-fns";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/components/PostCard.css";
import Editor from "../quill.client";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface PostCardProps {
  issue: Issue & { Solution: Solution | null };
}
export default function PostCard({ issue }: PostCardProps) {
  return (
    <div className="post__card">
      <div className="post post__created">
        Posted:
        {formatDistance(issue.postedOn, new Date())}
      </div>
      {issue.postedOn.getDate() !== issue.updatedOn.getDate() && (
        <div className="post post__edited">
          {formatDistance(issue.updatedOn, new Date())}
        </div>
      )}
      <div>Issue Type: {issue.type.replace("_", " ")}</div>
      <ClientOnly fallback={<div>Loading...</div>}>
        {() => <Editor defaultValue={issue.content} readonly />}
      </ClientOnly>
      <div>{issue.Solution && issue.Solution.content}</div>
    </div>
  );
}

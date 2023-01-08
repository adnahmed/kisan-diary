import type { Issue, Solution } from "@prisma/client";
import type { LinksFunction } from "@remix-run/node";
import { formatDistance } from "date-fns";
import styles from "~/styles/components/PostCard.css";
import ReadOnlyEditor from "./ReadOnlyEditor";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface PostCardProps {
  issue: Issue & { Solution: Solution | null };
}
export default function IssueCard({ issue }: PostCardProps) {
  var issue_number = 0;
  return (
    <div className="issue__card">
      <div className="issue issue__created">
        Posted:
        {formatDistance(issue.postedOn, new Date())}
      </div>
      {issue.postedOn.getDate() !== issue.updatedOn.getDate() && (
        <div className="post post__edited">
          {formatDistance(issue.updatedOn, new Date())}
        </div>
      )}
      <div>Issue Type: {issue.type.replace("_", " ")}</div>
      <ReadOnlyEditor value={issue.content} />
      <div>
        <span>Solution:</span>
        <div>
          {issue.Solution && <ReadOnlyEditor value={issue.Solution.content} />}
        </div>
      </div>
    </div>
  );
}

import type { Issue, Solution } from "@prisma/client";
import { formatDistance } from "date-fns";
import ReadOnlyEditor from "./ReadOnlyEditor";
import { GlassCard } from "~/components/GlassCard";

interface PostCardProps {
  issue: Issue & { solution: Solution | null };
}

export default function IssueCard({ issue }: PostCardProps) {
  return (
    <GlassCard className="p-4 mb-4 flex flex-col gap-3">
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div>
          <span className="font-semibold">Posted: </span>
          {formatDistance(new Date(issue.postedOn), new Date(), {
            addSuffix: true,
          })}
        </div>
        {new Date(issue.postedOn).getDate() !==
          new Date(issue.updatedOn).getDate() && (
          <div>
            <span className="font-semibold">Edited: </span>
            {formatDistance(new Date(issue.updatedOn), new Date(), {
              addSuffix: true,
            })}
          </div>
        )}
      </div>
      
      <div className="text-sm font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
        Issue Type: {issue.type.replace("_", " ")}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <ReadOnlyEditor value={issue.content} />
      </div>

      {issue.solution && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="font-bold text-lg text-secondary-600 dark:text-secondary-400 mb-2">
            Solution:
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <ReadOnlyEditor value={issue.solution.content} />
          </div>
        </div>
      )}
    </GlassCard>
  );
}

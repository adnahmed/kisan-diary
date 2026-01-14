import type { IssueType } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Outlet, useFetcher, useLocation } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { route } from "routes-gen";
import IssueCard from "~/components/pages/IssueCard";
import PostInput from "~/components/pages/IssueInput";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const user = await getUser(request);
  if (!user) return;
  const formData = await request.formData();
  const type = formData.get("type");
  if (!type) return null;
  const issue = formData.get("issue");
  if (!issue) return null;
  await prisma.issue.create({
    data: {
      type: type as IssueType, // TODO: likely a bug, use type validation
      content: issue.toString(),
      postedBy: {
        connect: {
          id: user.id,
        },
      },
      belongs_to: {
        connect: {
          owner: user.id,
        },
      },
    },
  });
  return null;
}
export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Error("User Not Found");
  return typedjson({
    issues: await prisma.issue.findMany({
      where: {
        postedBy: {
          id: user.id,
        },
      },
      include: {
        solution: true,
      },
    }),
  });
}

export default function Help() {
  const { issues } = useTypedLoaderData<typeof loader>();
  const location = useLocation();
  const issue_fetcher = useFetcher<typeof action>();
  let issue_number = 0;
  // TODO: is this a remix bug?
  return location.pathname === route("/farmer/help") ? (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
                Post For Emerging Issue
            </h1>
            <div className="w-full">
                <PostInput issue_fetcher={issue_fetcher} />
            </div>
        </div>

        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
                Solutions from Expert
            </h1>
            <div className="flex flex-col gap-6">
                {issues &&
                issues.map((issue) => {
                    issue_number++;
                    return (
                    <div key={issue.id} className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Issue #{issue_number}</span>
                        <IssueCard issue={issue} />
                    </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-8 bg-red-50 text-red-600 rounded-lg border border-red-200 m-4">
      <h1 className="text-xl font-bold mb-4">Error</h1>
      <p className="mb-2">{error.message}</p>
      <p className="text-sm font-semibold text-gray-700">The stack trace is:</p>
      <pre className="mt-2 text-xs bg-red-100 p-4 rounded overflow-auto">{error.stack}</pre>
    </div>
  );
}

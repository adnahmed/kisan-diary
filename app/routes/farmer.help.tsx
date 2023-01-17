import { Heading } from "@chakra-ui/react";
import type { IssueType } from "@prisma/client";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { Outlet, useFetcher, useLocation } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { route } from "routes-gen";
import IssueCard, {
  links as PostCardLinks,
} from "~/components/pages/IssueCard";
import PostInput, {
  links as PostInputLinks,
} from "~/components/pages/IssueInput";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/farmer.help.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...PostCardLinks(),
    ...PostInputLinks(),
  ];
};

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
    <div className="help help__dashboard">
      <Heading className="help__dashboard dashboard__heading--post">
        Post For Emerging Issue
      </Heading>
      <div className="help__dashboard dashboard__input">
        <PostInput issue_fetcher={issue_fetcher} />
      </div>
      <Heading className="help__dashboard dashboard__heading--solution">
        Solutions from Expert
      </Heading>
      <div className="help__dashboard dashboard__posts">
        {issues &&
          issues.map((issue) => {
            issue_number++;
            return (
              <div key={issue.id}>
                <span>Issue #{issue_number}</span>
                <IssueCard issue={issue} />
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <Outlet />
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}

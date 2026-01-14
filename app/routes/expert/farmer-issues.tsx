import { Heading } from "@chakra-ui/react";
import type { Farm, Issue, Solution, User } from "@prisma/client";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { useCatch, useFetcher } from "@remix-run/react";
import { formatDistance } from "date-fns";
import React, { useContext, useState } from "react";
import type ReactQuill from "react-quill";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Button from "~/components/form/button";
import ReadOnlyEditor from "~/components/pages/ReadOnlyEditor";
import Editor from "~/components/quill.client";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/farmer.issues.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const ShowResponseContext = React.createContext<{
  showResponse: boolean;
  setShowResponse?: (value: boolean) => void;
  issue?: IssueType;
  setCurrentIssue?: (value?: IssueType) => void;
}>({ showResponse: false });
export async function loader({ request }: LoaderArgs) {
  const issues = await prisma.issue.findMany({
    include: {
      postedBy: true,
      belongs_to: true,
      solution: true,
    },
  });

  return typedjson({
    issues: issues,
    new_issues: issues.length,
    // new_issues: issues.filter(issue => !issue.read).length,
  });
}
export async function action({ request }: ActionArgs) {
  const user = await getUser(request);
  const formData = await request.formData();
  const issue = formData.get("issue");
  const solution = formData.get("solution");
  if (!issue || !solution) return null;
  try {
    const createdSolution = await prisma.solution.create({
      data: {
        content: solution.toString(),
        postedBy: {
          connect: {
            id: user?.id,
          },
        },
        for: {
          connect: {
            id: issue.toString(),
          },
        },
      },
    });

    return {
      solution: createdSolution,
    };
  } catch (err) {
    return {
      err: err,
    };
  }
}

function ResponseModal() {
  const showResponseContext = useContext(ShowResponseContext);
  const ref = React.useRef<ReactQuill | null>(null);
  const solution_fetcher = useFetcher();
  const NoIssue =
    !showResponseContext.issue || !showResponseContext.setCurrentIssue;
  function SendResponse() {
    const setShowRespone = showResponseContext.setShowResponse;
    if (!setShowRespone) return;
    const editor = ref.current?.getEditor();
    const solution = editor?.getText();
    const issue = showResponseContext.issue;
    if (!solution || !issue) return;
    const formData = new FormData();
    formData.set("issue", issue.id);
    formData.set("solution", solution);
    solution_fetcher.submit(formData, {
      method: "post",
    });
    editor?.setText("");
    setShowRespone(!showResponseContext.setShowResponse);
  }

  return (
    <div
      style={{
        zIndex: 2,
        position: "absolute",
        top: "5em",
        left: "8em",
        backgroundColor: "#fff",
        width: "60vw",
        height: "50vh",
        border: "1px solid black",
      }}
    >
      {NoIssue ? (
        <>No Issue</>
      ) : (
        <div>
          <div>
            <span>Issue Raised</span>
            {showResponseContext.issue && (
              <IssuePost
                withResponse={false}
                issue={showResponseContext.issue}
              />
            )}
          </div>
          <span>Solution/Recommendation:</span>
          <Editor ref={ref} />
          <Button onClick={SendResponse}>Send</Button>
        </div>
      )}
    </div>
  );
}

export default function FarmerIssues() {
  const data = useTypedLoaderData<typeof loader>();
  let issue_number = 0;
  const [showResponseModal, setShowResponse] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<IssueType | undefined>(
    undefined
  );
  return (
    <div>
      <Heading textAlign={"center"}>Farm Issues and their Solutions</Heading>
      <div className="issues farmer__issues">
        {/* <FilterIssues /> */}
        <ShowResponseContext.Provider
          value={{
            showResponse: showResponseModal,
            setShowResponse,
            setCurrentIssue,
            issue: currentIssue,
          }}
        >
          {showResponseModal && <ResponseModal />}
          <div className="farmer__issues issues__list">
            <span className="issues__list issues__count">
              Total Issues: {data.issues.length}
            </span>
            {data.issues.map((issue) => {
              issue_number++;
              return (
                <>
                  <span>Issue #{issue_number}</span>
                  <IssuePost key={issue.id} issue={issue} />
                </>
              );
            })}
          </div>
        </ShowResponseContext.Provider>
      </div>
    </div>
  );
}
type IssueType = Issue & { postedBy: User } & { belongs_to: Farm } & {
  Solution: Solution | null;
};
interface IssuePostProps {
  issue: IssueType;
  withResponse?: boolean;
}

function IssuePost({ issue, withResponse = true }: IssuePostProps) {
  const showResponseContext = useContext(ShowResponseContext);
  function showResponseModal() {
    const showResponse = showResponseContext.setShowResponse;
    const setIssue = showResponseContext.setCurrentIssue;
    if (!showResponse || !setIssue) return;
    showResponse(!showResponseContext.showResponse);
    setIssue(issue);
  }
  return (
    <div className="issues__list issue__post">
      <span className="">
        Created: {formatDistance(issue.postedOn, new Date())} ago
      </span>
      <span>Posted By: {issue.postedBy.firstName}</span>
      <span>Farm: {issue.belongs_to.name}</span>
      <span>Location: {issue.belongs_to.regionName}</span>
      <ReadOnlyEditor value={issue.content} />
      {issue.Solution ? (
        <>
          <span>Solution:</span>
          <ReadOnlyEditor value={issue.Solution.content} />
        </>
      ) : (
        withResponse && (
          <Button onClick={showResponseModal}>Response</Button>
        )
      )}
    </div>
  );
}

/*
function FilterIssues() {
  const nameRef = React.useRef<HTMLSelectElement>(null);
  const regionRef = React.useRef<HTMLSelectElement>(null);
  const issueTypeRef = React.useRef<HTMLSelectElement>(null);
  const onChange = () => {};

  return (
    <div className="farmer__issues issues__filter">
      <span className="issues__filter filter__heading">Filter</span>
      <SelectFilter
        onChange={onChange}
        ref={nameRef}
        name="Farm Name"
        options={[]}
      />
      <SelectFilter
        onChange={onChange}
        ref={regionRef}
        name="Farm Region"
        options={[]}
      />
      <SelectFilter
        onChange={onChange}
        ref={issueTypeRef}
        name="Issue Type"
        options={[]}
      />
      <div className="issues__filter filter__value">
        <span className="filter__value value__name">Responded</span>
        <input
          className="filter__value value__check"
          type="checkbox"
          name="read"
          value="read"
        />
      </div>
    </div>
  );
}

interface FilterProps {
  name: string;
  options: string[];
  default?: string;
  onChange?: () => void;
}
*/

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

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

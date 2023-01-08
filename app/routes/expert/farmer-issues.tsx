import { Select } from "@chakra-ui/react";
import type { Farm, Issue, User } from "@prisma/client";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import { formatDistance } from "date-fns";
import type { ForwardedRef } from "react";
import React from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ClientOnly } from "remix-utils";
import CABIButton from "~/components/cabi-button";
import Editor from "~/components/quill.client";
import { prisma } from "~/db.server";
import styles from "~/styles/routes/farmer.issues.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function loader({ request }: LoaderArgs) {
  const issues = await prisma.issue.findMany({
    include: {
      postedBy: true,
      belongs_to: true,
    },
  });

  return typedjson({
    issues: issues,
    new_issues: issues.length,
  });
}
export default function FarmerIssues() {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <div className="issues farmer__issues">
      <FilterIssues />
      <div className="farmer__issues issues__list">
        <span className="issues__list issues__count">
          Total Issues: {data.issues.length}
        </span>
        {data.issues.map((issue) => (
          <IssuePost key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
interface IssuePostProps {
  issue: Issue & { postedBy: User } & { belongs_to: Farm };
}
function IssuePost({ issue }: IssuePostProps) {
  return (
    <div className="issues__list issue__post">
      <span className="">
        Created: {formatDistance(issue.postedOn, new Date())} ago
      </span>
      <span>Posted By: {issue.postedBy.firstName}</span>
      <span>Farm: {issue.belongs_to.name}</span>
      <span>Location: {issue.belongs_to.regionName}</span>
      <ClientOnly fallback={<div>Loading...</div>}>
        {() => <Editor defaultValue={issue.content} readonly={true} />}
      </ClientOnly>
      <CABIButton onClick={() => {}}>Response</CABIButton>
    </div>
  );
}
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

const SelectFilter = React.forwardRef(
  (
    { name, options, ...props }: FilterProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className="issues__filter filter__value">
        <span className="filter__value value__name">{name}</span>
        <div className="filter__value value__select">
          <Select
            ref={ref}
            placeholder={"Select a value.."}
            defaultValue={props.default}
            onChange={props.onChange}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>
    );
  }
);

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

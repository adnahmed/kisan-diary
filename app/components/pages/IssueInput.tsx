import { IssueType } from "@prisma/client";
import type { FetcherWithComponents } from "@remix-run/react";
import { useCatch } from "@remix-run/react";
import React from "react";
import type ReactQuill from "react-quill";
import { ClientOnly } from "remix-utils";
import Button from "~/components/form/button";
import Select from "~/components/form/select";
import { GlassCard } from "~/components/GlassCard";
import uploadFile from "~/helpers/uploadFile";
import type action from "~/routes/farmer.help.post";
import Editor from "../quill.client";

interface PostInputProps {
  issue_fetcher: FetcherWithComponents<typeof action>;
}

export default function PostInput({ issue_fetcher }: PostInputProps) {
  const editorRef = React.useRef<ReactQuill>(null);
  const typeRef = React.useRef<HTMLSelectElement>(null);

  function createPost() {
    const editor = editorRef?.current?.editor;
    const type = typeRef?.current?.value;
    const issue = JSON.stringify(editor?.getContents());
    
    if (!issue || !type) return;
    
    const formData = new FormData();
    formData.set("issue", issue);
    formData.set("type", type);
    
    issue_fetcher.submit(formData, {
      method: "post",
    });
    
    // Clear editor after submit
     editor?.setText("");
  }

  return (
    <GlassCard className="p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Issue Type
        </label>
        <Select 
            ref={typeRef}
            placeholder="Select Issue Type"
            name="type"
        >
          {Object.keys(IssueType).map((issue_type) => (
            <option key={issue_type} value={issue_type}>
              {issue_type.replace("_", " ")}
            </option>
          ))}
        </Select>
      </div>
      
      <div className="flex flex-col gap-2 h-64 mb-12">
         <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Description
        </label>
        <div className="h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <ClientOnly fallback={<div>Loading...</div>}>
            {() => <Editor ref={editorRef} placeholder="Describe your issue detailed..." />}
            </ClientOnly>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button onClick={createPost} disabled={issue_fetcher.state !== "idle"}>
          {issue_fetcher.state === "submitting" ? "Posting..." : "Post Issue"}
        </Button>
      </div>
    </GlassCard>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
      <h1 className="text-lg font-bold">Error</h1>
      <p>{error.message}</p>
      <p className="mt-2 text-sm font-semibold">Stack trace:</p>
      <pre className="text-xs mt-1 p-2 bg-red-100 rounded overflow-auto">{error.stack}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="p-4 bg-orange-50 text-orange-600 rounded-lg border border-orange-200">
      <h1 className="text-lg font-bold">Caught Error</h1>
      <p>Status: {caught.status}</p>
      <pre className="text-xs mt-1 p-2 bg-orange-100 rounded overflow-auto">
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

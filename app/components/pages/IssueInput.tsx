import { IssueType } from "@prisma/client";
import type { LinksFunction } from "@remix-run/node";
import type { FetcherWithComponents } from "@remix-run/react";
import { useCatch } from "@remix-run/react";
import React from "react";
import type ReactQuill from "react-quill";
import { ClientOnly } from "remix-utils";
import uploadFile from "~/helpers/uploadFile";
import type action from "~/routes/farmer.help.post";
import styles from "~/styles/components/PostInput.css";
import Editor from "../quill.client";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface PostInputProps {
  issue_fetcher: FetcherWithComponents<typeof action>;
}

const postEditorModules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    ["image", "video"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  magicUrl: true,
  imageResize: {},
  imageUploader: { upload: uploadFile },
  imageDrop: true,
};
/*
land_management
The ph of the soil is 8.5, please advice which measure to adopt to reduce it.
*/
export default function PostInput({ issue_fetcher }: PostInputProps) {
  const editorRef = React.useRef<ReactQuill>(null);
  const typeRef = React.useRef<HTMLSelectElement>(null);
  function createPost() {
    const editor = editorRef?.current?.editor;
    const type = typeRef?.current?.value;
    const issue = JSON.stringify(editor?.getContents());
    editor?.setText("");
    if (!issue || !type) return;
    const formData = new FormData();
    formData.set("issue", issue);
    formData.set("type", type);
    issue_fetcher.submit(formData, {
      method: "post",
    });
  }

  return (
    <div className={`post post__input`}>
      <label className="post__input input__type">
        <span className="input__type type__heading">Issue Type</span>
        <select placeholder="Select a value" ref={typeRef}>
          {Object.keys(IssueType).map((issue_type) => (
            <option key={issue_type} value={issue_type}>
              {issue_type.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <div className="post__input input__editor">
        <ClientOnly fallback={<div>Loading...</div>}>
          {() => (
            <Editor
              modules={postEditorModules}
              ref={editorRef}
              placeholder="Write your Post here"
            />
          )}
        </ClientOnly>
      </div>
      <button onClick={createPost} className="post__input post__send">
        Send
      </button>
    </div>
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

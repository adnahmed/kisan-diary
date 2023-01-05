import { Heading } from "@chakra-ui/react";
import type { LinksFunction } from "@remix-run/node";
import React from "react";
import type ReactQuill from "react-quill";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/components/PostInput.css";
import Editor from "../quill.client";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export default function PostInput() {
  const editorRef = React.useRef<ReactQuill>(null);
  return (
    <div className="post__input">
      <Heading>Create Post</Heading>
      <ClientOnly fallback={<div>Loading...</div>}>
        {() => <Editor ref={editorRef} placeholder="Write your Post here" />}
      </ClientOnly>
      <button className="post__send">Create</button>
    </div>
  );
}

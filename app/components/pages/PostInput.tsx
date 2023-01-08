import type { LinksFunction } from "@remix-run/node";
import type { FetcherWithComponents } from "@remix-run/react";
import React from "react";
import type ReactQuill from "react-quill";
import { ClientOnly } from "remix-utils";
import uploadFile from "~/helpers/uploadFile";
import type action from "~/routes/farmer.help.post";
import styles from "~/styles/components/PostInput.css";
import CABIButton from "../cabi-button";
import Editor from "../quill.client";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface PostInputProps {
  post_fetcher: FetcherWithComponents<typeof action>;
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
export default function PostInput({ post_fetcher }: PostInputProps) {
  const editorRef = React.useRef<ReactQuill>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const tagsRef = React.useRef<HTMLInputElement>(null);
  function createPost() {
    const title = titleRef?.current?.value;
    const post = JSON.stringify(editorRef?.current?.editor?.getContents());
    if (!post || !title) return;
    const formData = new FormData();
    formData.set("post", post);
    formData.set("title", title);
    post_fetcher.submit(formData, { method: "post" });
  }
  return (
    <div className={`post post__input`}>
      <label className="post__input input__title">
        <span className="input__title title__heading">Issue Title</span>
        <input ref={titleRef} type="text" />
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

      <label className="post__input input__tags">
        Issue Tags
        <input ref={tagsRef} type="text" />
      </label>

      <CABIButton onClick={createPost} className="post_input post__send">
        Send
      </CABIButton>
    </div>
  );
}

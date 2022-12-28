import BetterTable from "quill-better-table";
import ImageUploader from "quill-image-uploader";
import MagicUrl from "quill-magic-url";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import saveToServer from "~/helpers/saveToServer.client";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/magicUrl", MagicUrl);
Quill.register("modules/better-table", BetterTable);

const defaultModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  magicUrl: true,
  imageUploader: {
    upload: (file: File) => saveToServer(file),
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
interface EditorProps {
  placeholder?: string;
  withTable?: boolean;
  onChange?: (
    content, // HTML Contents of Editor
    delta, // Quill Delta representing changes
    source, // Source of Change
    editor // Read only proxy to editor accessors e.g getContents()
  ) => void;
}
const Editor = React.forwardRef(
  (
    {
      placeholder = "Compose your text",
      withTable = false, // TODO: work out a table icon with options ...
      onChange,
    }: EditorProps,
    ref
  ) => {
    const [editorHtml, setEditorHtml] = useState("");
    return (
      <ReactQuill
        value={editorHtml}
        modules={defaultModules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }
);
export default Editor;

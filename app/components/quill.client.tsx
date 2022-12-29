import BetterTable from "quill-better-table";
import ImageUploader from "quill-image-uploader";
import MagicUrl from "quill-magic-url";
import type { ForwardedRef } from "react";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/magicUrl", MagicUrl);
Quill.register("modules/better-table", BetterTable);

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
  (props: EditorProps, ref: ForwardedRef<ReactQuill>) => {
    const [editorHtml, setEditorHtml] = useState("");
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
        upload: async (file: File) => {
          const body = new FormData();
          body.append("file", file);
          try {
            const result = await fetch("/api/save_file", {
              method: "POST",
              body: body,
            });
            const { uploadedUrl } = await result.json();
            return uploadedUrl;
          } catch (error) {
            if (typeof error === "string") console.error("Error:", error);
          }
        },
      },
    };

    return (
      <ReactQuill
        value={editorHtml}
        modules={defaultModules}
        formats={formats}
        onChange={props.onChange}
        placeholder={props.placeholder}
        ref={ref}
      />
    );
  }
);
export default Editor;

import type { StringMap } from "quill";
import BetterTable from "quill-better-table";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize";
import ImageUploader from "quill-image-uploader";
import MagicUrl from "quill-magic-url";
import type { ForwardedRef } from "react";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import { defaultModules } from "~/helpers/constants";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register("modules/magicUrl", MagicUrl);
Quill.register("modules/better-table", BetterTable);
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
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
  modules?: StringMap;
  defaultValue?: string;
  readonly?: boolean;
  onChange?: (
    content, // HTML Contents of Editor
    delta, // Quill Delta representing changes
    source, // Source of Change
    editor // Read only proxy to editor accessors e.g getContents()
  ) => void;
}
const Editor = React.forwardRef(
  (
    { onChange, placeholder, modules = defaultModules, ...props }: EditorProps,
    ref: ForwardedRef<ReactQuill>
  ) => {
    return (
      <ReactQuill
        defaultValue={props.defaultValue}
        readOnly={props.readonly}
        modules={props.readonly ? { toolbar: [] } : modules}
        theme={props.readonly ? "bubble" : "snow"}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }
);

Editor.displayName = "Editor";
export default Editor;

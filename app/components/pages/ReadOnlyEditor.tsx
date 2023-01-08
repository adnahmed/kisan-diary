import { ClientOnly } from "remix-utils";
import Editor from "../quill.client";

interface ReadOnlyEditorProps {
  value: string;
}

export default function ReadOnlyEditor({ value }: ReadOnlyEditorProps) {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => <Editor defaultValue={value} readonly={true} />}
    </ClientOnly>
  );
}

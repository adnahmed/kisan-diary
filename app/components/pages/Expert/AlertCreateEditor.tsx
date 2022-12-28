import { AlertType } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React, { useEffect } from "react";
import type ReactQuill from "react-quill";
import { ClientOnly } from "remix-utils";
import Editor from "~/components/quill.client";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const details = formData.get("details");
  const type = formData.get("type");
  // prisma.alert.create({
  //       data: {
  //         details:
  //         alertType: "alert",
  //       },
  //     });
  if (!type || !(type.toString() in AlertType))
    return new Response("Invalid Alert Type", { status: 401 });
  return json(`Alert Saved Successfully ${details}`);
}
export default function AlertCreateEditor() {
  const actionData = useActionData<typeof action>();
  const editorRef = React.createRef<ReactQuill>();
  const AlertDetails = () => {
    const editor = editorRef?.current?.getEditor();
    editor?.blur();
    return JSON.stringify(editor?.getContents());
  };
  useEffect(() => {
    console.log(actionData);
  });
  return (
    <ClientOnly
      fallback={
        <div style={{ width: 500, height: 300 }}>
          <p>Loading Editor...</p> {/* TODO: Show a spinner */}
        </div>
      }
    >
      {() => (
        <main>
          <Editor ref={editorRef} placeholder="Compose your alert..." />
          <Form>
            <input name="details" hidden value={AlertDetails()} />
            <select name="type">
              <option>Alert</option>
              <option>Recommendation</option>
            </select>
            <button type="submit">Save</button>
          </Form>
          <button>Cancel</button>
        </main>
      )}
    </ClientOnly>
  );
}

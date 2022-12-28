import { AlertType } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LinksFunction } from "@remix-run/server-runtime";
import type { FC } from "react";
import React, { useEffect } from "react";
import type ReactQuill from "react-quill";
import { ClientOnly } from "remix-utils";
import Editor from "~/components/quill.client";
import { prisma } from "~/db.server";
import styles from "~/styles/routes/alerts.create_alert.css";
export const link: LinksFunction = () => [{ href: styles, rel: "stylesheet" }];
export async function loader({ request }: LoaderArgs) {
  return {
    regions: await prisma.region.findMany(),
    crops: await prisma.crop.findMany(),
  };
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const details = formData.get("details");
  const type = formData.get("alert");
  if (!type || !(type.toString() in AlertType))
    return new Response("Invalid Alert Type", { status: 401 });
  if (!details) throw new Response("Details not provided", { status: 401 });
  await prisma.alert.create({
    data: {
      details: details as string,
      alertType: type as AlertType,
    },
  });
  return json(`Alert Saved Successfully`);
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
/*
Alert: Tomorrow will be raining. Don't apply irrigation in your field.
Recommendation: Apply urea as per the rate of 50kg per acre.
*/
interface CreateAlertProps {}
const CreateAlert: FC<CreateAlertProps> = (props) => {
  const { regions, crops } = useLoaderData<typeof loader>();
  const editorRef = React.useRef<ReactQuill>(null);
  const formRef = React.useRef<HTMLSelectElement>(null);
  const alert = useFetcher();
  const handleSubmit = (event: any) => {
    const formData = new FormData();
    const select = formRef.current;
    if (!select) return;
    const alertType = select.value;
    const currentRef = editorRef?.current;
    const editor = currentRef?.getEditor();
    editor?.blur();
    const contents = editor?.getContents();
    const jsonifiedContents = JSON.stringify(contents);
    formData.append("details", jsonifiedContents);
    formData.append("alert", alertType);
    alert.submit(formData, { method: "post" });
  };

  useEffect(() => {
    console.log(alert.data);
  }, [alert.data]);
  return (
    <div>
      <h1>Create Alert</h1>
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
            <select name="type" ref={formRef}>
              <option value="alert">Alert</option>
              <option value="recommendation">Recommendation</option>
            </select>
            <label htmlFor="">
              Region
              <select multiple name="regions">
                {regions.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="">
              Affected Crops
              <select multiple name="crops">
                {crops.map((crop) => (
                  <option key={crop.name} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={handleSubmit}>Save</button>
          </main>
        )}
      </ClientOnly>
    </div>
  );
};
export default CreateAlert;

import { Button, Heading, Textarea } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { FC } from "react";
import styles from "~/styles/routes/alerts.create_alert.css";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";
import {
  ActionArgs,
  LinksFunction,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";
import { z } from "zod";
import { getUser } from "~/session.server";
import { prisma } from "~/db.server";
import { unstable_createFileUploadHandler } from "@remix-run/node";
import { nanoid } from "nanoid";

export const link: LinksFunction = () => [{ href: styles, rel: "stylesheet" }];
export const handle = {
  title: () => <Heading>Generate Alert</Heading>,
};
const AlertSchema = z.object({
  region: z.string(), // TODO : z.arrary(z.string())
  alert_type: z.string(),
  details: z.string(),
  affected_crops: z.string(), // TODO : z.arrary(z.string())
  alert_image: z.object({
    filepath: z.string(),
  }),
});

export async function action({ request }: ActionArgs) {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => `${nanoid()}_${filename}`,
      directory: "public/alerts",
    }),
    unstable_createMemoryUploadHandler()
  );
  const form = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = {
    region: form.get("region"),
    alert_type: form.get("type"),
    details: form.get("details"),
    affected_crops: form.get("affected_crops"),
    alert_image: form.get("alert_image"),
  };
  AlertSchema.parse(data);
  await prisma.alert.create({
    data: {
      region: {
        connect: {
          name: data.region,
        },
      },
      alertType: data.alert_type,
      details: data.details,
      imagePath: data.alert_image?.filepath,
      affectedCrops: {
        /* assuming affected_crops has format [{name: 'Potato'}, {name: 'Tomato'}] */
        connect: {
          name: data.affected_crops,
        },
      },
    },
  });
}
/*
Alert: Tomorrow will be raining. Don't apply irrigation in your field.
Recommendation: Apply urea as per the rate of 50kg per acre.
*/
interface CreateAlertProps {}
const CreateAlert: FC<CreateAlertProps> = (props) => {
  return (
    <div className="CreateAlert grid grid-cols-12">
      <header className="flex justify-around grid-rows-1 col-span-12">
        <Heading>Generate Alert</Heading>
      </header>
      <main className="grid-rows-2 col-start-3 col-span-7 m-11">
        <Form encType="multipart/form-data" method="post" data-netlify="true">
          <label className="flex items-center gap-2 m-4">
            <span>Region</span>
            <Select
              isMulti
              options={[
                {
                  label: "Sargodha",
                  value: "sargodha",
                },
                {
                  label: "Sahiwal",
                  value: "sahiwal",
                },
              ]}
              name="region"
            />
          </label>
          <label className="flex items-center gap-2 m-4">
            <span>Alert Type</span>
            <select name="type">
              <option value="recommendation">Recommendation</option>
              <option value="alert">Alert</option>
            </select>
          </label>
          <label className="flex items-center gap-2 m-4">
            <span>Details</span>
            <Textarea name="details" />
          </label>
          <label className="flex items-center gap-2 m-4">
            <span>Affected Crops</span>
            <Select
              isMulti
              name="affected_crops"
              options={[
                {
                  label: "Potato",
                  value: "potato",
                },
                {
                  label: "Tomato",
                  value: "tomato",
                },
              ]}
            />
          </label>
          <label className="m-4">
            Attach Image
            <input
              name="alert_image"
              accept="image/png, image/jpeg"
              type="file"
            />
          </label>
          <Button type="submit">Send</Button>
        </Form>
      </main>
    </div>
  );
};
export default CreateAlert;

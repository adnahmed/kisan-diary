import { Heading } from "@chakra-ui/react";
import type { AlertType } from "@prisma/client";
import { unstable_createFileUploadHandler } from "@remix-run/node";
import type { ActionArgs, LinksFunction } from "@remix-run/server-runtime";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";

import { nanoid } from "nanoid";
import type { FC } from "react";
import { z } from "zod";
import AlertCreateEditor from "~/components/pages/Expert/AlertCreateEditor";
import { prisma } from "~/db.server";
import styles from "~/styles/routes/alerts.create_alert.css";
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
      directory: "/public/images",
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
      alertType: data.alert_type as AlertType,
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
    <div>
      <h1>Create Alert</h1>
      <AlertCreateEditor />
    </div>
  );
};
export default CreateAlert;

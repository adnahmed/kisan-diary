import type { FC } from "react";
import CellRow from "~/components/CellRow";
import { z } from "zod";
import { ActionFunction, MetaFunction, redirect } from "@remix-run/node";
import { inputFromFormData, makeDomainFunction } from "domain-functions";
import { prisma } from "~/db.server";
import Form from "~/components/form/form";
import { Form as RemixForm, useActionData } from "@remix-run/react";
import { getSession, sessionStorage, getUser } from "~/session.server";
import { IrrigationSource, LandType, User } from "@prisma/client";
export interface GeneralInformationProps {}
// TODO: move into action
// TODO: Fetch data from data store e.g. prisma
const data = {
  cities: ["Lahore", "Rawalpindi"] as const,
  regions: ["Wahdat Road, Lahore", "Nathia Gali, Murree"] as const,
  machinery: ["Tractor", "Leveler"] as const,
  irrigation_sources: ["TubeWell", "Canal"] as const,
  landTypes: ["Nehri", "Behri"] as const,
};

const CropInformationSchema = z.object({
  type: z.string(),
});

const FarmInformationSchema = z.object({
  name: z.string(),
  city: z.enum(data.cities).default(data.cities[0]),
  region: z.enum(data.regions).default(data.regions[0]),
  landType: z.enum(data.landTypes).default(data.landTypes[0]),
  totalLandSize: z.number(),
  machineryAvailable: z.enum(data.machinery).default(data.machinery[0]),
  irrigationSource: z
    .enum(data.irrigation_sources)
    .default(data.irrigation_sources[0]),
  _action: z.literal("farm_information"),
});

const cropInformationMutation = makeDomainFunction(CropInformationSchema)(
  async (values) => {
    return values;
  }
);
const farmInformationMutation = makeDomainFunction(FarmInformationSchema)(
  async (values, { userId }) => {
    try {
      const farm = await prisma.farm.create({
        data: {
          name: values.name,
          total_land: values.totalLandSize,
          land_type: LandType[values.landType],
          // machinery_available: values.machineryAvailable,
          irrigation_source: IrrigationSource[values.irrigationSource],
          pictures: [],
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return farm;
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      return err;
    }
  }
);

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = (await getUser(request)) as User;
  const formData = await request.formData();
  const { _action, ...values } = inputFromFormData(formData);
  if (_action === "farm_information") {
    try {
      const farm = await farmInformationMutation(values, { userId: user.id });
      if (farm.success) {
        if (session.has("NO_FARM")) session.unset("NO_FARM");
        return redirect("/farmer");
      } else {
        return {
          error: "Error Occurred While Creating Farm",
        };
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  } else if (_action === "/crop_information")
    return await cropInformationMutation(values);
  else {
    session.set("NO_FARM", true);
    return await redirect("/farmer", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }
};
export const meta: MetaFunction = () => {
  return {
    title: "Farm Information",
  };
};

const GeneralInformation: FC<GeneralInformationProps> = () => {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <header>Farm Information</header>
      <main>
        <Form
          schema={FarmInformationSchema}
          hiddenFields={["_action"]}
          values={{
            _action: "farm_information",
          }}
        />
        {actionData && actionData.error}
        <RemixForm method="post">
          <button type="submit" name="_action" value="fill_later">
            Fill Later
          </button>
        </RemixForm>
      </main>
      <div>
        <CellRow
          style={{ fontWeight: "bold" }}
          values={["Crop", "Land Under Crop"]}
        />
        {/* {crops.map((crop) => {
          return <CellRow values={[crop.fullName, crop.landOccupied || "0"]} />;
        })} */}
      </div>
      <button type="submit">Save</button>
    </div>
  );
};

export default GeneralInformation;

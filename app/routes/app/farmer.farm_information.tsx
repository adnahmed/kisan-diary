import type { FC } from "react";
import { useState } from "react";
import { z } from "zod";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { makeDomainFunction } from "domain-functions";
import { prisma } from "~/db.server";
import Form from "~/components/form/form";
import { useActionData, useCatch, useLoaderData } from "@remix-run/react";
import { getSession, getUser } from "~/session.server";
import type { User } from "@prisma/client";
import React from "react";
import SaveButton from "~/components/form/SaveButton";
import { performMutation } from "remix-forms";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { LoaderArgs, ActionFunction, MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import type FarmCreateInput from "../../types/FarmCreateInput";
import { Center, Icon, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Input from "~/components/form/input";
import DisabledInput from "~/components/form/disabled-input";
import InputWrapper from "~/components/form/input-wrapper";
import DisabledSelect from "~/components/form/disabled-select";
import Select from "~/components/form/select";
import DisabledSaveButton from "~/components/form/disabled-save-button";
export interface GeneralInformationProps {}
// TODO: move into action
// TODO: Fetch data from data store e.g. prisma
const data = {
  regions: ["Wahdat Road, Lahore", "Nathia Gali, Murree", "Sialkot"] as const,
  machinery: ["Tractor", "Leveler"] as const,
  irrigation_sources: ["TubeWell", "Canal"] as const,
  soilTypes: ["Nehri", "Behri"] as const,
};
const FarmInformationSchema = z.object({
  farmName: z.string().min(1),
  region: z.enum(data.regions),
  soilType: z.enum(data.soilTypes).optional(),
  totalLandSize: z.number().optional(),
  machinery: z.enum(data.machinery).optional(),
  irrigationSource: z.enum(data.irrigation_sources).optional(),
});

const UserIdSchema = z.object({ userId: z.string() });
const farmInformationMutation = makeDomainFunction(
  FarmInformationSchema,
  UserIdSchema
)(async (values, { userId }) => {
  const farmInput: FarmCreateInput = {
    name: values.farmName,
    region: values.region,
    total_land: values.totalLandSize || null,
    land_type: values.soilType || null,
    irrigation_source:
      (values.irrigationSource && [values.irrigationSource]) || [], // TODO: make array
    machinery: (values.machinery && [values.machinery]) || [], // TODO: make array
  };

  const prismaFarmInput = {
    ...farmInput,
    user: {
      connect: {
        id: userId,
      },
    },
    region: {
      connectOrCreate: {
        create: { name: values.region },
        where: { name: values.region },
      },
    },
  };

  try {
    const farm = await prisma.farm.upsert({
      where: { name: values.farmName },
      update: prismaFarmInput,
      create: prismaFarmInput,
    });
    return farm;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002" && error.message.includes("owner"))
        throw new Error("Farm Name already taken");
    }
    throw error;
  }
});

export const action: ActionFunction = async ({ request }) => {
  const user = (await getUser(request)) as User;
  const session = await getSession(request);
  const result = await performMutation({
    request,
    schema: FarmInformationSchema,
    mutation: farmInformationMutation,
    environment: { userId: user.id },
  });
  return json(result, result.success ? 200 : 400);
};
export const meta: MetaFunction = () => {
  return {
    title: "Farm Information",
  };
};

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

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request);
  const user = await getUser(request);
  // if (!user || !session) throw redirect("/");
  return typedjson({
    farm:
      (await prisma.farm.findUnique({
        where: {
          owner: user.id,
        },
      })) || undefined,
  });
}

const GeneralInformation: FC<GeneralInformationProps> = () => {
  const actionData = useActionData<typeof action>();
  const { farm } = useTypedLoaderData<typeof loader>();
  const [showEdit, setShowEdit] = useState(farm !== undefined);

  return (
    <div className="flex flex-col gap-5 ">
      <header className="place-self-center text-2xl">Farm Information</header>
      <main className="w-1/2 place-self-center border p-5 rounded-md">
        <div className="flex flex-col">
          <div
            className="w-6 h-6 self-end"
            onClick={() => setShowEdit(!showEdit)}
          >
            <EditIcon
              aria-label="edit"
              bg="cabi"
              color="wheat"
              boxSize={"1"}
              _hover={{
                color: "cabi",
                bg: "wheat",
              }}
            />
          </div>
          <Form
            inputComponent={
              farm !== undefined && showEdit ? DisabledInput : Input
            }
            selectComponent={
              farm !== undefined && showEdit ? DisabledSelect : Select
            }
            buttonComponent={
              farm !== undefined && showEdit ? DisabledSaveButton : SaveButton
            }
            schema={FarmInformationSchema}
            values={{
              farmName: farm?.name ?? "",
              region: farm?.regionName ?? "",
            }}
          />

          {actionData && actionData.error}
        </div>
      </main>
    </div>
  );
};
/*
      <div>
        <CellRow
          style={{ fontWeight: "bold" }}
          values={["Crop", "Land Under Crop"]}
        />
        { {crops.map((crop) => {
          return <CellRow values={[crop.fullName, crop.landOccupied || "0"]} />;
        })} }
      </div>
      <button type="submit">Save</button>


*/
export default GeneralInformation;

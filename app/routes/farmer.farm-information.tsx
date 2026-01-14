import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useCatch } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import type { FC } from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { performMutation } from "remix-forms";
import { z } from "zod";
import SaveButton from "~/components/form/SaveButton";
import DisabledInput from "~/components/form/disabled-input";
import DisabledSaveButton from "~/components/form/disabled-save-button";
import DisabledSelect from "~/components/form/disabled-select";
import Form from "~/components/form/form";
import Input from "~/components/form/input";
import Select from "~/components/form/select";
import { GlassCard } from "~/components/GlassCard";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import type FarmCreateInput from "~/types/FarmCreateInput";
import { useOptionalFarm } from "../components/hooks/useOptionalFarm";

export interface GeneralInformationProps {}

// ... data and schema definitions ...
// Keep existing schema logic exactly as is
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
      (values.irrigationSource && [values.irrigationSource]) || [], 
    machinery: (values.machinery && [values.machinery]) || [], 
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
  const farm = await prisma.farm.upsert({
    where: { name: values.farmName },
    update: prismaFarmInput,
    create: prismaFarmInput,
  });
  return farm;
});

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) throw new Response("User was not found");
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
    <div className="p-4 bg-red-50 text-red-900 border border-red-200 rounded-lg">
      <h1 className="font-bold text-lg mb-2">Error</h1>
      <p>{error.message}</p>
      <div className="mt-4 p-4 bg-red-100 rounded overflow-auto">
        <p className="font-mono text-xs">{error.stack}</p>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="p-4 bg-yellow-50 text-yellow-900 border border-yellow-200 rounded-lg">
      <h1 className="font-bold text-lg">Caught {caught.status}</h1>
      <pre className="mt-2 text-xs overflow-auto">
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export const id: string = "farm_information";

const GeneralInformation: FC<GeneralInformationProps> = () => {
  const actionData = useActionData<typeof action>();
  const farm = useOptionalFarm();
  const [showEdit, setShowEdit] = useState(farm !== undefined);

  return (
    <div className="flex flex-col gap-5 p-6 animate-fade-in relative z-10">
      <h1 className="text-3xl font-heading font-bold text-white mb-4 drop-shadow-md">
         Farm Information
      </h1>

      <GlassCard className="w-full max-w-2xl mx-auto p-8 border-t border-white/20">
        <div className="flex flex-col">
          <div className="flex justify-end mb-4">
             <button
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white group"
                onClick={() => setShowEdit(!showEdit)}
                aria-label="Edit Farm Information"
             >
                <FaEdit className="w-6 h-6 group-hover:scale-110 transition-transform" />
             </button>
          </div>

          <Form
            inputComponent={farm && showEdit ? DisabledInput : Input}
            selectComponent={farm && showEdit ? DisabledSelect : Select}
            buttonComponent={farm && showEdit ? DisabledSaveButton : SaveButton}
            schema={FarmInformationSchema}
            values={{
              farmName: farm?.name ?? "",
              region: farm?.regionName ?? "",
              irrigationSource: farm?.irrigation_source?.[0] ?? "", // Fixed to safely access array
            }}
            className="space-y-6"
          />
          {actionData && actionData.error && (
             <div className="mt-4 text-red-500 font-medium">
                {actionData.error}
             </div>
          )}
        </div>
      </GlassCard>
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

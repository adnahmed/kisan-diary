import { useState } from "react";
import onChangeInput from "~/helpers/onChangeInput";

import {
  Form as RemixForm,
  Link,
  NavLink,
  useLoaderData,
} from "@remix-run/react";
import GlowyButton from "~/components/glowy_button";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUser, getSession } from "~/session.server";
import { z } from "zod";
import Form from "~/components/form/form";
import { inputFromFormData } from "domain-functions";
import { Farm, User } from "@prisma/client";

async function getFarmWithCrops(user: User) {
  return await prisma.farm.findUnique({
    where: {
      owner: user?.id,
    },
    include: {
      crops: true,
    },
  });
}
export async function loader({ request }) {
  const session = await getSession(request);
  const user = await getUser(request);
  if (!session.has("NO_FARM"))
    try {
      const farm = await getFarmWithCrops(user as User);
      return {
        user,
        farm: farm || undefined,
        crops: farm?.crops,
      };
    } catch (err) {
      return redirect("farm_information");
    }
  return { user };
}

export async function action({ request }) {
  const formData = await request.formData();
  const values = inputFromFormData(formData);
}

const CropSchema = z.object({
  name: z.string(),
});

export interface DashboardProps {}
export default function Dashboard(props: DashboardProps) {
  const { farm, user, crops } = useLoaderData<typeof loader>();
  const [showNewCropForm, setShowNewCropForm] = useState(false);
  return (
    <main>
      {crops && (
        <div>
          {!showNewCropForm && (
            <button onClick={() => setShowNewCropForm(!showNewCropForm)}>
              <GlowyButton>
                <b style={{ color: "blue" }}>New Crop</b>
              </GlowyButton>
            </button>
          )}
          {showNewCropForm && <Form schema={CropSchema} />}
          <div
            className="CropSelection"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex" }}>
              <b style={{ flex: "1", color: "green", fontSize: "xxx-large" }}>
                Crops
              </b>
            </div>
            {crops.map((crop) => (
              <div
                key={crop.id}
                id="dashboard-table"
                style={{ display: "flex" }}
              >
                <div
                  id="dashboard-table-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "space-between",
                    flex: "1",
                    maxWidth: "300px",
                    alignItems: "center",
                  }}
                >
                  <GlowyButton>
                    <Link to={"/crop/" + crop.fullName}>{crop.fullName}</Link>
                  </GlowyButton>
                  <img
                    style={{
                      display: "inline",
                      borderWidth: "1px",
                      maxHeight: "200px",
                    }}
                    alt={crop.fullName + " Image"}
                    src={"assets/" + crop.fullName.toLowerCase() + ".jpg"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

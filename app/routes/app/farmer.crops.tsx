import { Link } from "@chakra-ui/react";
import type { User } from "@prisma/client";
import { json, redirect } from "@remix-run/node";
import { Outlet, Link as RemixLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { z } from "zod";
import Form from "~/components/form/form";
import GlowyButton from "~/components/glowy_button";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

async function getFarmWithCrops(user: User) {
  // TODO: return crops with farm
  return await prisma.farm.findUnique({
    where: {
      owner: user?.id,
    },
  });
}
export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) return redirect("/");
  const farm = await getFarmWithCrops(user);
  return json({
    user,
    farm: farm,
    crops: farm?.crops,
  });
}
const CropSchema = z.object({
  name: z.string(),
});
export default function Crops() {
  const data = useLoaderData<typeof loader>();
  const [showNewCropForm, setShowNewCropForm] = useState(false);
  return (
    <main>
      <div>
        <div>
          {!showNewCropForm && (
            <button onClick={() => setShowNewCropForm(!showNewCropForm)}>
              <GlowyButton>
                <b style={{ color: "blue" }}>New Crop</b>
              </GlowyButton>
            </button>
          )}
          {showNewCropForm && <Form schema={CropSchema} />}
        </div>
        <div
          className="CropSelection"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <b style={{ flex: "0", color: "green", fontSize: "xxx-large" }}>
              Crops
            </b>
          </div>
          {/* crops.map */}
          {[
            { id: "0", fullName: "Potato" },
            { id: "1", fullName: "Wheat" },
          ].map((crop) => (
            <div key={crop.id} id="dashboard-table" style={{ display: "flex" }}>
              <div
                id="dashboard-table-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  flex: "0",
                  maxWidth: "299px",
                  alignItems: "center",
                }}
              >
                <GlowyButton>
                  <Link as={RemixLink} to={`year_select?crop=${crop.fullName}`}>
                    {crop.fullName}
                  </Link>
                </GlowyButton>
                <img
                  style={{
                    display: "inline",
                    borderWidth: "0px",
                    maxHeight: "199px",
                  }}
                  alt={crop.fullName + " Image"}
                  src={"assets/" + crop.fullName.toLowerCase() + ".jpg"}
                />
              </div>
              <Outlet />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

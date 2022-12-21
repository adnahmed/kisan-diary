import { Outlet, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import { z } from "zod";
import { inputFromFormData } from "domain-functions";
import type { User } from "@prisma/client";
import { Link as RemixLink } from "@remix-run/react";
import { Link } from "@chakra-ui/react";
import { useState } from "react";
import GlowyButton from "~/components/glowy_button";
import Form from "~/components/form/form";

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
  const user = await getUser(request);
  if (!user) return redirect("/");
  const farm = await getFarmWithCrops(user);
  return json({
    user,
    farm: farm,
    crops: farm?.crops,
  });
}
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

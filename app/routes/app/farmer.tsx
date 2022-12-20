import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUser, getSession } from "~/session.server";
import { z } from "zod";
import { inputFromFormData } from "domain-functions";
import { User } from "@prisma/client";
import { Link as RemixLink } from "@remix-run/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import GlowyButton from "~/components/glowy_button";
import Form from "~/components/form/form";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CABIButton from "../../components/CABIButton";

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

export default function FarmerDashboard() {
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

const CropSchema = z.object({
  name: z.string(),
});

export async function action({ request }) {
  const formData = await request.formData();
  const values = inputFromFormData(formData);
}

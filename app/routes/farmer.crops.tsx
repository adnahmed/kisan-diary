import { Box } from "@chakra-ui/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { route } from "routes-gen";
import CropsHeader from "~/components/pages/CropsHeader";
import { prisma } from "~/db.server";
import fetchFarm from "~/models/farm.server";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/farmer.crops.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Error("Unauthorized!");
  const farm = await fetchFarm(user);
  if (!farm) throw new Error("Please add farm information.");
  return typedjson({
    fd: await prisma.financialData.findMany({
      where: {
        Farm: {
          id: farm.id,
        },
      },
      include: {
        crop: true,
      },
    }),
  });
}

export default function Crops() {
  return (
    <div className="crops__dashboard">
      <CropsHeader />
      <AllCropsList />
    </div>
  );
}

function AllCropsList() {
  const data = useTypedLoaderData<typeof loader>();
  return (
    <>
      <Box
        display={"flex"}
        as="span"
        bg={"cabi"}
        color={`wheat`}
        flex="1"
        textAlign="left"
        justifyContent={"space-between"}
      >
        <span className="allCrops__heading">All Crops</span>
      </Box>
      {data.fd.map((fd) => (
        <div key={fd.id} className="allCrops__crops crops__crop">
          <Link
            className="allCrops__crops crops__data--name"
            to={`${route(`/farmer/crop/:cropId`, {
              cropId: fd.crop.id,
            })}?fdata=${fd.id}`}
          >
            <span>{fd.crop.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { route } from "routes-gen";
import NewCropModal from "~/components/pages/NewCrop";
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
    crops: await prisma.crop.findMany({
      where: {
        farms: {
          every: {
            id: farm.id,
          },
        },
      },
    }),
  });
}
export default function Crops() {
  const data = useTypedLoaderData<typeof loader>();
  const deleteCrop = (id: string) => {
    // setCropsList(cropList.filter((c) => c.id !== id));
  };
  return (
    <div className="crops__dashboard">
      <NewCropModal />
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton _expanded={{ bg: "cabi", color: "wheat" }}>
            <Box
              display={"flex"}
              as="span"
              flex="1"
              textAlign="left"
              justifyContent={"space-between"}
            >
              <span>All Crops</span>
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <AccordionPanel pb={4}>
            {data.crops.map((c) => (
              <div key={c.id}>
                <Link to={route(`/farmer/crop/${crop.id}`)}>
                  <span>{c.name}</span>
                </Link>
                <button onClick={() => deleteCrop(c.id)}>Delete</button>
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

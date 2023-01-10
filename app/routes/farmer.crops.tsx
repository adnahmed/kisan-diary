import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  IconButton,
} from "@chakra-ui/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import NewCropModal from "~/components/pages/NewCrop";
import type { Crop } from "~/models/Data/Crop";
import styles from "~/styles/routes/farmer.crops.css";
export async function loader({ request }: LoaderArgs) {
  return {};
}
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Crops() {
  const [cropList, setCropsList] = useState<Crop[]>([]);
  const [showCropForm, setShowCropForm] = useState(false);
  const deleteCrop = (id: string) => {
    setCropsList(cropList.filter((c) => c.id !== id));
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
            {cropList.map((c) => (
              <div key={c.fullName}>
                <span>{c.fullName}</span>
                <button onClick={() => deleteCrop(c.id)}>Delete</button>
                <button onClick={() => setShowCropForm(true)}>View</button>{" "}
              </div>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

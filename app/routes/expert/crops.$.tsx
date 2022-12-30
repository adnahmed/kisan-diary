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
import { Link } from "@remix-run/react";
import { useState } from "react";
import NewCropModal from "~/components/pages/NewCrop";
import type { Crop } from "~/models/Data/Crop";

export const handle = {
  title: (
    <div className="flex w-full pl-2">
      <span className="flex-1">Crops</span>
      <Link to="crops/new">
        <IconButton
          aria-label="Add"
          bg="cabi"
          color="wheat"
          border="1px"
          borderColor="cabi"
          icon={
            <Center h="100%" w="100%">
              <AddIcon />
            </Center>
          }
          boxSize={8}
          _hover={{
            color: "cabi",
            bg: "wheat",
          }}
        />
      </Link>
    </div>
  ),
};

export default function Crops() {
  const [cropList, setCropsList] = useState<Crop[]>([]);
  const [showCropForm, setShowCropForm] = useState(false);
  const deleteCrop = (id: string) => {
    setCropsList(cropList.filter((c) => c.id !== id));
  };
  return (
    <div className="col-start-1 col-span-12">
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

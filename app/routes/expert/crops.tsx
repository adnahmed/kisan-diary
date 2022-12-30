import { AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Crop } from "~/models/Data/Crop";

export default function Crops() {
  const [cropList, setCropsList] = useState<Crop[]>([]);
  const [showAllCrops, setShowAllCrops] = useState(false);
  const [showCropForm, setShowCropForm] = useState(false);
  const deleteCrop = (id: string) => {
    setCropsList(cropList.filter((c) => c.id !== id));
  };

  return (
    <Card className="crops">
      <CardHeader>
        <Heading className="flex justify-between" size="md">
          <span className="CardHeading">Crops</span>
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
        </Heading>
      </CardHeader>
      <CardBody>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "cabi", color: "wheat" }}>
                <Box as="span" flex="1" textAlign="left">
                  All Crops
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {cropList.map((c) => (
                <div key={c.fullName}>
                  <span>{c.fullName}</span>
                  <button onClick={() => deleteCrop(c.id)}>Delete</button>
                  <button onClick={() => setShowCropForm(true)}>
                    View
                  </button>{" "}
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
}

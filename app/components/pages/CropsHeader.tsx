import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Center, IconButton } from "@chakra-ui/react";
import type { LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import Heading from "~/components/form/heading";
import WithModal from "~/components/pages/WithModal";
import { prisma } from "~/db.server";
import CABIButton from "../cabi-button";
export async function loader({ params }: LoaderArgs) {
  return typedjson({
    crops: await prisma.crop.findMany(),
  });
}

export function AddCrop() {
  const data = useTypedLoaderData<typeof loader>();
  return (
    <div>
      <form>
        <label>
          Type
          <select multiple name="type">
            {data &&
              data.crops.map((crop) => (
                <option key={crop.id} value={crop.name}>
                  {crop.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          Year
          <select name="year"></select>
        </label>
        <CABIButton type="submit" rightIcon={<ChevronRightIcon />}>
          Next
        </CABIButton>
      </form>
    </div>
  );
}

const CropsHeader = () => {
  const [showNewCropModal, setShowNewCropModal] = useState(false);
  return (
    <div>
      <div className="flex w-full">
        <span className="flex-1 text-center">Crops</span>
        <IconButton
          onClick={() => setShowNewCropModal(!showNewCropModal)}
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
      </div>
      <WithModal
        onOpenWhen={showNewCropModal}
        Body={<AddCrop />}
        Header={<Heading>Add Crop</Heading>}
      />
    </div>
  );
};
export default CropsHeader;

import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Center, IconButton, Select } from "@chakra-ui/react";
import type { LoaderArgs } from "@remix-run/node";
import type { ForwardedRef } from "react";
import React, { useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import { z } from "zod";
import Heading from "~/components/form/heading";
import WithModal from "~/components/pages/WithModal";
import CABIButton from "../cabi-button";
interface CropTypeSelectionProps {
  onSelection: () => void;
}
// eslint-disable-next-line react/display-name
const CropTypeSelection = React.forwardRef(
  (props: CropTypeSelectionProps, ref: ForwardedRef<HTMLSelectElement>) => {
    return (
      <div className="flex flex-col gap-4">
        <label>
          Type
          <Select ref={ref} name="type">
            <option value="potato">Potato</option>
            <option value="potato">Maize</option>
          </Select>
        </label>
        <CABIButton
          onClick={props.onSelection}
          rightIcon={<ChevronRightIcon />}
        >
          Next
        </CABIButton>
      </div>
    );
  }
);
const ParamsSchema = z.object({
  type: z.string().min(-1).max(20),
});
export async function loader({ params }: LoaderArgs) {
  // const result = getParams(params, ParamsSchema);
  // TODO: push result to page typed..
  return {};
}

export function NewCrop() {
  const data = useTypedLoaderData<typeof loader>();
  const cropSelectionRef = React.useRef<HTMLSelectElement>(null);
  function showCropForm() {
    const cropSelection = cropSelectionRef.current;
    if (!cropSelection) return;
    const crop = cropSelection.value;
  }
  return (
    <CropTypeSelection ref={cropSelectionRef} onSelection={showCropForm} />
  );
}

const NewCropModal = () => {
  const [showNewCropModal, setShowNewCropModal] = useState(false);
  return (
    <div>
      <div className="flex w-full pl-2">
        <span className="flex-1">Crops</span>
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
        Body={<NewCrop />}
        Header={<Heading>New Crop</Heading>}
      />
    </div>
  );
};
export default NewCropModal;

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import type { LoaderArgs } from "@remix-run/node";
import type { ForwardedRef } from "react";
import React from "react";
import { getParams } from "remix-params-helper";
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
  const result = getParams(params, ParamsSchema);
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
  return !data ? (
    <CropTypeSelection ref={cropSelectionRef} onSelection={showCropForm} />
  ) : (
    <></>
  );
}

const NewCropModal = () => (
  <WithModal
    Body={<NewCrop />}
    Header={<Heading>New Crop</Heading>}
    autoOpenUrl="/expert/crops/new"
  />
);
export default NewCropModal;

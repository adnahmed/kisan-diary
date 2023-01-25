import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Center, IconButton } from "@chakra-ui/react";
import { useCatch, useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { YearPicker } from "react-dropdown-date";
import { useTypedLoaderData } from "remix-typedjson";
import Heading from "~/components/form/heading";
import WithModal from "~/components/pages/WithModal";
import type { loader } from "~/routes/farmer.crops";
import CABIButton from "../cabi-button";

export function AddCrop() {
  const data = useTypedLoaderData<typeof loader>();
  const addCrop = useFetcher();
  const [year, setYear] = useState(new Date().getFullYear());
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (addCrop.type === "done" && addCrop.data?.ok) ref.current?.reset();
  }, [addCrop]);

  return (
    <div>
      <addCrop.Form ref={ref} method="post" action="/api/new_financial_data">
        <label>
          Type
          <select name="type" disabled={addCrop.state === "submitting"}>
            {data &&
              data.crops &&
              data.crops.map((crop) => (
                <option key={crop.id} value={crop.name}>
                  {crop.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          Growing Year
          <YearPicker
            defaultValue={"Select Year"}
            disabled={addCrop.state === "submitting"}
            start={1990}
            value={year}
            name="growingYear"
            onChange={(y) => setYear(y)}
            end={new Date().getFullYear()}
            reverse
            required={true}
          />
        </label>
        <CABIButton type="submit" rightIcon={<ChevronRightIcon />}>
          Add
        </CABIButton>
      </addCrop.Form>
      {addCrop.type === "done" && addCrop.data && addCrop.data?.ok ? (
        <p>Crop has been successfully added.</p>
      ) : addCrop.data?.error ? (
        <p data-error>{addCrop.data.error}</p>
      ) : null}
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

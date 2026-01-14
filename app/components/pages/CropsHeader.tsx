import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FaPlus, FaChevronRight } from "react-icons/fa";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { prisma } from "~/db.server";
import { GlassCard } from "~/components/GlassCard";
import Button from "~/components/form/button";
import Select from "~/components/form/select";
import Heading from "~/components/form/heading";
import WithModal from "~/components/pages/WithModal";

export async function loader({ params }: any) {
  return typedjson({
    crops: await prisma.crop.findMany(),
  });
}

export function AddCrop() {
  const data = useTypedLoaderData<typeof loader>();
  
  return (
    <div className="p-4">
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-surface-700 font-medium">
          Type
          <Select multiple name="type" className="w-full">
            {data &&
              data.crops.map((crop) => (
                <option key={crop.id} value={crop.name}>
                  {crop.name}
                </option>
              ))}
          </Select>
        </label>
        {/* Year select logic would go here */}
        
        <div className="flex justify-end mt-4">
            <Button type="submit" className="flex items-center gap-2">
                Next <FaChevronRight />
            </Button>
        </div>
      </form>
    </div>
  );
}

const CropsHeader = () => {
  const [showNewCropModal, setShowNewCropModal] = useState(false);
  return (
    <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
      <h1 className="text-xl font-bold text-primary-900">Manage Crops</h1>
      
      <Button 
        onClick={() => setShowNewCropModal(true)}
        className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30"
        title="Add Crop"
      >
        <FaPlus />
      </Button>

      <WithModal
        isOpen={showNewCropModal}
        onClose={() => setShowNewCropModal(false)}
        Body={<AddCrop />}
        Header={<Heading>Add Crop</Heading>}
      />
    </div>
  );
};

export default CropsHeader;

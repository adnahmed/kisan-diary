import { Role, SoilType } from "@prisma/client";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { FC } from "react";
import { useState } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/expert.knowledgebank.css";
import CABIButton from "../../components/cabi-button";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Error("Unauthorized");
  if (!(user.role === Role.expert.toString())) throw new Error("Unauthorized");

  return typedjson({
    regions: await prisma.region.findMany(),
    crops: await prisma.crop.findMany(),
  });
}
interface CropFormProps {
  cropId: string;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
}
const CropFormValues = {
  cropName: "",
  suitableLandTypes: [],
  suitableRegions: [],
  suitableSeasons: [],
  pictures: [],
};
const LandTypes = [
  { value: "1", label: "Nehri" },
  { value: "2", label: "Sookhi" },
  { value: "3", label: "Behri" },
];

const CropForm: FC<CropFormProps> = ({ cropId }) => {
  const data = useTypedLoaderData<typeof loader>();
  const { crops, regions } = data;
  const [images, setImages] = useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const onSave = () => {};

  return (
    <div className="knowledgebank knowledgebank__dashboard">
      <Form method="post" className="knowledgebank__dashboard dashboard__form">
        <div className="dashboard__form form__field">
          <label htmlFor="crop_name">Crop Name</label>
          <select name="crop_name">
            {crops.map((crop) => (
              <option key={crop.id}>{crop.name}</option>
            ))}
          </select>
        </div>
        <div className="dashboard__form form__field">
          <label htmlFor="soil_type">Suitable Soil Types</label>
          <select name="soil_type" multiple>
            {Object.keys(SoilType).map((soil_type) => (
              <option key={soil_type} value={soil_type}>
                {soil_type}
              </option>
            ))}
          </select>
        </div>
        <div className="dashboard__form form__field">
          <label htmlFor="regions">Suitable Regions</label>
          <select name="regions" multiple>
            {regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div className="dashboard__form form__field">
          <label htmlFor="seasons">Suitable Seasons</label>
          <select name="seasons" multiple>
            <option value="rabbi">Rabbi</option>
            <option value="kharif">Kharif</option>
          </select>
        </div>
        <CABIButton className="dashboard__form form__submit">Save</CABIButton>
      </Form>
    </div>
  );
};

export default CropForm;

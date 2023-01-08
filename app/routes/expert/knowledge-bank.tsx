import type { Season } from "@prisma/client";
import { Role, SoilType } from "@prisma/client";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { FC } from "react";
import {
  typedjson,
  useTypedActionData,
  useTypedLoaderData,
} from "remix-typedjson";
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
    crops: await prisma.crop.findMany({ include: { suitableRegions: true } }),
  });
}
interface CropFormProps {
  cropId: string;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const cropName = formData.get("crop_name");
  if (!cropName) return null;
  const suitableSoilTypes = formData.getAll("soil_type");
  const suitableRegions = formData.getAll("region");
  if (!suitableRegions) return null;
  const suitableSeasons = formData.getAll("season");
  await prisma.crop.update({
    where: {
      name: cropName?.toString(),
    },
    data: {
      suitableSoilTypes: suitableSoilTypes.map(
        (suitableSoilType) => suitableSoilType.toString() as SoilType
      ),
      suitableRegions: {
        connect: suitableRegions.map((suitableRegion) => ({
          name: suitableRegion.toString(),
        })),
      },
      suitableSeasons: suitableSeasons.map(
        (suitableSeason) => suitableSeason.toString() as Season
      ),
    },
  });
  return null;
}

const CropForm: FC<CropFormProps> = ({ cropId }) => {
  const data = useTypedLoaderData<typeof loader>();
  const action_data = useTypedActionData<typeof action>();
  const { crops, regions } = data;
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
          <label htmlFor="region">Suitable Regions</label>
          <select name="region" multiple>
            {regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div className="dashboard__form form__field">
          <label htmlFor="season">Suitable Seasons</label>
          <select name="season" multiple>
            <option value="Rabbi">Rabbi</option>
            <option value="Kharif">Kharif</option>
          </select>
        </div>
        <CABIButton type="submit" className="dashboard__form form__submit">
          Save
        </CABIButton>
      </Form>
    </div>
  );
};

export default CropForm;

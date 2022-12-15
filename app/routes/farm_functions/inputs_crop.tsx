import { Link } from "@remix-run/react";
import { FC } from "react";

export interface InputsCropProps {}

const InputsCrop: FC<InputsCropProps> = () => {
  return (
    <div>
      <b>Inputs Details</b>
      <ul>
        <li className="input-menu">
          <a>
            <Link to="seed">Seed</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="irrigation">Irrigation</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="labor-management">Labor Management</Link>
          </a>
        </li>
        <li>
          <Link to="integrated-pest-management">
            Integrated Pest Management
          </Link>
        </li>
        <li>
          <Link to="integrated-disease-management">
            Integrated Disease Management
          </Link>
        </li>
        <li>
          <a>
            <Link to="integrated-weed-management">
              Integrated Weed Management
            </Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="nutrient-management">Nutrient Management</Link>
          </a>
        </li>
        <li>
          <a>
            <Link to="gross-inputs-cost">Gross Inputs Cost</Link>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default InputsCrop;

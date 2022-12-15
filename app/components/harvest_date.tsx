import {Outlet} from "react-router-dom";
export interface HarvestDateProps {}
export default function HarvestDate(props: HarvestDateProps) {
    return (
        <div>
            <p>
                Harvesting Date: {new Date().toLocaleDateString()}
            </p>
            <Outlet/>
        </div>
    )
}
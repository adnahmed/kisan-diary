import type { Crop } from "~/models/Data/Crop";

interface Farmer {
  id: string;
  firstName: string;
  lastName: string;
  numCrops: number;
  followingRecommendation: boolean;
  culpritCrops: string[];
  farmLocation: string;
  farmCity: string;
  currentSeason: string;
  allCrops: Crop[];
}
const ALL_CROPS: Crop[] = [
  { id: "1", fullName: "Potato", landOccupied: 8 },
  { id: "2", fullName: "Maize", landOccupied: 7 },
];
const ALL_FARMERS: Farmer[] = [
  {
    id: "1",
    firstName: "Farhan",
    lastName: "Jagir",
    numCrops: 3,
    followingRecommendation: true,
    culpritCrops: [],
    farmLocation: "Nathia",
    farmCity: "Islamabad",
    currentSeason: "Khareef",
    allCrops: [ALL_CROPS[0]],
  },
  {
    id: "2",
    firstName: "Waseeb",
    lastName: "Inra",
    numCrops: 2,
    followingRecommendation: false,
    culpritCrops: ["Maize"],
    farmLocation: "Ghidra",
    farmCity: "Lahore",
    currentSeason: "Rabbi",
    allCrops: [ALL_CROPS[0], ALL_CROPS[1]],
  },
];

export function Farmers() {
  return (
    <div className="farmers">
      <span>Farmers</span>
      <div onClick={() => console.log("clik")}>Filter</div>
      <div onClick={() => console.log("clik")}>Sort</div>
      <div>
        <div>
          <span>Name</span>
          <span>Number of Crops</span>
          <span>Following Recommendations</span>
        </div>
        {ALL_FARMERS.map((f) => (
          <div key={f.id} onClick={() => showFarmerWithId(f.id)}>
            <span>{f.firstName}</span>
            <span>{f.numCrops}</span>
            <span>{f.followingRecommendation ? "Yes" : "No"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

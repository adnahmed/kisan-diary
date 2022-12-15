import { Link } from "@remix-run/react";
import { FC, useState, useEffect } from "react";
import CellRow from "~/components/CellRow";
import GlowyButton from "~/components/glowy_button";
import { Crop } from "~/models/Data/Crop";
import SoilType from "~/models/Data/SoilType";
import { useFarmStore } from "~/models/Data/StoreHooks/useFarmStore";
import useUserStore from "~/models/Data/StoreHooks/useUserStore";

export interface GeneralInformationProps {}

const GeneralInformation: FC<GeneralInformationProps> = () => {
  const [editing, setEditing] = useState(false);
  const farmOwner = useFarmStore((state) => state.owner);
  const setFarmOwner = useFarmStore((state) => state.setFarmOwner);
  const totalLand = useFarmStore((state) => state.totalLand);
  const setTotalLand = useFarmStore((state) => state.setFarmTotalLand);
  const ownLand = useUserStore((state) => state.ownLand);
  const setOwnLand = useUserStore((state) => state.setOwnLand);
  const leasedLand = useUserStore((state) => state.leasedLand);
  const setLeasedLand = useUserStore((state) => state.setLeasedLand);
  const soilType = useUserStore((state) => state.soilType);
  const setSoilType = useUserStore((state) => state.setSoilType);
  const irrigationSourceOne = useUserStore((state) => state.irrigationSources);
  const changeIrrigationSources = useUserStore(
    (state) => state.changeIrrigationSource
  );
  const machinery = useFarmStore((state) => state.machinery);
  const setMachinery = useFarmStore((state) => state.setFarmMachinery);
  const crops: Crop[] = [
    {
      id: "1",
      fullName: "Potato",
      landOccupied: 10,
    },
    {
      id: "2",
      fullName: "Maize",
      landOccupied: 8,
    },
    {
      id: "3",
      fullName: "Wheat",
      landOccupied: 9,
    },
  ];
  // const crops = useCropsStore(state => state.values)
  const editGeneralInformation = () => {
    setEditing(true);
  };
  const saveEdit = () => {
    setEditing(false);
  };
  const cancelEdit = () => {
    setEditing(false);
  };
  useEffect(() => {
    setSoilType({ target: { value: soilType[0] } });
  });
  return (
    <div className="GeneralInformation">
      <div id="menu-buttons">
        <div className="next button">
          <Link to="dashboard">
            <GlowyButton>Next Page</GlowyButton>
          </Link>
        </div>
        {!editing ? (
          <GlowyButton onClick={editGeneralInformation}>Edit Page</GlowyButton>
        ) : (
          <div
            style={{
              display: "flex",
            }}
          >
            <GlowyButton onClick={saveEdit}>Save Page</GlowyButton>

            <GlowyButton style={{ color: "red" }} onClick={cancelEdit}>
              Cancel Changes
            </GlowyButton>
          </div>
        )}
      </div>
      <b id="heading">General Information of the Farm</b>
      <div id="owner">
        Farm Owner Name:
        {editing ? (
          <input value={farmOwner} onChange={setFarmOwner}></input>
        ) : (
          <div className="information"> {farmOwner} </div>
        )}
      </div>
      <div id="total-land">
        Total Land:
        {editing ? (
          <input value={totalLand} onChange={setTotalLand}></input>
        ) : (
          <div className="information">{totalLand}</div>
        )}
        {" Acres"}
      </div>
      <div id="own-land">
        Own Land:
        {editing ? (
          <input value={ownLand} onChange={setOwnLand}></input>
        ) : (
          <div className="information">{ownLand}</div>
        )}
        {" Acres"}
      </div>
      <div id="own-land">
        Leased Land:
        {editing ? (
          <input value={leasedLand} onChange={setLeasedLand}></input>
        ) : (
          <div className="information">{leasedLand}</div>
        )}
        {" Acres"}
      </div>
      <div id="own-land">
        <>
          Soil Type:
          {editing ? (
            <form onSubmit={() => {}}>
              {SoilType.map((soilType) => {
                return (
                  <label>
                    <input type="radio" value={soilType.value} />
                    {soilType.label}
                  </label>
                );
              })}
            </form>
          ) : (
            <div className="information">{soilType}</div>
          )}
        </>
      </div>
      <div>
        Irrigation Source
        {editing ? (
          <>
            <input
              className="information"
              value={irrigationSourceOne.one}
              onChange={(event) => {
                changeIrrigationSources("one", event.target.value);
              }}
            />
            <input
              className="information"
              value={irrigationSourceOne.two}
              onChange={(event) => {
                changeIrrigationSources("two", event.target.value);
              }}
            />
          </>
        ) : (
          <>
            <div className="information">{irrigationSourceOne.one}</div>
            <div className="information">{irrigationSourceOne.two}</div>
          </>
        )}
      </div>
      <div>
        Machinery Available
        <input
          className="information"
          value={machinery.one}
          onChange={(event) => {
            setMachinery(0, event.target.value);
          }}
        />
        <input
          className="information"
          value={machinery.two}
          onChange={(event) => {
            setMachinery(1, event.target.value);
          }}
        />
        <input
          className="information"
          value={machinery.three}
          onChange={(event) => {
            setMachinery(2, event.target.value);
          }}
        />
        <input
          className="information"
          value={machinery.four}
          onChange={(event) => {
            setMachinery(3, event.target.value);
          }}
        />
      </div>
      <div>
        <CellRow
          style={{ fontWeight: "bold" }}
          values={["Crop", "Land Under Crop"]}
        />
        {crops.map((crop) => {
          return <CellRow values={[crop.fullName, crop.landOccupied || "0"]} />;
        })}
      </div>
    </div>
  );
};

export default GeneralInformation;

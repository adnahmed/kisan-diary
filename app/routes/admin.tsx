import { Form, Formik } from "formik";
import { Form as RemixForm } from "@remix-run/react";
import { FC, useEffect, useState } from "react";
import {
  ExclamationTriangleIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import styled from "styled-components";
import { Link } from "@remix-run/react";
import { Crop } from "~/models/Data/Crop";
import TextInputFormik from "~/components/form/input/TextInputFormik";
import styles from "~/styles/routes/admin.css";
import { LinksFunction } from "@remix-run/server-runtime";
export const links: LinksFunction = () => [{ href: styles, rel: "stylesheet" }];

interface AdministratorDashboardProps {}

const Line = styled.div`
  border: 0.1em black solid;
`;
const Card = styled.div`
  display: flex;
  border: 0.1em black solid;
  border-radius: 0.3em;
  margin: 0.2em;
`;
const VCard = styled(Card)`
  flex-direction: column;
`;
const HCard = styled(Card)`
  flex-direction: row;
  justify-content: space-around;
  & > * {
    margin: 0.3em;
    border: 1px solid;
    border-radius: 0.3em;
  }
`;
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
interface Message {
  sentDate: Date;
  delivered: Date;
  sender: string;
  message: string;
  seen?: Date;
}

const ALL_MESSAGES: Message[] = [
  {
    sender: "Farhan",
    sentDate: new Date(),
    delivered: new Date(),
    message: "Hello, Please help me decide a suitable crop?",
    seen: new Date(),
  },
  {
    sender: "Waheed",
    sentDate: new Date(),
    delivered: new Date(),
    message: "Can you tell me how to set up a new Crop?",
  },
  {
    sender: "Nmberdar",
    sentDate: new Date(),
    delivered: new Date(),
    message: "Can you tell me how to set up a new Crop?",
  },
];

//  - Administrator adds recommended crops based on Land Description and Season.
const AdministratorDashboard: FC<AdministratorDashboardProps> = () => {
  const [cropList, setCropsList] = useState<Crop[]>([]);
  const [showAllCrops, setShowAllCrops] = useState(false);
  const [showCropForm, setShowCropForm] = useState(false);
  const deleteCrop = (id: string) => {
    setCropsList(cropList.filter((c) => c.id !== id));
  };
  const [showFarmer, setShowFarmer] = useState(false);
  const [currentFarmer, setCurrentFarmer] = useState<Farmer | undefined>(
    undefined
  );
  const showFarmerWithId = (id: string) => {
    setCurrentFarmer(ALL_FARMERS.find((f) => f.id === id));
    setShowFarmer(true);
  };
  const [showChatBox, setShowChatBox] = useState(false);
  return (
    <div className="AdministratorDashboard">
      <VCard className="cropCard">
        <span>Crops</span>
        <Formik
          initialValues={{
            fullName: "",
            landOccupied: 0,
          }}
          onSubmit={(values, action) => {
            setCropsList([
              ...cropList,
              { id: (Math.random() * 10).toString(), ...values },
            ]);
            action.setSubmitting(false);
            action.resetForm();
          }}
        >
          <Form>
            <TextInputFormik name="fullName" label="Full Name" />
            <TextInputFormik name="landOccupied" label="Land Occupied" />
            <button type="submit">Add</button>
          </Form>
        </Formik>
        <Line />
        <ViewList onClick={() => setShowAllCrops(!showAllCrops)}>
          All Crops
        </ViewList>
        <div>
          {showAllCrops &&
            cropList.map((c) => (
              <div key={c.fullName}>
                <span>{c.fullName}</span>
                <button onClick={() => deleteCrop(c.id)}>Delete</button>
                <button onClick={() => setShowCropForm(true)}>View</button>{" "}
              </div>
            ))}
        </div>
      </VCard>
      <VCard className="farmerCard">
        <span>Farmers</span>
        <ViewList onClick={() => console.log("clik")}>Filter</ViewList>
        <ViewList onClick={() => console.log("clik")}>Sort</ViewList>
        <VCard>
          <HCard>
            <span>Name</span>
            <span>Number of Crops</span>
            <span>Following Recommendations</span>
          </HCard>
          {ALL_FARMERS.map((f) => (
            <HCard key={f.id} onClick={() => showFarmerWithId(f.id)}>
              <span>{f.firstName}</span>
              <span>{f.numCrops}</span>
              <span>{f.followingRecommendation ? "Yes" : "No"}</span>
            </HCard>
          ))}
        </VCard>
      </VCard>
      {showFarmer && currentFarmer !== undefined && (
        <VCard>
          <XMarkIcon
            onClick={() => setShowFarmer(false)}
            style={{
              width: "2em",
              height: "2em",
            }}
          />
          <HCard>
            {currentFarmer.firstName}
            <VCard>
              <span>Farm Location: {currentFarmer.farmLocation}</span>
              <span>CurrentSeason: {currentFarmer.currentSeason}</span>
            </VCard>
          </HCard>
          <span>Crops</span>
          <VCard>
            {currentFarmer.allCrops.map((c) => (
              <HCard key={c.id}>
                <span>{c.fullName}</span>
                {currentFarmer.culpritCrops.includes(c.fullName) && (
                  <ExclamationTriangleIcon
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                  />
                )}
              </HCard>
            ))}
          </VCard>
        </VCard>
      )}
      <HCard>
        <Link to="alerts">Manage Alerts</Link>
      </HCard>
      <VCard>
        <HCard onClick={() => setShowChatBox(!showChatBox)}>
          <span>Messages</span>
          <div className="MessageEnvelope">
            <EnvelopeIcon
              style={{
                width: "2em",
                height: "2em",
              }}
            />
            <span className="MessageCount">
              {ALL_MESSAGES.filter((m) => m.seen === undefined).length}
            </span>
          </div>
        </HCard>
        {showChatBox && (
          <VCard className="ChatBox">
            {ALL_MESSAGES.map((m: Message) => {
              return <MessageBox message={m} />;
            })}
          </VCard>
        )}
      </VCard>
      <RemixForm method="post" action="/logout">
        <button type="submit">Logout</button>
      </RemixForm>
    </div>
  );
};
interface MessageBoxProps {
  message: Message;
}

const MessageBox: FC<MessageBoxProps> = ({ message }) => {
  useEffect(() => {
    message.seen = new Date();
  });
  return (
    <HCard className="MessageBox">
      <span className="sender">{message.sender}</span>
      <span className="Message">{message.message}</span>
      <span className="SentDate">{message.sentDate.toLocaleDateString()}</span>
    </HCard>
  );
};

function ViewList({ children, onClick }) {
  const [color, setColor] = useState("white");
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setColor("rgba(95,147,250,0.2)")}
      onMouseLeave={() => setColor("white")}
      style={{
        backgroundColor: color,
        backgroundImage:
          "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20448%22%20enable-background%3D%22new%200%200%20256%20448%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.arrow%7Bfill%3A%23424242%3B%7D%3C%2Fstyle%3E%3Cpath%20class%3D%22arrow%22%20d%3D%22M255.9%20168c0-4.2-1.6-7.9-4.8-11.2-3.2-3.2-6.9-4.8-11.2-4.8H16c-4.2%200-7.9%201.6-11.2%204.8S0%20163.8%200%20168c0%204.4%201.6%208.2%204.8%2011.4l112%20112c3.1%203.1%206.8%204.6%2011.2%204.6%204.4%200%208.2-1.5%2011.4-4.6l112-112c3-3.2%204.5-7%204.5-11.4z%22%2F%3E%3C%2Fsvg%3E%0A')",
        backgroundPosition: "right 10px center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 50%",
        borderRadius: "2px",
        padding: "10px 30px 10px 10px",
      }}
    >
      {children}
    </div>
  );
}
export default AdministratorDashboard;

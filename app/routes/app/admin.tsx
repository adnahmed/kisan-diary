import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HiExclamationTriangle,
  HiEnvelope,
  HiXMark,
  HiSpeakerWave,
} from "react-icons/hi2";
import { Link, Outlet, useMatches } from "@remix-run/react";
import type { Crop } from "~/models/Data/Crop";
import styles from "~/styles/routes/admin.css";
import type { LinksFunction, LoaderArgs } from "@remix-run/server-runtime";
import { getUser } from "~/session.server";
export const links: LinksFunction = () => [{ href: styles, rel: "stylesheet" }];

interface AdministratorDashboardProps {}

export async function loader({ request }: LoaderArgs) {
  return {
    user: await getUser(request),
  };
}

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
  const [showFarmer, setShowFarmer] = useState(false);
  const [currentFarmer, setCurrentFarmer] = useState<Farmer | undefined>(
    undefined
  );
  const showFarmerWithId = (id: string) => {
    setCurrentFarmer(ALL_FARMERS.find((f) => f.id === id));
    setShowFarmer(true);
  };
  const [showChatBox, setShowChatBox] = useState(false);
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const title = lastMatch && lastMatch.handle && lastMatch.handle.title;

  const focusRef = useRef();
  const btnRef = useRef(null);
  return (
    <div className="dashboard">
      <div className="heading flex items-center p-4">
        <IconButton
          aria-label="Open Drawer"
          bg="cabi"
          color="wheat"
          border="1px"
          borderColor="cabi"
          ref={btnRef}
          icon={
            <Center w="100%" h="100%">
              <HamburgerIcon />
            </Center>
          }
          onClick={onOpenDrawer}
        />
        {title || (
          <Heading className="flex justify-around grow" size="lg">
            Administrator Dashboard
          </Heading>
        )}
      </div>
      <Drawer
        isOpen={isOpenDrawer}
        placement="left"
        onClose={onCloseDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              boxSize="150px"
              borderRadius="full"
              fallbackSrc="/assets/blank-profile-picture.webp"
              alt="user_name"
              bg="gray.100"
              fit="scale-down"
            />
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <Link to="crops">
                <Button>Crops</Button>
              </Link>
              <Divider />
              <div className="button manage_alerts">
                <Button
                  leftIcon={<HiSpeakerWave />}
                  bg="cabi"
                  color="white"
                  border="1px"
                  borderColor="cabi"
                  _hover={{ bg: "wheat", color: "cabi" }}
                >
                  <Link to="alerts">Manage Alerts</Link>
                </Button>
              </div>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Outlet />
      <div className="farmers">
        <span>Farmers</span>
        <ViewList onClick={() => console.log("clik")}>Filter</ViewList>
        <ViewList onClick={() => console.log("clik")}>Sort</ViewList>
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
      {showFarmer && currentFarmer !== undefined && (
        <div className="selected entity selected_farmer">
          <HiXMark
            onClick={() => setShowFarmer(false)}
            style={{
              width: "2em",
              height: "2em",
            }}
          />
          <div>
            {currentFarmer.firstName}
            <div>
              <span>Farm Location: {currentFarmer.farmLocation}</span>
              <span>CurrentSeason: {currentFarmer.currentSeason}</span>
            </div>
          </div>
          <div>
            {currentFarmer.allCrops.map((c) => (
              <div key={c.id}>
                <span>{c.fullName}</span>
                {currentFarmer.culpritCrops.includes(c.fullName) && (
                  <HiExclamationTriangle
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="messages">
        <div onClick={() => setShowChatBox(!showChatBox)}>
          <span>Messages</span>
          <div className="MessageEnvelope">
            <HiEnvelope
              style={{
                width: "2em",
                height: "2em",
              }}
            />
            <span className="MessageCount">
              {ALL_MESSAGES.filter((m) => m.seen === undefined).length}
            </span>
          </div>
        </div>
        {showChatBox && (
          <div className="ChatBox">
            {ALL_MESSAGES.map((m: Message) => {
              return <MessageBox message={m} />;
            })}
          </div>
        )}
      </div>
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
    <div className="MessageBox">
      <span className="sender">{message.sender}</span>
      <span className="Message">{message.message}</span>
      <span className="SentDate">{message.sentDate.toLocaleDateString()}</span>
    </div>
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

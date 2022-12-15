import { Link } from "@remix-run/react";
import { FC } from "react";

interface ManageAlertsProps {}

const ALL_YEARS = [1991, 1992, 1993];

const ManageAlerts: FC<ManageAlertsProps> = () => (
  <div className="ManageAlerts">
    <Link to="admin">
      <ChevronLeftIcon
        style={{
          width: "2em",
          height: "2em",
          border: "0.05em black solid",
          borderRadius: "0.5em",
        }}
      />
    </Link>
    <Emoji emoji="speaker-high-volume" size="30" />
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src="/img/building.jpg"
            alt="Modern building architecture"
          />
        </div>
        <div className="p-8">
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            Company retreats
          </div>
          <a
            href="#"
            className="mt-1 block text-lg font-medium leading-tight text-black hover:underline"
          >
            Incredible accomodation for your team
          </a>
          <p className="mt-2 text-slate-500">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
        </div>
      </div>
    </div>
    {/*
    <button>
      Filter
    </button>
  
      <Tabs>
        <TabList>
          <Tab>Season</Tab>
          <Tab>Year</Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
  */}
  </div>
);

export default ManageAlerts;

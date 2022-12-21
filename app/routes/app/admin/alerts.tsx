import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import capitalize from "lodash/capitalize";
import type { FC } from "react";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Emoji from "react-emojis";
import type { ActionFunction } from "@remix-run/server-runtime";

interface ManageAlertsProps {}
export async function loader() {
  return {
    seasons: ["rabbi", "khareef"],
    years: [1991, 1992, 1993],
  };
}
export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  return null;
};
const ManageAlerts: FC<ManageAlertsProps> = () => {
  const [showFilterTabs, setShowFilterTabs] = useState(false);
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  function handleChange(event) {
    submit(event.currentTarget, { replace: true });
  }
  return (
    <div className="ManageAlerts">
      <header>
        <Link to="/admin">
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
        <span>Manage Alerts</span>
      </header>
      <main>
        <button onClick={() => setShowFilterTabs(!showFilterTabs)}>
          Filter
        </button>
        {showFilterTabs && (
          <Tabs>
            <TabList>
              <Tab>Season</Tab>
              <Tab>Year</Tab>
            </TabList>
            <TabPanel>
              <Form onChange={handleChange}>
                {data.seasons.map((season) => {
                  const id = `${season}-id`;
                  return (
                    <label key={season} htmlFor={id}>
                      <input
                        type="checkbox"
                        name=""
                        id={id}
                        value={season}
                        defaultChecked
                      />
                      {capitalize(season)}
                    </label>
                  );
                })}
              </Form>
            </TabPanel>
            <TabPanel>
              <Form onChange={handleChange}>
                {data.years.map((year) => {
                  const id = `${year}-id`;
                  return (
                    <label key={year} htmlFor={id}>
                      <input
                        type="checkbox"
                        name=""
                        id={id}
                        value={year}
                        defaultChecked
                      />
                      {year}
                    </label>
                  );
                })}
              </Form>
            </TabPanel>
          </Tabs>
        )}
        <Link to="create_alert">Create</Link>
      </main>
    </div>
  );
};

export default ManageAlerts;

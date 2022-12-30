import { IconButton } from "@chakra-ui/react";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import capitalize from "lodash/capitalize";
import type { FC } from "react";
import { useState } from "react";
import Emoji from "react-emojis";
import { HiChevronLeft } from "react-icons/hi2/index";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { namedAction, redirectBack } from "remix-utils";

interface ManageAlertsProps {}
export async function loader() {
  return {
    seasons: ["rabbi", "khareef"],
    years: [1991, 1992, 1993],
  };
}

export const action: ActionFunction = async ({ request }) => {
  return namedAction(request, {
    async back() {
      await redirectBack(request, { fallback: "/expert" });
    },
  });
};
const ManageAlerts: FC<ManageAlertsProps> = () => {
  const submit = useSubmit();
  const [showFilterTabs, setShowFilterTabs] = useState(false);
  const data = useLoaderData<typeof loader>();
  async function goBack() {
    await submit(null, { method: "post", action: "?/back" });
  }

  async function handleChange(event) {
    await submit(event.currentTarget, { replace: true });
  }
  return (
    <div className="ManageAlerts">
      <header>
        <IconButton
          aria-label="go-back"
          onClick={goBack}
          icon={
            <HiChevronLeft
              style={{
                width: "2em",
                height: "2em",
                border: "0.05em black solid",
                borderRadius: "0.5em",
              }}
            />
          }
        />

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
              <Form onChange={handleChange} data-netlify="true">
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
              <Form onChange={handleChange} data-netlify="true">
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

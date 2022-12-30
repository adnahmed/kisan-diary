import {
  Form,
  Link,
  useCatch,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import capitalize from "lodash/capitalize";
import type { FC } from "react";
import { useState } from "react";
import Emoji from "react-emojis";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
export const handle = {
  title: (
    <div className="">
      <Emoji emoji="speaker-high-volume" size="30" />
      <span>Manage Alerts</span>
    </div>
  ),
};
interface ManageAlertsProps {}
export async function loader() {
  return {
    seasons: ["rabbi", "khareef"],
    years: [1991, 1992, 1993],
  };
}

export const action: ActionFunction = async ({ request }) => {
  return null;
};

const ManageAlerts: FC<ManageAlertsProps> = () => {
  const submit = useSubmit();
  const [showFilterTabs, setShowFilterTabs] = useState(false);
  const data = useLoaderData<typeof loader>();
  async function handleChange(event) {
    await submit(event.currentTarget, { replace: true });
  }
  return (
    <div className="col-start-1 col-span-12">
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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
export default ManageAlerts;

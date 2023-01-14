import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  useCatch,
  useLocation,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { redirect } from "remix-typedjson";
import type { RouteParams } from "routes-gen";
import { route } from "routes-gen";
import slugify from "slugify";
import styles from "~/styles/routes/farmer.crop.css";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
const menu = [
  "Land Preparation",
  "Sowing",
  "Inputs",
  "Harvesting",
  "Post Harvesting and Storage",
  "Marketing",
  "All Costs",
  "Economic Analysis",
];
const InputsMenu = [
  "Seed",
  "Irrigation",
  "Labor Management",
  "Integrated Pest Management",
  "Integrated Disease Management",
  "Integrated Weed Management",
  "Nutrient Management",
  "Gross Inputs Cost",
];
export const handle = {
  menu__item: "/farmer/crops",
};

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

export async function loader({ request, params }: LoaderArgs) {
  const { cropId } = params as RouteParams["/farmer/crop/:cropId"];
  // TODO: convert to callback style functions
  const url = new URL(request.url);
  const pathname = url.pathname;
  const last = pathname.split("/").at(-1);
  const firstMenu = menu.at(0);
  if (!firstMenu) return {};
  if (!last) return {};
  const redirectUrl =
    route(`/farmer/crop/:cropId`, { cropId: cropId }) + `/${toUrl(menu[0])}`;
  if (!menu.map((menu__item) => toUrl(menu__item)).includes(last))
    return redirect(redirectUrl);
  else return {};
}

export default function CropCard() {
  return (
    <div className="crop__card card__wrapper">
      <div style={{ color: "green" }} className="crop__card card__heading">
        Farm Functions
      </div>
      <div className="crop__card card__menu">
        <FunctionsSidebar />
      </div>
      <div className="crop__card card__content">
        <Outlet />
      </div>
    </div>
  );
}

const toUrl = (menu__item: string) =>
  slugify(menu__item, { lower: true, trim: true }).replace(/-/g, "_");

const useHighlight = () => {
  const location = useLocation();
  return (menu__item: string) =>
    location.pathname.split("/").at(-1) === toUrl(menu__item);
};
function FunctionsSidebar() {
  const location = useLocation();
  const { cropId } = useParams<RouteParams["/farmer/crop/:cropId"]>();
  const InputRoute =
    route("/farmer/crop/:cropId", { cropId: cropId || "" }) + "/inputs";
  const highlight = useHighlight();
  useEffect(() => console.log(`input_route: ${InputRoute}`));
  return (
    <div className="card__sidebar">
      {menu.map((menu__item: string) =>
        menu__item === "Inputs" ? (
          <>
            <Link
              to={toUrl(menu__item)}
              key={"input"}
              className={`crop__card card__sidebar sidebar__key ${
                highlight(menu__item) ? "key--selected" : ""
              }`}
            >
              Inputs
            </Link>
            {location.pathname.startsWith(InputRoute) && (
              <div className="crop__card card__sidebar sidebar__key--2">
                {InputsMenu.map((menu__item: string) => (
                  <MenuLink
                    key={menu__item}
                    menu__item={menu__item}
                    sub="inputs/"
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <MenuLink key={menu__item} menu__item={menu__item} />
        )
      )}
    </div>
  );
}
interface Props {
  menu__item: string;
  sub?: string;
}
function MenuLink({ menu__item, sub }: Props) {
  const highlight = useHighlight();
  return (
    <Link
      className={`crop__card card__sidebar sidebar__key ${
        highlight(menu__item) ? "key--selected" : ""
      }`}
      key={menu__item}
      to={(sub ?? "") + toUrl(menu__item)}
    >
      {menu__item}
    </Link>
  );
}

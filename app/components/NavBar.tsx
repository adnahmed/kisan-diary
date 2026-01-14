import { Link, useLocation } from "@remix-run/react";
import slugify from "slugify";
import useLastMatch from "../helpers/useLastMatch";
import { cx } from "~/helpers/form";

interface NavBarProps {
  dashboardPath: string;
  menu: string[];
}

export default function NavBar({ dashboardPath, menu }: NavBarProps) {
  const lastMatch = useLastMatch();
  const location = useLocation();

  const url = (menu_item: string) =>
    dashboardPath + slugify(menu_item.replace("/", "-"), { lower: true });

  return (
    <nav className="flex items-center space-x-2 overflow-x-auto p-4 bg-primary-900/95 backdrop-blur-md rounded-xl shadow-lg border border-primary-700/50 my-4 mx-2">
      {menu.map((menu_item) => {
        const href = url(menu_item);
        const isActive =
          new RegExp(`${href}.*`).test(location.pathname) ||
          lastMatch.handle?.menu__item === href;

        return (
          <Link
            key={menu_item}
            to={href}
            className={cx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
              isActive
                ? "bg-white text-primary-900 shadow-md transform scale-105"
                : "text-primary-100 hover:bg-primary-800 hover:text-white"
            )}
          >
            {menu_item}
          </Link>
        );
      })}
    </nav>
  );
}

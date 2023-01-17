import { Box, Link } from "@chakra-ui/react";
import { useLocation } from "@remix-run/react";
import slugify from "slugify";
import useLastMatch from "../helpers/useLastMatch";
import CABIButton from "./cabi-button";
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
    <Box bg="cabi" className={`navbar`}>
      {menu.map((menu_item) => (
        <Link variant="cabi" key={menu_item} className="" href={url(menu_item)}>
          <CABIButton
            invertVariant={
              new RegExp(`${url(menu_item)}.*`).test(location.pathname) ||
              lastMatch.handle?.menu__item === url(menu_item)
            }
          >
            {menu_item}
          </CABIButton>
        </Link>
      ))}
    </Box>
  );
}

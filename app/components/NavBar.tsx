import { Box, Link } from "@chakra-ui/react";
import slugify from "slugify";
import useLastMatch from "~/helpers/useLastMatch";
import CABIButton from "./cabi-button";
interface NavBarProps {
  dashboardPath: string;
  menu: string[];
}
export default function NavBar({ dashboardPath, menu }: NavBarProps) {
  const lastMatch = useLastMatch();
  return (
    <Box bg="cabi" className={`navbar`}>
      {menu.map((menu_item) => (
        <Link
          variant="cabi"
          key={menu_item}
          className=""
          href={
            dashboardPath +
            slugify(menu_item, { lower: true, trim: true, replacement: "_" })
          }
        >
          <CABIButton
            invert={
              lastMatch === menu_item.toLocaleLowerCase().replace(" ", "_")
            }
          >
            {menu_item}
          </CABIButton>
        </Link>
      ))}
    </Box>
  );
}

import { Box, Link } from "@chakra-ui/react";
import { useMatches } from "@remix-run/react";
import slugify from "slugify";
function useLastMatch() {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  return lastMatch.pathname.split("/")[-1];
}
export default function FarmerNavBar() {
  const dashboardPath = "/farmer/";
  const lastMatch = useLastMatch();
  function getBackgroundColor(menu_item: string) {
    const isActiveLink = lastMatch === slugify(menu_item);
    return isActiveLink ? `wheat` : `cabi`;
  }
  const menu = [
    "Home",
    "Farm Information",
    "Crops",
    "Manuals",
    "Photo Gallery",
    "Relevant Links",
    "Messages",
  ];

  return (
    <Box
      bg="cabi"
      className={`flex align-middle bg-[#368729] text-white p-2 rounded-md navbar wrap justify-between`}
    >
      {menu.map((menu_item) => (
        <Link
          variant="cabi"
          key={menu_item}
          backgroundColor={getBackgroundColor(menu_item)}
          className="prose navbar__menu text-center self-center whitespace-pre-line text-xs"
          href={
            dashboardPath +
            slugify(menu_item, { lower: true, trim: true, replacement: "_" })
          }
        >
          <div className="">{menu_item}</div>
        </Link>
      ))}
    </Box>
  );
}

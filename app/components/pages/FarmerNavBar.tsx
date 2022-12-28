import { Box, Button, Link } from "@chakra-ui/react";
import { useMatches } from "@remix-run/react";
import slugify from "slugify";
export default function FarmerNavBar() {
  const matches = useMatches();
  const dashboardPath = "/app/farmer/";
  const lastMatch = matches.slice(-1)[0];
  const menu = [
    "Home",
    "Farm Information",
    "Crops",
    "Manuals",
    "Photo Gallery",
    "Relevant Links",
  ];

  return (
    <Box
      bg="cabi"
      className="flex items-center h-max align-middle bg-[#368729] justify-between text-white p-2 rounded-md"
    >
      {menu.map((menu) => (
        <Button
          variant="cabi"
          key={menu}
          isActive={lastMatch.pathname.split("/")[-1] === slugify(menu)}
        >
          <Link href={dashboardPath + slugify(menu)}>{menu}</Link>
        </Button>
      ))}
      <Button variant="cabi" size="md">
        Messages
      </Button>
    </Box>
  );
}

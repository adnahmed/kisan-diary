import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet, useMatches } from "@remix-run/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/server-runtime";
import type { FC } from "react";
import { useRef } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/admin.css";
export const links: LinksFunction = () => [{ href: styles, rel: "stylesheet" }];

interface ExpertDashboardProps {}

export async function loader({ request }: LoaderArgs) {
  return {
    user: await getUser(request),
  };
}
//  - Administrator adds recommended crops based on Land Description and Season.
const ExpertDashboard: FC<ExpertDashboardProps> = () => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const title = lastMatch && lastMatch.handle && lastMatch.handle.title;
  const btnRef = useRef(null);
  return (
    <div className="dashboard">
      <div className="heading flex items-center p-4">
        <IconButton
          aria-label="Open Drawer"
          bg="cabi"
          color="wheat"
          border="1px"
          borderColor="cabi"
          ref={btnRef}
          icon={
            <Center w="100%" h="100%">
              <HamburgerIcon />
            </Center>
          }
          onClick={onOpenDrawer}
        />
        {title || (
          <Heading className="flex justify-around grow" size="lg">
            Expert Dashboard
          </Heading>
        )}
      </div>
      <Drawer
        isOpen={isOpenDrawer}
        placement="left"
        onClose={onCloseDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              boxSize="150px"
              borderRadius="full"
              fallbackSrc="/assets/blank-profile-picture.webp"
              alt="user_name"
              bg="gray.100"
              fit="scale-down"
            />
          </DrawerHeader>
          <DrawerBody>
            <Stack>
              <Link to="crops">
                <Button>Crops</Button>
              </Link>
              <Divider />
              <Link to="alerts">
                <div className="button manage_alerts">
                  <Button
                    leftIcon={<HiSpeakerWave />}
                    bg="cabi"
                    color="white"
                    border="1px"
                    borderColor="cabi"
                    _hover={{ bg: "wheat", color: "cabi" }}
                  >
                    Manage Alerts
                  </Button>
                </div>
              </Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Outlet />
    </div>
  );
};

export default ExpertDashboard;

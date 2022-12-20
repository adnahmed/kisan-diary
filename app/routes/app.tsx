import styles from "~/styles/routes/index.css";
import type { LinksFunction } from "@remix-run/react/dist/routeModules";
import { getUser } from "~/session.server";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Image as ChakraImage,
  Box,
  Button,
} from "@chakra-ui/react";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Image } from "remix-image";
import { useEffect } from "react";
import { useMatches } from "@remix-run/react";

export const links: LinksFunction = () => [
  {
    href: styles,
    rel: "stylesheet",
  },
  {
    rel: "preload",
    href: "/public/favicon.ico",
  },
];

export async function loader({ request }) {
  return {
    user: await getUser(request),
  };
}

function FarmerNavBar() {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const menu_links = [
    "Farm Information",
    "Crops",
    "Manuals",
    "Photo Gallery",
    "Relevant Links",
  ];
  return (
    <Box
      bg="cabi"
      className="flex items-center h-max align-middle justify-between color-white nav"
    >
      {menu_links.map((menu) => (
        <Button
          variant="cabi"
          key={menu}
          isActive={lastMatch.pathname.split("/")[-1] === menu}
        >
          {menu}
        </Button>
      ))}
    </Box>
  );
}
function Header(props) {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const showFarmerNavbar = /farmer.*/.test(lastMatch.pathname);
  const showAdminNavbar = /admin.*/.test(lastMatch.pathname);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="header">
        <img key="logo" alt="logo" src="/assets/diary.png" className="logo" />
        <a key="title" href="/" className="title">
          Kesan Diary
        </a>
        <AuthMenu
          key="authMenu"
          isLoggedIn={props.isLoggedIn}
          onOpenLogIn={props.onOpenLogIn}
        />
      </div>
      {showFarmerNavbar && <FarmerNavBar />}
    </div>
  );
}
interface AuthMenuProps {
  onOpenLogIn: () => void;
  isLoggedIn: boolean;
}
function AuthMenu({ isLoggedIn, onOpenLogIn }: AuthMenuProps) {
  return (
    <div className="menu">
      {!isLoggedIn ? (
        <div>
          <Link to="/join">
            <div className="join">Sign Up</div>
          </Link>
          <Link to="login">
            <div onClick={onOpenLogIn} className="login">
              Log In
            </div>
          </Link>
        </div>
      ) : (
        <Form method="post" action="/logout">
          <button type="submit">Logout</button>
        </Form>
      )}
    </div>
  );
}

export default function LandingPage() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const {
    isOpen: isOpenLogIn,
    onOpen: onOpenLogIn,
    onClose: onCloseLogIn,
  } = useDisclosure();
  useEffect(() => {
    if (lastMatch.pathname === "/app/login") onOpenLogIn();
  }, [lastMatch, onOpenLogIn]);
  return (
    <div>
      <Header isLoggedIn={data.user !== undefined} onOpenLogIn={onOpenLogIn} />
      <div className="content-wrapper">
        {data.user === undefined ? (
          <div>
            <Modal
              blockScrollOnMount={false}
              isOpen={isOpenLogIn}
              onClose={onCloseLogIn}
            >
              <ModalOverlay bg={"none"} />
              <ModalContent>
                <ModalHeader>Log In</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Outlet />
                </ModalBody>
              </ModalContent>
            </Modal>
            <div className="promo-bg content">
              <div className="content-row">
                <div className="content-card content-card-1">
                  <Image
                    options={{
                      fit: "contain",
                    }}
                    src="/assets/index-content-row-1.jpeg"
                    alt=""
                  />
                </div>
                <div className="content-card content-card-2"></div>
              </div>
              <div className="content-row">
                <div className="content-card content-card-4"></div>
                <div className="content-card content-card-5"></div>
              </div>
              <div className="content-row">
                <div className="content-card content-card-4"></div>
                <div className="content-card content-card-5"></div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <footer>
        <div className="ProjectDescription">
          <span>
            Developed by <strong>Adnan Ahmed Khan</strong>
          </span>
          <span>
            Arid # <strong>2018-ARID-0957</strong>
          </span>
          <span>
            Under Supervision of <strong>Mrs. Tayyaba</strong>
          </span>
          <span>
            Submitted to{" "}
            <strong>
              Barani Institute of Information Technology (BIIT) affliated with
              PMAS Arid Agriculture University, Rawalpindi Pakistan
            </strong>
          </span>
        </div>
        <div className="Copyright"> &copy; Copyright Reserved 2022</div>
      </footer>
    </div>
  );
}

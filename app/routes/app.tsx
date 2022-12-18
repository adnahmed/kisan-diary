import { getUser } from "~/session.server";
import styles from "~/styles/routes/index.css";
import type { LinksFunction } from "@remix-run/react/dist/routeModules";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet } from "@remix-run/react";
import { Image } from "remix-image";

export async function loader({ request }) {
  const user = await getUser(request);
  if (user) return redirect(`/${user.role}`);
  else return null;
}

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

export default function LandingPage() {
  const {
    isOpen: isOpenLogIn,
    onOpen: onOpenLogIn,
    onClose: onCloseLogIn,
  } = useDisclosure();
  return (
    <div>
      <div className="header">
        <Image
          src="diary.png"
          className="logo"
          responsive={[
            {
              size: { width: 100, height: 100 },
              maxWidth: 500,
            },
            {
              size: { width: 150, height: 150 },
            },
          ]}
          dprVariants={[1, 3]}
          loaderUrl="./image"
        />
        <a href="/" className="title">
          Kesan Diary
        </a>
        <div className="menu">
          <Link to="/join">
            <div className="join">Sign Up</div>
          </Link>
          <Link to="login">
            <div onClick={onOpenLogIn} className="login">
              Log In
            </div>
          </Link>
        </div>
      </div>
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
      <div className="content-wrapper">
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

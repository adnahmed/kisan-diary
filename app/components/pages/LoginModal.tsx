import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useMatches } from "@remix-run/react";
import { useEffect } from "react";
import { useOptionalUser } from "~/utils";

export default function LoginModal() {
  const user = useOptionalUser();
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const {
    isOpen: isOpenLogIn,
    onOpen: onOpenLogIn,
    onClose: onCloseLogIn,
  } = useDisclosure();
  useEffect(() => {
    if (lastMatch.pathname === "/app/login" && !user) onOpenLogIn();
  }, [lastMatch, onOpenLogIn, user]);
  return (
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
  );
}

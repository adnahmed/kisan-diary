import type { BackgroundProps } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useMatches } from "@remix-run/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useOptionalUser } from "~/utils";

interface ModalProps {
  autoOpenUrl?: String;
  Header?: ReactNode;
  Body?: ReactNode;
  blockScroll?: boolean;
  bg?: BackgroundProps["bg"];
}

export default function WithModal({
  autoOpenUrl,
  Header,
  Body,
  blockScroll = false,
  bg = "none",
}: ModalProps) {
  const user = useOptionalUser();
  const matches = useMatches();
  const {
    isOpen: isOpenLogIn,
    onOpen: onOpenLogIn,
    onClose: onCloseLogIn,
  } = useDisclosure();
  useEffect(() => {
    if (autoOpenUrl) {
      const lastMatch = matches.slice(-1)[0];
      if (lastMatch.pathname === autoOpenUrl) onOpenLogIn();
    }
  }, [autoOpenUrl, matches, onOpenLogIn, user]);

  return (
    <Modal
      blockScrollOnMount={blockScroll}
      isOpen={isOpenLogIn}
      onClose={onCloseLogIn}
    >
      <ModalOverlay bg={bg} />
      <ModalContent>
        <ModalHeader>{Header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{Body}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

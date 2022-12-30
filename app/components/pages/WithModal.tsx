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
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (autoOpenUrl) {
      if (lastMatch.pathname === autoOpenUrl) onOpen();
    }
  }, [autoOpenUrl, lastMatch.pathname, matches, onOpen]);

  return (
    <Modal blockScrollOnMount={blockScroll} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg={bg} />
      <ModalContent>
        <ModalHeader>{Header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{Body}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

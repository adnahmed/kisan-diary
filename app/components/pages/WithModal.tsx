import type { BackgroundProps, ModalProps } from "@chakra-ui/react";
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

interface CommonModalProps {
  onOpenWhen?: boolean;
  autoOpenUrl?: String;
  Header?: ReactNode;
  Body?: ReactNode;
  blockScroll?: boolean;
  bg?: BackgroundProps["bg"];
}

export default function WithModal({
  onOpenWhen,
  autoOpenUrl,
  Header,
  Body,
  blockScroll = false,
  bg = "none",
  ...props
}: Omit<ModalProps, "onOpen" | "onClose" | "isOpen" | "children"> &
  CommonModalProps) {
  const matches = useMatches();
  const lastMatch = matches.slice(-1)[0];
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (autoOpenUrl && lastMatch.pathname === autoOpenUrl) onOpen();
    if (onOpenWhen) onOpen();
  }, [autoOpenUrl, lastMatch.pathname, matches, onClose, onOpen, onOpenWhen]);

  return (
    <Modal
      closeOnEsc={true}
      blockScrollOnMount={blockScroll}
      isOpen={isOpen}
      onClose={onClose}
      {...props}
    >
      <ModalOverlay bg={bg} />
      <ModalContent>
        <ModalHeader borderColor={"white"}>{Header}</ModalHeader>
        <ModalCloseButton color={"white"} />
        <ModalBody>{Body}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

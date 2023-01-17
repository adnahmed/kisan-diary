import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import CABIButton from "~/components/cabi-button";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const crop = url.searchParams.get("crop");
  return { crop };
}

export function YearSelectionCard() {
  const data = useLoaderData<typeof loader>();
  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>Please select an year.</Heading>
        <CardBody>
          <Link
            to={`/farmer/crop?name=${
              data.crop
            }?year=${new Date().getFullYear()}`}
          >
            <CABIButton size={"md"}>Current Year</CABIButton>
          </Link>
        </CardBody>
      </CardHeader>
    </Card>
  );
}

export default function YearSelectionModel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg={"none"} />
      <ModalContent>
        <ModalHeader>Year Selection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <YearSelectionCard />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

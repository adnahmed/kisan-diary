import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
export default function CABIButton({ children, ...props }) {
  return (
    <Button
      bg="cabi"
      color="white"
      border="1px"
      borderColor="cabi"
      _hover={{ bg: "wheat", color: "cabi" }}
      {...props}
    >
      {children}
    </Button>
  );
}

import { Button } from "@chakra-ui/react";
import type { ReactNode } from "react";
type CABIButtonProps = {
  invertVariant?: boolean;
  children: ReactNode;
} & JSX.IntrinsicElements["button"];

export default function CABIButton({
  invertVariant = false,
  children,
  ...props
}: CABIButtonProps) {
  return (
    <Button
      bg={invertVariant ? "wheat" : "cabi"}
      color={invertVariant ? "cabi" : "white"}
      border="1px"
      borderColor={invertVariant ? "wheat" : "cabi"}
      _hover={{
        bg: invertVariant ? "cabi" : "wheat",
        color: invertVariant ? "wheat" : "cabi",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

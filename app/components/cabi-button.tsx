import { Button } from "@chakra-ui/react";
export default function CABIButton({ children, ...props }) {
  return (
    <Button
      bg={props.invert ? "wheat" : "cabi"}
      color={props.invert ? "cabi" : "white"}
      border="1px"
      borderColor={props.invert ? "wheat" : "cabi"}
      _hover={{
        bg: props.invert ? "cabi" : "wheat",
        color: props.invert ? "wheat" : "cabi",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

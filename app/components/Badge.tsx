import { Circle, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FaBell } from "react-icons/fa";

export default function Badge({ count }: { count: number }) {
  return (
    <IconButton
      css={css`
        position: relative !important;
      `}
      py={"2"}
      colorScheme={"cabi"}
      aria-label={"Notifications"}
      size={"sm"}
      icon={
        <>
          <FaBell color={"wheat.750"} />
          <Circle
            as={"span"}
            color={"cabi"}
            position={"absolute"}
            top={"6px"}
            right={"4px"}
            fontSize={"0.8rem"}
            bgColor={"wheat"}
            borderRadius={"full"}
            zIndex={9999}
          >
            {count}
          </Circle>
        </>
      }
    />
  );
}

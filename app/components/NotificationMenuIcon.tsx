import { Avatar, AvatarBadge, Center, IconButton } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { FaBell } from "react-icons/fa";
import { useOptionalUser } from "~/utils";
interface NotificationMenuIconProps {
  unread_alerts: ReactNode;
}
function NotificationMenuIcon({
  onClick,
  unread_alerts,
  ...props
}: JSX.IntrinsicElements["button"] & NotificationMenuIconProps) {
  const user = useOptionalUser();
  return (
    <>
      {user && (
        <IconButton
          p="0"
          background={"cabi"}
          aria-label="view notifications"
          bg="cabi"
          variant={"unstyled"}
          onClick={onClick}
          {...props}
          icon={
            <>
              <Avatar
                bg={"cabi"}
                p="0"
                size="2xl"
                width={"1rem"}
                height={"1rem"}
                icon={<FaBell />}
              >
                <Center>
                  <AvatarBadge
                    boxSize=".6rem"
                    color={"cabi"}
                    bg="wheat"
                    borderColor={"cabi"}
                    fontSize={".6rem"}
                    textAlign={"center"}
                  >
                    {unread_alerts}
                  </AvatarBadge>
                </Center>
              </Avatar>
            </>
          }
        />
      )}
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
export default NotificationMenuIcon;

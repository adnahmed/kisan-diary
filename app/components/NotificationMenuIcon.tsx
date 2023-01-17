import { Avatar, AvatarBadge, Center, IconButton } from "@chakra-ui/react";
import type { AlertType } from "@prisma/client";
import NotificationIcon from "~/helpers/NotificationIcon";
import { useOptionalUser } from "~/utils";
interface NotificationMenuIconProps {
  numberOfAlerts?: number;
  type: AlertType;
}

function NotificationMenuIcon({
  numberOfAlerts,
  type,
}: NotificationMenuIconProps) {
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
          className="header__notification notification__icon"
          icon={
            <>
              <Avatar
                bg={"cabi"}
                p="0"
                size="2xl"
                width={"1rem"}
                height={"1rem"}
                icon={NotificationIcon(type)}
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
                    {numberOfAlerts}
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

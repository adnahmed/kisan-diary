import { Link } from "@chakra-ui/react";
import type { Alert, AlertType } from "@prisma/client";
import Emoji from "react-emojis";
type AlertOutput = { createdAt: string; updatedAt: string } & Omit<
  Alert,
  "createdAt" | "updatedAt"
>;
interface NotificationTooltipProps {
  unread_alerts?: AlertOutput[];
}
export default function NotificationTooltip({
  unread_alerts,
}: NotificationTooltipProps) {
  function NotificationIcon(type: AlertType) {
    switch (type) {
      case "alert":
        return <Emoji emoji="warning" size="30" />;
      case "recommendation":
        return <Emoji emoji="sparkle" size="30" />;
    }
  }
  return (
    <div className="header__notification notification__tooltip">
      {unread_alerts?.map((alert: AlertOutput) => (
        <Link
          key={alert.id}
          href={`/farmer/alert?id=${alert.id}`}
          className="notification__content"
        >
          <span className="notification__content__icon">
            {NotificationIcon(alert.alertType)}
          </span>
          <span className="notification__content_headline">
            {alert.details}
          </span>
        </Link>
      ))}
    </div>
  );
}

import { Link } from "@chakra-ui/react";
import type { AlertType } from "@prisma/client";
import { formatDistance } from "date-fns";
import Emoji from "react-emojis";
import AlertOutput from "~/types/AlertOutput";

interface NotificationTooltipProps {
  alerts?: AlertOutput[];
}
export default function NotificationTooltip({
  alerts,
}: NotificationTooltipProps) {
  return (
    <div className="header__notification notification__tooltip">
      {alerts ? <AlertList alerts={alerts} /> : <p>No Alerts Yet!</p>}
    </div>
  );
}

function AlertList({ alerts }: { alerts: AlertOutput[] }) {
  return (
    <>
      {alerts.map((alert) => (
        <Link
          key={alert.id}
          href={`/farmer/alert?id=${alert.id}`}
          className="notification__content"
        >
          <span className="notification__content content__date">
            <span className="notification__content content__date date__icon">
              <Emoji emoji="three-oclock" size="20" />
            </span>
            {formatDistance(new Date(alert.createdAt), new Date())} ago
          </span>

          <span className="notification__content content__icon">{}</span>
          <span className="notification__content content_headline">
            {alert.details}
          </span>
        </Link>
      ))}
    </>
  );
}

import { Link } from "@chakra-ui/react";
import type { Alert } from "@prisma/client";
import { AlertType } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useMemo } from "react";
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
  const alerts = useMemo<AlertOutput[] | undefined>(
    () => unread_alerts?.filter((ura) => ura.alertType === AlertType.alert),
    [unread_alerts]
  );
  const recommendations = useMemo<AlertOutput[] | undefined>(
    () =>
      unread_alerts?.filter(
        (ura) => ura.alertType === AlertType.recommendation
      ),
    [unread_alerts]
  );
  return (
    <div className="header__notification notification__tooltip">
      {alerts ? <AlertList alerts={alerts} /> : <p>No Alerts Yet!</p>}
    </div>
  );
}

function AlertList({ alerts }: { alerts: AlertOutput[] }) {
  function NotificationIcon(type: AlertType) {
    switch (type) {
      case "alert":
        return <Emoji emoji="warning" size="30" />;
      case "recommendation":
        return <Emoji emoji="sparkle" size="30" />;
    }
  }

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

          <span className="notification__content content__icon">
            {NotificationIcon(alert.alertType)}
          </span>
          <span className="notification__content content_headline">
            {alert.details}
          </span>
        </Link>
      ))}
    </>
  );
}

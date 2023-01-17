import type { AlertType } from "@prisma/client";
import type AlertOutput from "~/types/AlertOutput";
import NotificationMenuIcon from "../NotificationMenuIcon";
import NotificationTooltip from "./NotificationTooltip";

interface NotificationButtonProps {
  onClick: () => void;
  showNotifications: boolean;
  alerts: AlertOutput[];
  label: string;
  type: AlertType;
}

export default function NotificationButton({
  onClick,
  showNotifications,
  alerts,
  label,
  type,
}: NotificationButtonProps) {
  return (
    <div className="header__notification notification__alerts">
      <div
        onClick={onClick}
        className="header__notification notification__button"
      >
        <NotificationMenuIcon type={type} numberOfAlerts={alerts?.length} />
        <span className="header__notification notification__button button__label">
          {label}
        </span>
      </div>
      {showNotifications && <NotificationTooltip alerts={alerts} />}
    </div>
  );
}

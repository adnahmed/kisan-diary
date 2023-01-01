import type { AlertType } from "@prisma/client";
export default function NotificationTooltip(props) {
  function NotificationIcon(type: AlertType) {
    switch (type) {
      case "alert":
        return <> s</>;
      case "recommendation":
        return <></>;
    }
  }
  return props.alerts.unread_alerts.map((alert) => (
    <div key={alert}>
      <div className="notification__content">
        <div className="notification__content__icon">ss</div>
        <div className="notification__content__details">{alert.details}</div>
      </div>
    </div>
  ));
}

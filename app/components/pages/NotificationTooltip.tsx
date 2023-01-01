export default function NotificationTooltip(props) {
  return props.alerts.unread_alerts.map((alert) => (
    <div key={alert}>{alert.details}</div>
  ));
}

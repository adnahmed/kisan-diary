import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useDataRefresh } from "remix-utils";
import type { loader } from "~/routes/api/unread_alerts";
import NotificationMenuIcon from "../NotificationMenuIcon";
import NotificationTooltip from "./NotificationTooltip";
export default function NotificationGroup() {
  const unread_alerts = useFetcher<typeof loader>();
  const { refresh } = useDataRefresh();
  useEffect(() => {
    if (unread_alerts.type === "init") unread_alerts.load("/api/unread_alerts");
  }, [unread_alerts, unread_alerts.data, unread_alerts.type]);

  const [showNotifications, setShowNotifications] = useState(
    process.env.NODE_ENV === "development" ? true : false
  );

  return (
    <div className="header__notification">
      <NotificationMenuIcon
        className="header__notification notification__icon"
        onClick={() => setShowNotifications(!showNotifications)}
        unread_alerts={unread_alerts.data?.unread_alerts.length}
      />
      {showNotifications && (
        <NotificationTooltip
          unread_alerts={unread_alerts.data?.unread_alerts}
        />
      )}
    </div>
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

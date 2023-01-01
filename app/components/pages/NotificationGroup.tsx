import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { loader } from "~/routes/api/unread_alerts";
import NotificationMenuIcon from "../NotificationMenuIcon";
import NotificationTooltip from "./NotificationTooltip";
import WithModal from "./WithModal";
export default function NotificationGroup() {
  const unread_alerts = useFetcher<typeof loader>();
  useEffect(() => {
    if (unread_alerts.type === "init") unread_alerts.load("/api/unread_alerts");
  }, [unread_alerts, unread_alerts.data, unread_alerts.type]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex flex-col">
      <NotificationMenuIcon
        onClick={() => setShowNotifications(!showNotifications)}
        unread_alerts={unread_alerts.data?.unread_alerts.length}
      />
      <WithModal
        onOpenWhen={showNotifications}
        Body={
          <div>
            {showNotifications && (
              <NotificationTooltip alerts={unread_alerts.data} />
            )}
          </div>
        }
      />
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

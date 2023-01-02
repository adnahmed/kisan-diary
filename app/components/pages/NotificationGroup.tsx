import { AlertType } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { useDataRefresh } from "remix-utils";
import type { loader } from "~/routes/api/unread_alerts";
import type AlertOutput from "~/types/AlertOutput";
import NotificationButton from "./NotificationButton";
export default function NotificationGroup() {
  const unread_alerts = useFetcher<typeof loader>();
  const { refresh } = useDataRefresh();
  useEffect(() => {
    if (unread_alerts.type === "init") unread_alerts.load("/api/unread_alerts");
  }, [unread_alerts, unread_alerts.data, unread_alerts.type]);

  const [showAlerts, setShowAlerts] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const alerts = useMemo<AlertOutput[] | undefined>(
    () =>
      unread_alerts?.data?.unread_alerts.filter(
        (ura) => ura.alertType === AlertType.alert
      ),
    [unread_alerts]
  );
  const recommendations = useMemo<AlertOutput[] | undefined>(
    () =>
      unread_alerts?.data?.unread_alerts.filter(
        (ura) => ura.alertType === AlertType.recommendation
      ),
    [unread_alerts]
  );
  return (
    <div className="header__notification">
      <NotificationButton
        type={AlertType.alert}
        label={"Alerts"}
        alerts={alerts}
        showNotifications={showAlerts}
        onClick={() => {
          setShowAlerts(!showAlerts);
          setShowRecommendations(false);
        }}
      />
      <NotificationButton
        type={AlertType.recommendation}
        label={"Recommendations"}
        alerts={recommendations}
        showNotifications={showRecommendations}
        onClick={() => {
          setShowRecommendations(!showRecommendations);
          setShowAlerts(false);
        }}
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

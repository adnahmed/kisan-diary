import type { Crop } from "@prisma/client";
import { AlertType } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { useDataRefresh } from "remix-utils";
import fetchFarm from "~/models/farm.server";
import { getUser } from "~/session.server";
import type AlertOutput from "~/types/AlertOutput";
import NotificationButton from "./NotificationButton";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Response("Crops Not Found");
  const farm = await fetchFarm(user);
  if (!farm) throw new Response("Crops Not Found");
  return;
}

export default function NotificationGroup() {
  const { refresh } = useDataRefresh();
  const alert_fetcher = useFetcher();
  useEffect(() => {
    alert_fetcher.load("/api/unread_alerts");
  });
  // useEffect(() => {
  //   if (alerts_fetcher.type === "init")
  //     alerts_fetcher.load(route("/api/unread_alerts"));
  // }, [alerts_fetcher, alerts_fetcher.data, alerts_fetcher.type]);

  const [showAlerts, setShowAlerts] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const alerts = useMemo<AlertOutput[] | undefined>(
    () =>
      alert_fetcher?.data?.unread_alerts.filter(
        (ura) => ura.alertType === AlertType.alert
      ),
    [alert_fetcher.data]
  );

  const recommendations = useMemo<AlertOutput[] | undefined>(
    () =>
      alert_fetcher?.data?.unread_alerts.filter(
        (ura) => ura.alertType === AlertType.recommendation
      ),
    [alert_fetcher.data]
  );
  function getSuitableCropAlerts(suitableCrops: Crop[]): AlertOutput[] {
    return suitableCrops.map((suitableCrop) => ({
      id: suitableCrop.id,
      details: `${suitableCrop.name} is suitable for your farm.`,
      alertType: "recommendation" as AlertType,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    }));
  }
  return (
    <div className="flex items-center gap-4 relative">
      <NotificationButton
        type={AlertType.alert}
        label={"Alerts"}
        alerts={alerts || []}
        showNotifications={showAlerts}
        onClick={() => {
          setShowAlerts(!showAlerts);
          setShowRecommendations(false);
        }}
      />
      <NotificationButton
        type={AlertType.recommendation}
        label={"Recommendations"}
        alerts={getSuitableCropAlerts(
          alert_fetcher.data?.suitableCrops || []
        ).concat(recommendations || [])}
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

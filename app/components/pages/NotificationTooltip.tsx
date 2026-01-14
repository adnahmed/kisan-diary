import { Link } from "@remix-run/react";
import { formatDistance } from "date-fns";
import Emoji from "react-emojis";
import type AlertOutput from "~/types/AlertOutput";

interface NotificationTooltipProps {
  alerts?: AlertOutput[];
}

export default function NotificationTooltip({
  alerts,
}: NotificationTooltipProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-surface-200 z-50 overflow-hidden animate-fade-in">
      <div className="max-h-96 overflow-y-auto">
        {alerts && alerts.length > 0 ? (
          <AlertList alerts={alerts} />
        ) : (
          <div className="p-4 text-center text-surface-500 text-sm">No Alerts Yet!</div>
        )}
      </div>
    </div>
  );
}

function AlertList({ alerts }: { alerts: AlertOutput[] }) {
  return (
    <div className="divide-y divide-surface-100">
      {alerts.map((alert) => (
        <Link
          key={alert.id}
          to={`/farmer/alert?id=${alert.id}`}
          className="block p-4 hover:bg-surface-50 transition-colors"
        >
          <div className="flex items-start gap-3">
             <div className="mt-1 text-xl">
               <Emoji emoji="alarm-clock" size="20" />
             </div>
             <div>
                <p className="text-xs text-surface-400 mb-1">
                  {formatDistance(new Date(alert.createdAt), new Date())} ago
                </p>
                <p className="text-sm text-surface-800 line-clamp-2">
                  {alert.details}
                </p>
             </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

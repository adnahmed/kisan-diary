import type { AlertType } from "@prisma/client";
import { FaLightbulb, FaExclamationTriangle } from "react-icons/fa";
import type AlertOutput from "~/types/AlertOutput";
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
  const Icon = type === "recommendation" ? FaLightbulb : FaExclamationTriangle;
  const count = alerts?.length || 0;

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="flex items-center gap-2 p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200"
        title={label}
      >
        <div className="relative">
          <Icon className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {count}
            </span>
          )}
        </div>
        <span className="hidden md:inline text-sm font-medium">{label}</span>
      </button>
      {showNotifications && <NotificationTooltip alerts={alerts} />}
    </div>
  );
}

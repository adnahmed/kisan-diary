import { FaBell } from "react-icons/fa";

export default function Badge({ count }: { count: number }) {
  return (
    <button
      className="relative p-2 rounded-full text-primary-100 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
      aria-label="Notifications"
    >
      <FaBell className="w-5 h-5 text-secondary-200" />
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-900 bg-secondary-400 rounded-full min-w-[1.25rem]">
          {count}
        </span>
      )}
    </button>
  );
}

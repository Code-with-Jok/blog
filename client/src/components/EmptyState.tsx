import { type ReactNode } from "react";
import { LuFileX } from "react-icons/lu";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  imageSrc?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({
  message = "No data available",
  subMessage,
  imageSrc,
  icon,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 ${className}`}
    >
      <div className="mb-4 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Empty state"
            className="w-48 h-48 object-contain opacity-80"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
            {icon || <LuFileX className="text-4xl" />}
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>

      {subMessage && (
        <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
          {subMessage}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
  }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300/50">
      <p className="text-xs font-semibold text-sky-800 mb-1">
        {payload?.[0]?.name}
      </p>
      <p className="text-sm font-medium text-gray-900">
        Count:{" "}
        <span className="font-semibold text-sm text-gray-900">
          {payload?.[0]?.value}
        </span>
      </p>
    </div>
  );
};

export default CustomTooltip;

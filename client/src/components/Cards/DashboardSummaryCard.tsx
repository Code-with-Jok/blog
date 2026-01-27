import { cn } from "@/utils";

interface DashboardSummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  color: string;
}

const DashboardSummaryCard = ({
  icon,
  label,
  value,
  bgColor,
  color,
}: DashboardSummaryCardProps) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          `size-10 md:size-8 flex items-center justify-center rounded-sm ${color} ${bgColor}`
        )}
      >
        {icon}
      </div>

      <p className="text-xs md:text-sm text-gray-500">
        <span className="text-sm md:text-[15px] font-semibold text-black">
          {value}
        </span>
        {label}
      </p>
    </div>
  );
};

export default DashboardSummaryCard;

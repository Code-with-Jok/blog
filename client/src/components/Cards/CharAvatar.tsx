import { cn } from "@/utlis";
import { getInitials } from "@/utlis/helper";

interface CharAvatarProps {
  fullname: string;
  width?: string;
  height?: string;
  className?: string;
}

const CharAvatar = ({
  fullname,
  width = "w-12",
  height = "h-12",
  className,
}: CharAvatarProps) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`,
        width,
        height,
        className
      )}
    >
      {getInitials(fullname ?? "")}
    </div>
  );
};

export default CharAvatar;

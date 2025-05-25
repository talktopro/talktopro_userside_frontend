import { FC } from "react";
import { X } from "lucide-react";
import {
  TooltipProvider,
} from "../ui/tooltip";
import CustomTooltip from "./CustomTooltip";

type BadgeProps = {
  content: string;
  background?: "Gray" | "Light" | "Green" | "Red" | "Yellow";
  showCrossIcon?: boolean;
  onCrossClick?: () => void;
};

export const Badge: FC<BadgeProps> = ({
  content,
  background = "Gray",
  showCrossIcon = false,
  onCrossClick,
}) => {
  const renderClassName = (): string => {
    switch (background) {
      case "Light":
        return "bg-white text-gray-700 border-gray-300";
      case "Green":
        return "bg-green-100 text-green-700 border-green-700";
      case "Red":
        return "bg-red-100 text-red-700 border-red-700";
      case "Yellow":
        return "bg-yellow-100 text-yellow-700 border-yellow-700";
      default:
        return "bg-muted border-1";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-sm min-h-8 max-h-8 border text-sm whitespace-nowrap flex items-center gap-2 w-fit ${renderClassName()}`}
    >
      <span className="-mt-0.5 capitalize">{content}</span>

      {showCrossIcon && (
        <TooltipProvider>
          <div onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onCrossClick?.();
          }}>
            <CustomTooltip content="Remove" trigger={<X size={14} strokeWidth={2} />} />
          </div>
        </TooltipProvider>
      )}
    </span>
  );
};
import { FC } from "react";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

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
          <Tooltip>
            <TooltipTrigger>
              <button
                onClick={onCrossClick}
                className="flex items-center justify-center p-0.5 cursor-pointer"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white border-1 border-gray-200 text-black">
              <p>Remove</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </span>
  );
};

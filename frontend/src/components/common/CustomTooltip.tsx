import { FC, JSX } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ICustomTooltip {
  trigger: JSX.Element;
  content: string;
}
const CustomTooltip: FC<ICustomTooltip> = ({ content, trigger }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="bg-transparent p-2 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer">
            {trigger}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white border-1 border-gray-200 text-black">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;

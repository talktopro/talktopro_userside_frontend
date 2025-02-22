import React, { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SkillButtonProps {
  onClick: () => void;
}
interface InputBoxProps {
  onSave: (value: string) => void;
  onClose: () => void;
}

export const SkillButton: React.FC<SkillButtonProps> = ({ onClick }) => {
  return (
    <div
      className="bg-transparent pl-1 pr-2 py-1.5 border-1 gap-1 min-h-8 max-h-8 flex items-center justify-center rounded-sm hover:border-1 hover:bg-muted transition duration-300 cursor-pointer min-w-30 max-w-30"
      onClick={onClick}
    >
      <Plus strokeWidth={1.5} size={18} />
      <span className="-mt-[0.5px]">Add</span>
    </div>
  );
};

export const InputBox: React.FC<InputBoxProps> = ({ onSave, onClose }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSave = () => {
    onSave(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border rounded-sm px-2 py-1.5 min-w-30 max-w-30 min-h-8 max-h-8 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
        autoFocus
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
      />
      <div className="flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <X
                strokeWidth={1.5}
                size={18}
                className="cursor-pointer"
                onClick={onClose}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white border-1 border-gray-200 text-black">
              <p>Cancel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Check
                strokeWidth={1.5}
                size={18}
                className="cursor-pointer"
                onClick={handleSave}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white border-1 border-gray-200 text-black">
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

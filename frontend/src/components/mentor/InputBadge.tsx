import React, { FC, useEffect, useRef, useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface BadgeButtonProps {
  onClick: () => void;
}
interface InputBoxProps {
  onSave: (value: string) => void;
  onClose: () => void;
}

export const BadgeButton: React.FC<BadgeButtonProps> = ({ onClick }) => {
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

interface InputBoxProps {
  onSave: (content: string) => void;
  onClose: () => void;
  suggestions?: string[]; // Optional suggestions prop as plain strings
}

export const InputBox: FC<InputBoxProps> = ({ onSave, onClose, suggestions = [] }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // For keyboard navigation
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
      setInputValue("");
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsDropdownOpen(true);
      setHighlightedIndex(-1); // Reset highlight
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (highlightedIndex >= 0 && filteredSuggestions.length > 0) {
        setInputValue(filteredSuggestions[highlightedIndex]);
        setIsDropdownOpen(false);
      } else {
        handleSave();
      }
    } else if (e.key === "ArrowDown" && filteredSuggestions.length > 0) {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
    } else if (e.key === "ArrowUp" && filteredSuggestions.length > 0) {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsDropdownOpen(false);
    inputRef.current?.focus(); // Return focus to input
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 relative">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="border rounded-sm px-2 py-1.5 min-w-30 max-w-30 min-h-8 max-h-8 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
        autoFocus
        ref={inputRef}
      />
      {isDropdownOpen && filteredSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-10 left-0 z-10 bg-white border border-gray-200 rounded-sm shadow-md max-h-40 overflow-y-auto w-30"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-2 py-1 cursor-pointer ${
                index === highlightedIndex ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
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

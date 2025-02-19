import { FC } from "react";

type BadgeProps = {
  content: string;
  background?: "Gray" | "Light" | "Green" | "Red" | "Yellow";
};

export const Badge: FC<BadgeProps> = ({ content, background = "Gray" }) => {
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
      className={`px-3 py-1 rounded-sm border text-sm whitespace-nowrap ${renderClassName()}`}
    >
      {content}
    </span>
  );
};

type BadgeProps = {
  content: string;
  background?: "Gray" | "Light" | "Green" | "Red";
};

export const Badge: React.FC<BadgeProps> = ({
  content,
  background = "Gray",
}) => {
  const renderClassName = (): string => {
    switch (background) {
      case "Light":
        return "bg-white text-gray-700 border-gray-300";
      case "Green":
        return "bg-green-50 text-green-700 border-green-300";
      case "Red":
        return "bg-red-50 text-red-700 border-red-300";
      default:
        return "bg-gray-50 text-gray-700 border-gray-300";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-sm border text-sm ${renderClassName()}`}
    >
      {content}
    </span>
  );
};

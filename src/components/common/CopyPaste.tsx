import { FC, useState } from "react";
import CustomTooltip from "./CustomTooltip";
import { CheckIcon, CopyIcon } from "lucide-react";

interface ICopyPasteProps {
  customIcon?: React.JSX.Element;
  copyValue: string;
};

const CopyPaste: FC<ICopyPasteProps> = ({ copyValue, customIcon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-purple-600 hover:text-purple-800 transition-colors"
    >
      <CustomTooltip
        content={copied ? "Copied!" : "Copy"}
        trigger={
          copied ? (
            <CheckIcon className="h-4 w-4 opacity-70" />
          ) : (
            customIcon ? customIcon : <CopyIcon className="h-4 w-4 opacity-70" />
          )
        }
      />
    </button>
  );
};

export default CopyPaste;
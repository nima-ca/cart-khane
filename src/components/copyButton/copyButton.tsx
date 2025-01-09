import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import IconButton from "../ui/iconButton/iconButton";

export interface CopyButtonProps {
  textToCopy?: string | null;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [_, copy] = useCopyToClipboard();

  const handleCopy = () => {
    if (textToCopy) {
      copy(textToCopy);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) {
        console.log("hi");
        setIsCopied(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <IconButton onClick={handleCopy} className="text-black">
      {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
    </IconButton>
  );
};

export default CopyButton;

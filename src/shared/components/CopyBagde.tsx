import { cn } from "@shared/lib/utils";
import { Badge, type BadgeProps } from "@shared/ui/badge";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = BadgeProps & {
  value: string;
  label?: string;
};

export const CopyBadge = ({ value, label, className, ...rest }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Badge
      onClick={handleCopy}
      className={cn("cursor-pointer gap-1", className)}
      {...rest}
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {label ?? "Copy"}
    </Badge>
  );
};

import { Badge, type BadgeProps } from "@shared/ui/badge";
import type { NodeMeta } from "../model";

const COLOR_ROTATION = [
  "blue",
  "green",
  "sky",
  "purple",
  "red",
  "orange",
  "yellow",
  "pink",
] as const satisfies BadgeProps["variant"][];

type BadgeListProps = {
  items: NodeMeta[];
};

export const NodeMetaBadgesList = ({ items }: BadgeListProps) => {
  return (
    <div className="flex items-center flex-wrap gap-1 bg-black/5 dark:bg-white/5 rounded-lg p-1">
      {items.map((item, index) => (
        <Badge
          key={item.id}
          variant={COLOR_ROTATION[index % COLOR_ROTATION.length]}
        >
          {item.title}
        </Badge>
      ))}
    </div>
  );
};

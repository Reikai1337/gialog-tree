import { Badge } from "@shared/ui/badge";
import type { NodeMeta } from "../model";

const COLOR_CLASSES = [
  "rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  "rounded-md bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  "rounded-md bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "rounded-md bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "rounded-md bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  "rounded-md bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  "rounded-md bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
];

type BadgeListProps = {
  items: NodeMeta[];
};

export const NodeMetaBadgesList = ({ items }: BadgeListProps) => {
  return (
    <div className="flex items-center flex-wrap gap-1 bg-black/5 dark:bg-white/5 rounded-lg p-1">
      {items.map((item, index) => (
        <Badge
          key={item.id}
          className={COLOR_CLASSES[index % COLOR_CLASSES.length]}
        >
          {item.title}
        </Badge>
      ))}
    </div>
  );
};

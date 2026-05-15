import { Badge, type BadgeProps } from "@shared/ui/badge";

type Props = Omit<BadgeProps, "variant"> & {
  isPublished: boolean;
};

export const PublishBadge = ({ isPublished, ...rest }: Props) => {
  return (
    <Badge variant={isPublished ? "green" : "blue"} {...rest}>
      {isPublished ? "Published" : "Draft"}
    </Badge>
  );
};

import type { RFAnyEdge, RFAnyNode, AnyAppEdge, AnyAppNode } from "../model";

export const toAppNode = ({
  id,
  position,
  data,
  type,
}: RFAnyNode): AnyAppNode => {
  return {
    id,
    position,
    data,
    type,
  } as AnyAppNode;
};

export const toAppEdge = ({ id, source, target }: RFAnyEdge): AnyAppEdge => {
  return {
    id,
    source,
    target,
  } as AnyAppEdge;
};

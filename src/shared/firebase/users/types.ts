import type { Timestamp } from "firebase/firestore";
import type { ToModel } from "../lib";

export type UserDoc = {
  email: string;
  displayName: string;
  hasAccess: boolean;
  createdAt: Timestamp;
};

export type User = ToModel<
  UserDoc,
  {
    createdAt: string;
  }
>;

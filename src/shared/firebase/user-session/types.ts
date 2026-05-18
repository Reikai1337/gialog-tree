import type { ToModel } from "../lib";

export type UserSessionDoc = {
  sessionId: string;
};
export type UserSession = ToModel<UserSessionDoc>;

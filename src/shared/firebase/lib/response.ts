import type { ErrorResponse, SuccessResponse } from "./utility-types";

const extractErrMsg = (e: unknown) => {
  return e instanceof Error ? e.message : "Unknown error";
};

export const okResponse = <T>(data: T): SuccessResponse<T> => ({
  ok: true,
  data,
});

export const errResponse = (e: unknown): ErrorResponse => ({
  ok: false,
  error: extractErrMsg(e),
});

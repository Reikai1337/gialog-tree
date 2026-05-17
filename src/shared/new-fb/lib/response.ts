import type { ErrorResponse, SuccessResponse } from "../types/utils";
import { extractErrMsg } from "./extractErrMsg";

export const okResponse = <T>(data: T): SuccessResponse<T> => ({
  ok: true,
  data,
});

export const errResponse = (e: unknown): ErrorResponse => ({
  ok: false,
  error: extractErrMsg(e),
});

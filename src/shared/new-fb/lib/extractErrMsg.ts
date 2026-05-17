export const extractErrMsg = (e: unknown) => {
  return e instanceof Error ? e.message : "Unknown error";
};

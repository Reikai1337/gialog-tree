export type SuccessResponse<T> = { ok: true; data: T };
export type ErrorResponse = { ok: false; error: string };

export type Response<T> = Promise<SuccessResponse<T> | ErrorResponse>;

export type WithId<T> = T & { id: string };

export type ToModel<
  TDoc,
  TOverrides extends Partial<Record<keyof TDoc, unknown>> = Record<
    never,
    never
  >,
> = WithId<Omit<TDoc, keyof TOverrides> & TOverrides>;

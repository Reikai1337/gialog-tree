import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import type { WithId } from "../types/utils";

type FieldTransformers<TDoc, TModel> = {
  [K in keyof TDoc]?: (
    value: TDoc[K],
  ) => K extends keyof TModel ? TModel[K] : unknown;
};

export function createConverter<
  TDoc extends DocumentData,
  TModel extends WithId<Record<string, unknown>> = WithId<TDoc>,
>(transformers?: FieldTransformers<TDoc, TModel>) {
  return {
    toFirestore({
      id: _id,
      ...rest
    }: WithFieldValue<TModel>): WithFieldValue<TDoc> {
      return rest as WithFieldValue<TDoc>;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions,
    ): TModel {
      const data = snapshot.data(options) as TDoc;

      const transformed = transformers
        ? Object.fromEntries(
            Object.entries(data).map(([key, value]) => {
              const fn = transformers[key as keyof TDoc];
              return [key, fn ? fn(value) : value];
            }),
          )
        : data;

      return { id: snapshot.id, ...transformed } as TModel;
    },
  } satisfies FirestoreDataConverter<TModel, TDoc>;
}

import {
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  serverTimestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { scenarioCol, scenarioDoc } from "./refs";
import type { Scenario } from "./types";
import { db } from "../clientApp";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const mapScenario = (doc: QueryDocumentSnapshot<DocumentData>): Scenario => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    isPublished: data.isPublished,
    nodes: data.nodes ?? [],
    edges: data.edges ?? [],
  };
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Получить все сценарии */
export async function getScenarios(): Promise<Scenario[]> {
  const snap = await getDocs(scenarioCol(db));
  return snap.docs.map(mapScenario);
}

/** Получить только опубликованные сценарии */
export async function getPublishedScenarios(): Promise<Scenario[]> {
  const q = query(scenarioCol(db), where("isPublished", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map(mapScenario);
}

// /** Получить один сценарий по id */
// export async function getScenario(id: string): Promise<Scenario | null> {
//   const snap = await getDoc(scenarioDoc(id, db));
//   if (!snap.exists()) return null;
//   return mapScenario(snap as QueryDocumentSnapshot<DocumentData>);
// }

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

type CreateScenarioParams = Omit<Scenario, "id">;

/** Создать новый сценарий, id генерируется Firestore */
export async function createScenario(
  params: CreateScenarioParams,
): Promise<string> {
  const ref = await addDoc(scenarioCol(db), {
    ...params,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

type UpdateScenarioParams = Partial<Omit<Scenario, "id">>;

/** Обновить поля существующего сценария */
export async function updateScenario(
  id: string,
  params: UpdateScenarioParams,
): Promise<void> {
  await updateDoc(scenarioDoc(id, db), {
    ...params,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteScenario(id: string): Promise<void> {
  await deleteDoc(scenarioDoc(id, db));
}

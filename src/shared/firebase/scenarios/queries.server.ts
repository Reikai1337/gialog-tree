import {
  getDoc,
  type QueryDocumentSnapshot,
  type DocumentData,
  Firestore,
  getDocs,
} from "firebase/firestore";
import { scenarioDoc, scenarioCol } from "./refs";
import type { Scenario } from "./types";

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

export async function getScenario(
  id: string,
  db: Firestore,
): Promise<Scenario | null> {
  const snap = await getDoc(scenarioDoc(id, db));
  if (!snap.exists()) return null;
  return mapScenario(snap as QueryDocumentSnapshot<DocumentData>);
}

export async function getScenarios(db: Firestore): Promise<Scenario[]> {
  const snap = await getDocs(scenarioCol(db));
  return snap.docs.map(mapScenario);
}

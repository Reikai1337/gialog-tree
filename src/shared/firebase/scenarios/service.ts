import {
  Firestore,
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createConverter,
  COLLECTIONS,
  errResponse,
  okResponse,
  type Response,
} from "../lib";
import { db as clientDB } from "../clientApp";
import type { Scenario, ScenarioDoc } from "./types";

const scenarioConverter = createConverter<ScenarioDoc, Scenario>({
  createdAt: (ts) => ts.toDate().toISOString(),
  updatedAt: (ts) => ts.toDate().toISOString(),
});

const scenarioCol = (db: Firestore) =>
  collection(db, COLLECTIONS.SCENARIOS).withConverter(scenarioConverter);

const scenarioDoc = (userId: string, db: Firestore) =>
  doc(db, COLLECTIONS.SCENARIOS, userId).withConverter(scenarioConverter);

export async function getScenario(
  id: string,
  db: Firestore = clientDB,
): Response<Scenario> {
  try {
    const snap = await getDoc(scenarioDoc(id, db));
    if (!snap.exists()) return { ok: false, error: "Scenario not found" };
    return okResponse(snap.data());
  } catch (e) {
    return errResponse(e);
  }
}

export async function getPublishedScenarios(
  db: Firestore = clientDB,
): Response<Scenario[]> {
  try {
    const q = query(scenarioCol(db), where("isPublished", "==", true));
    const snap = await getDocs(q);
    return okResponse(snap.docs.map((doc) => doc.data()));
  } catch (e) {
    return errResponse(e);
  }
}

type CreateScenarioParams = Omit<ScenarioDoc, "createdAt" | "updatedAt">;

export async function createScenario(
  params: CreateScenarioParams,
  db: Firestore = clientDB,
): Response<string> {
  try {
    const { title, isPublished, edges, nodes } = params;
    const ref = await addDoc(scenarioCol(db), {
      id: "",
      title,
      isPublished,
      edges,
      nodes,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return okResponse(ref.id);
  } catch (e) {
    return errResponse(e);
  }
}

type UpdateScenarioParams = Partial<
  Omit<ScenarioDoc, "createdAt" | "updatedAt">
>;

export async function updateScenario(
  id: string,
  params: UpdateScenarioParams,
  db: Firestore = clientDB,
): Response<void> {
  try {
    await updateDoc(scenarioDoc(id, db), {
      ...params,
      updatedAt: serverTimestamp(),
    });
    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
}

export async function deleteScenario(
  id: string,
  db: Firestore = clientDB,
): Response<void> {
  try {
    await deleteDoc(scenarioDoc(id, db));
    return okResponse(undefined);
  } catch (e) {
    return errResponse(e);
  }
}

export async function getScenarios(
  db: Firestore = clientDB,
): Response<Scenario[]> {
  try {
    const snap = await getDocs(scenarioCol(db));
    return okResponse(snap.docs.map((doc) => doc.data()));
  } catch (e) {
    return errResponse(e);
  }
}

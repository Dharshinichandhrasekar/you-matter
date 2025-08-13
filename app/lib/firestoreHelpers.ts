// lib/firestoreHelpers.ts
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";

export async function addMood(uid: string, payload: { mood: string; notes?: string }) {
  const ref = collection(db, "users", uid, "moods") as CollectionReference<DocumentData>;
  const docRef = await addDoc(ref, {
    mood: payload.mood,
    notes: payload.notes || "",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getRecentMoods(uid: string, count = 10) {
  const ref = collection(db, "users", uid, "moods");
  const q = query(ref, orderBy("createdAt", "desc"), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addJournal(uid: string, payload: { ciphertext: string; iv: string; alg: string }) {
  const ref = collection(db, "users", uid, "journals") as CollectionReference<DocumentData>;
  const docRef = await addDoc(ref, {
    ciphertext: payload.ciphertext,
    iv: payload.iv,
    alg: payload.alg,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

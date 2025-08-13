// lib/journalHelpers.ts
import { db } from "./firebase";
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  CollectionReference,
  DocumentData 
} from "firebase/firestore";

export async function getRecentJournals(uid: string, limitCount = 20) {
  const ref = collection(db, "users", uid, "journals");
  const q = query(ref, orderBy("createdAt", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];
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

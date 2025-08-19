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

// Define an interface for journal objects
interface JournalEntry {
  id: string;
  ciphertext: string;
  iv: string;
  alg: string;
  createdAt: unknown; // Firebase serverTimestamp can be of type any, or a specific Timestamp type if imported
}

export async function getRecentJournals(uid: string, limitCount = 20) {
  const ref = collection(db, "users", uid, "journals");
  const q = query(ref, orderBy("createdAt", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  // Use the defined interface for type safety
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as JournalEntry[];
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

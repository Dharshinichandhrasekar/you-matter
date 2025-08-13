import { doc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { subDays, format } from 'date-fns'; // Removed parseISO, format might still be useful

export interface Mood {
  emoji: string;
  label: string;
  color: string;
  score: number; // Added score to Mood interface
}

export const moods: Mood[] = [
  { emoji: "😊", label: "Happy", color: "#ffcc00", score: 5 },
  { emoji: "😢", label: "Sad", color: "#3399ff", score: 1 },
  { emoji: "😰", label: "Anxious", color: "#ff9966", score: 2 },
  { emoji: "😡", label: "Angry", color: "#ff3333", score: 1 },
  { emoji: "😐", label: "Neutral", color: "#cccccc", score: 3 },
];

export async function saveMoodToFirestore(selectedMoodEmoji: string, note: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const moodObj = moods.find((m) => m.emoji === selectedMoodEmoji);
  if (!moodObj) throw new Error("Invalid mood");

  const moodsRef = collection(doc(db, "users", user.uid), "moods");
  await addDoc(moodsRef, {
    mood: selectedMoodEmoji, // emoji
    label: moodObj.label,
    score: moodObj.score, // Use score from moods array
    notes: note,
    createdAt: serverTimestamp(),
  });
}

// Fetches mood data and aggregates it for a weekly chart
export async function fetchWeeklyMoodData(uid: string) {
  if (!uid) throw new Error("User ID is required");

  const moodsRef = collection(doc(db, "users", uid), "moods");

  // Calculate date range for the last 7 days
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  // Firestore queries are tricky with date ranges and server timestamps.
  // For simplicity, we'll fetch recent moods and filter client-side,
  // or assume 'createdAt' is stored as a Firestore Timestamp.
  // A more robust solution would involve a query with 'where' clauses.

  // Let's try to query for the last 7 days.
  // Note: Firestore Timestamps are compared directly.
  const q = query(
    moodsRef,
    where("createdAt", ">=", sevenDaysAgo),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  const moodEntries = snapshot.docs.map(doc => {
    const data = doc.data();
    // Ensure createdAt is a Date object for easier manipulation
    // Use toDate() if it's a Firestore Timestamp, otherwise use new Date() as fallback
    const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);

    return {
      score: data.score, // Explicitly access score
      mood: data.mood,   // Explicitly access mood
      createdAt: createdAtDate
    };
  });

  // Process data to fit the chart format { day: "Mon", moodScore: 4 }
  const weeklyChartData: { day: string; moodScore: number }[] = [];
  const dayMap: { [key: string]: { totalScore: number; count: number; emojis: string[] } } = {};

  // Initialize days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysOfWeek.forEach(day => {
    dayMap[day] = { totalScore: 0, count: 0, emojis: [] };
  });

  moodEntries.forEach(entry => {
    if (entry.createdAt && entry.score !== undefined) {
      const date = new Date(entry.createdAt);
      const dayOfWeek = daysOfWeek[date.getDay()]; // 0 for Sunday, 1 for Monday, etc.
      dayMap[dayOfWeek].totalScore += entry.score;
      dayMap[dayOfWeek].count += 1;
      dayMap[dayOfWeek].emojis.push(entry.mood);
    }
  });

  // Calculate average mood score for each day
  daysOfWeek.forEach(day => {
    if (dayMap[day].count > 0) {
      const averageScore = Math.round(dayMap[day].totalScore / dayMap[day].count);
      weeklyChartData.push({ day: day, moodScore: averageScore });
    } else {
      // If no data for a day, push a placeholder or skip
      // For a line chart, it's often better to have all days, even if score is null or 0
      // Let's push with a default score of 0 or null if no data
      weeklyChartData.push({ day: day, moodScore: 0 }); // Or null, depending on chart behavior
    }
  });

  // Ensure the data is sorted by day of the week for the chart
  // The current `daysOfWeek` array already defines the order.
  // If `weeklyChartData` was populated in a different order, we'd need to sort it.
  // For example:
  // weeklyChartData.sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day));

  return weeklyChartData;
}

// Original fetchMoodDataFromFirestore - might be useful for other chart types
export async function fetchMoodDataFromFirestore() {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const moodsRef = collection(doc(db, "users", user.uid), "moods");
  const snapshot = await getDocs(moodsRef);
  const moodCounts: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    moodCounts[data.mood] = (moodCounts[data.mood] || 0) + 1;
  });

  return moods.map((m) => ({
    name: m.label,
    value: moodCounts[m.emoji] || 0,
    color: m.color,
  }));
}

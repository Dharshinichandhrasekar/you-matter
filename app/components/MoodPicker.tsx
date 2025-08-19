import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type MoodOption = { id: string; label: string; emoji: string; color?: string };

const DEFAULT_MOODS: MoodOption[] = [
  { id: "happy", label: "Happy", emoji: "😊", color: "text-yellow-600" },
  { id: "sad", label: "Sad", emoji: "😢", color: "text-blue-600" },
  { id: "anxious", label: "Anxious", emoji: "😬", color: "text-orange-600" },
  { id: "angry", label: "Angry", emoji: "😠", color: "text-red-600" },
  { id: "neutral", label: "Neutral", emoji: "😐", color: "text-gray-600" },
];

// Animation variants for the mood buttons
const buttonVariants = {
  initial: { scale: 1 },
  animate: { scale: 1.1 },
  tap: { scale: 0.95 },
};

// Animation variants for the note field
const noteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function MoodPicker({
  value,
  onChange,
  onNoteChange, // Added prop for note changes
  options = DEFAULT_MOODS,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  onNoteChange: (note: string) => void; // Prop for note changes
  options?: MoodOption[];
}) {
  const [note, setNote] = useState('');
  const [showNoteField, setShowNoteField] = useState(false);

  const handleMoodSelect = (moodId: string | null) => {
    onChange(moodId);
    if (moodId) {
      setShowNoteField(true);
    } else {
      setShowNoteField(false);
      setNote(''); // Clear note if no mood is selected
      onNoteChange(''); // Also clear the note in the parent
    }
  };

  const handleNoteInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
    onNoteChange(event.target.value); // Pass note change up to parent
  };

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {options.map((m) => {
        const selected = value === m.id;
        return (
          <motion.button
            key={m.id}
            onClick={() => handleMoodSelect(m.id)}
            variants={buttonVariants}
            initial="initial"
            animate={selected ? "animate" : "initial"}
            whileTap="tap"
            className={`flex flex-col items-center gap-1 p-3 border rounded-lg transition 
              ${selected ? "ring-2 ring-offset-2 ring-indigo-400 bg-indigo-50" : "hover:shadow-sm"}
              `}
            aria-pressed={selected}
          >
            <div className={`text-2xl ${m.color}`}>{m.emoji}</div>
            <div className="text-sm">{m.label}</div>
          </motion.button>
        );
      })}

      <AnimatePresence>
        {showNoteField && (
          <motion.div
            key="noteField"
            variants={noteVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="col-span-full mt-4"
          >
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Add a note (optional)
            </label>
            <input
              type="text"
              id="note"
              value={note}
              onChange={handleNoteInputChange}
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

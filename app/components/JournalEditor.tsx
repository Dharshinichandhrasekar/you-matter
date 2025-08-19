"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { ToastPosition } from "react-hot-toast"; // Using react-hot-toast as per requirement
import { encryptText } from "@/lib/encryption";
import { useAuth } from "@/lib/AuthProvider";
import { addJournal } from "@/lib/journalHelpers";

// Simple debounce function with explicit types
const debounce = <Args extends unknown[]>(
  func: (...args: Args) => void | Promise<void>,
  wait: number
): ((...args: Args) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

// Animation variants for the autosave indicator
const autosaveVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function JournalEditor({ onSave }: { onSave?: () => void }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [isDistractionFreeMode, setIsDistractionFreeMode] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState(""); // "Saving...", "Saved", "Error"
  const autosaveRef = useRef(null);

  // Function to be debounced and memoized
  const saveJournalContent = useCallback(async (currentText: string) => {
    if (!user) {
      setAutosaveStatus("Please login");
      return;
    }
    if (!currentText.trim()) {
      setAutosaveStatus(""); // Clear status if text is empty
      return;
    }

    setAutosaveStatus("Saving...");
    try {
      const enc = await encryptText(currentText);
      await addJournal(user.uid, { ciphertext: enc.ciphertext, iv: enc.iv, alg: enc.alg });
      setAutosaveStatus("Saved ✔");
      onSave?.(); // Call onSave prop after successful autosave
      setTimeout(() => setAutosaveStatus(""), 3000);
    } catch (e: unknown) { // Explicitly type 'e'
      console.error(e);
      setAutosaveStatus("Error");
      toast.error("Could not autosave journal", {
        style: {
          border: '1px solid #F87171', // Error color
          padding: '16px',
          color: '#1F2937', // Dark slate text
          backgroundColor: '#F9FAFB', // Off-white background
        },
        iconTheme: {
          primary: '#F87171',
          secondary: '#F9FAFB',
        },
        position: 'top-right' as ToastPosition, // Explicitly cast position
      });
    }
  }, [user, onSave]); // Removed unnecessary dependencies: encryptText, addJournal, toast

  // Memoize the debounced version of saveJournalContent
  const debouncedAutosave = useMemo(
  () => debounce(saveJournalContent, 2000),
  [saveJournalContent]
);


  useEffect(() => {
    // Trigger autosave when text changes
    if (text) {
      debouncedAutosave(text);
    } else {
      // If text is cleared, clear autosave status and any pending saves
      setAutosaveStatus("");
      // Potentially clear any pending debounced calls if needed
    }
  }, [text, debouncedAutosave]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { // Explicitly type event
    setText(e.target.value);
  };

  const handleReset = () => {
    setText("");
    setAutosaveStatus(""); // Clear status on reset
    // Pass options directly to toast.success
    toast.success("Journal cleared", {
      style: {
        border: '1px solid #4ADE80', // Success color
        padding: '16px',
        color: '#1F2937', // Dark slate text
        backgroundColor: '#F9FAFB', // Off-white background
      },
      iconTheme: {
        primary: '#4ADE80',
        secondary: '#F9FAFB',
      },
      position: 'top-right' as ToastPosition, // Explicitly cast position
    });
  };

  const toggleDistractionFreeMode = () => {
    setIsDistractionFreeMode(!isDistractionFreeMode);
  };

  // Manual save function (if needed, though autosave is primary)
  const handleManualSave = async () => {
    if (!user) {
      // Pass options directly to toast.error
      toast.error("Please login to save journals", {
        style: {
          border: '1px solid #F87171', // Error color
          padding: '16px',
          color: '#1F2937', // Dark slate text
          backgroundColor: '#F9FAFB', // Off-white background
        },
        iconTheme: {
          primary: '#F87171',
          secondary: '#F9FAFB',
        },
        position: 'top-right' as ToastPosition, // Explicitly cast position
      });
      return;
    }
    if (!text.trim()) {
      // Pass options directly to toast.error
      toast.error("Write something to save", {
        style: {
          border: '1px solid #F87171', // Error color
          padding: '16px',
          color: '#1F2937', // Dark slate text
          backgroundColor: '#F9FAFB', // Off-white background
        },
        iconTheme: {
          primary: '#F87171',
          secondary: '#F9FAFB',
        },
        position: 'top-right' as ToastPosition, // Explicitly cast position
      });
      return;
    }

    setAutosaveStatus("Saving..."); // Indicate saving
    try {
      const enc = await encryptText(text);
      await addJournal(user.uid, { ciphertext: enc.ciphertext, iv: enc.iv, alg: enc.alg });
      setText(""); // Clear text after manual save
      setAutosaveStatus(""); // Clear status after manual save
      // Pass options directly to toast.success
      toast.success("Journal saved securely", {
        style: {
          border: '1px solid #4ADE80', // Success color
          padding: '16px',
          color: '#1F2937', // Dark slate text
          backgroundColor: '#F9FAFB', // Off-white background
        },
        iconTheme: {
          primary: '#4ADE80',
          secondary: '#F9FAFB',
        },
        position: 'top-right' as ToastPosition, // Explicitly cast position
      });
      onSave?.(); // Call onSave prop after successful manual save
    } catch (e: unknown) { // Explicitly type 'e'
      console.error(e);
      setAutosaveStatus("Error");
      // Pass options directly to toast.error
      toast.error("Could not save journal", {
        style: {
          border: '1px solid #F87171', // Error color
          padding: '16px',
          color: '#1F2937', // Dark slate text
          backgroundColor: '#F9FAFB', // Off-white background
        },
        iconTheme: {
          primary: '#F87171',
          secondary: '#F9FAFB',
        },
        position: 'top-right' as ToastPosition, // Explicitly cast position
      });
    }
  };

  return (
    <div className={`relative ${isDistractionFreeMode ? "fixed inset-0 z-50 bg-[#F9FAFB] dark:bg-[#111827] flex items-center justify-center" : "max-w-2xl mx-auto"}`} ref={autosaveRef}>
      <h2 className={`text-2xl font-semibold mb-4 ${isDistractionFreeMode ? "sr-only" : ""}`}>Journal</h2>
      
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Write your thoughts..."
        className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF]
                   ${isDistractionFreeMode ? "h-[80vh] text-lg" : "min-h-[200px]"}
                   dark:bg-[#111827] dark:border-gray-700 dark:text-[#1F2937]`}
        rows={isDistractionFreeMode ? 15 : 8}
      />

      <div className={`mt-4 flex items-center justify-between ${isDistractionFreeMode ? "flex-col sm:flex-row" : "gap-3"}`}>
        <div className={`flex items-center ${isDistractionFreeMode ? "order-2 sm:order-1 mt-4 sm:mt-0" : ""}`}>
          <button
            onClick={toggleDistractionFreeMode}
            className={`p-2 rounded-full mr-3 transition-colors ${isDistractionFreeMode ? "bg-[#6C63FF] text-white" : "hover:bg-[#5a50c2]"}`}
          >
            {isDistractionFreeMode ? "Exit Distraction-Free" : "Distraction-Free Mode"}
          </button>

          <AnimatePresence>
            {autosaveStatus && (
              <motion.span
                key={autosaveStatus}
                variants={autosaveVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`text-sm ${
                  autosaveStatus === "Saved ✔" ? "text-green-500" :
                  autosaveStatus === "Error" ? "text-red-500" :
                  "text-gray-500 dark:text-gray-400"
                }`}
              >
                {autosaveStatus}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className={`flex ${isDistractionFreeMode ? "order-1 sm:order-2" : ""}`}>
          <button onClick={handleReset} className="mr-3 p-2 rounded-full border hover:bg-[#e0e0e0] dark:hover:bg-[#4a409c]">Reset</button>
          <button onClick={handleManualSave} disabled={!text.trim() || !user} className={`p-2 rounded-full text-white font-semibold transition-colors ${!text.trim() || !user ? "bg-gray-400 cursor-not-allowed" : "bg-[#6C63FF] hover:bg-[#5a50c2]"}`}>
            {autosaveStatus === "Saving..." ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

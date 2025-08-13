"use client";

import { useState } from "react";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Calendar, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import FloatingActionButton from "@/components/FloatingActionButton";

const moods = [
  { emoji: "😊", label: "Happy", score: 5, color: "from-yellow-400 to-orange-400", description: "Feeling joyful and content" },
  { emoji: "😢", label: "Sad", score: 2, color: "from-blue-400 to-blue-600", description: "Feeling down or melancholy" },
  { emoji: "😰", label: "Anxious", score: 3, color: "from-purple-400 to-purple-600", description: "Feeling worried or stressed" },
  { emoji: "😡", label: "Angry", score: 1, color: "from-red-400 to-red-600", description: "Feeling frustrated or upset" },
  { emoji: "😐", label: "Neutral", score: 3, color: "from-gray-400 to-gray-500", description: "Feeling balanced and calm" },
  { emoji: "😴", label: "Tired", score: 2, color: "from-indigo-400 to-indigo-600", description: "Feeling sleepy or drained" },
  { emoji: "🤗", label: "Grateful", score: 5, color: "from-green-400 to-green-600", description: "Feeling thankful and blessed" },
  { emoji: "😤", label: "Motivated", score: 4, color: "from-pink-400 to-pink-600", description: "Feeling energized and driven" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function MoodTrackerScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedMoodData = moods.find((m) => m.emoji === selectedMood);

  const saveMood = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to save your mood.");
      return;
    }

    if (!selectedMood) {
      toast.error("Please select a mood first.");
      return;
    }

    setIsLoading(true);

    try {
      const moodsRef = collection(doc(db, "users", user.uid), "moods");
      await addDoc(moodsRef, {
        mood: selectedMood,
        label: selectedMoodData?.label || "",
        score: selectedMoodData?.score || 3,
        note: note || "",
        timestamp: serverTimestamp(),
      });

      // Success animation and feedback
      toast.success(
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span>Your mood has been recorded!</span>
        </div>
      );
      
      setSelectedMood(null);
      setNote("");
    } catch (err) {
      console.error("Error saving mood:", err);
      toast.error("Could not save mood. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold gradient-text">Mood Check-In</h1>
            </div>
            <p className="text-xl text-muted-foreground font-serif italic">
              "How are you feeling today?"
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </motion.div>

          {/* Mood Selection Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {moods.map((mood, index) => (
                <motion.div
                  key={mood.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Card
                    onClick={() => setSelectedMood(mood.emoji)}
                    className={`mood-card cursor-pointer p-6 flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 ${
                      selectedMood === mood.emoji
                        ? `border-primary bg-gradient-to-br ${mood.color} text-white shadow-glow selected`
                        : "border-border hover:border-primary/30 bg-card hover:bg-card/80"
                    }`}
                  >
                    <motion.span 
                      className="text-4xl"
                      animate={selectedMood === mood.emoji ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {mood.emoji}
                    </motion.span>
                    <div className="text-center">
                      <span className={`font-semibold ${
                        selectedMood === mood.emoji ? "text-white" : "text-foreground"
                      }`}>
                        {mood.label}
                      </span>
                      <p className={`text-xs mt-1 ${
                        selectedMood === mood.emoji ? "text-white/80" : "text-muted-foreground"
                      }`}>
                        {mood.description}
                      </p>
                    </div>
                    
                    {/* Selection indicator */}
                    <AnimatePresence>
                      {selectedMood === mood.emoji && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Selected Mood Display */}
          <AnimatePresence>
            {selectedMoodData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                variants={itemVariants}
                className="max-w-2xl mx-auto"
              >
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedMoodData.color} flex items-center justify-center text-2xl`}>
                      {selectedMoodData.emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        You're feeling {selectedMoodData.label.toLowerCase()}
                      </h3>
                      <p className="text-muted-foreground">{selectedMoodData.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes Section */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Add a note (optional)</h3>
              </div>
              <textarea
                placeholder="What's on your mind? Share your thoughts, what happened today, or anything you'd like to remember..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full min-h-[120px] p-4 rounded-xl border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 placeholder:text-muted-foreground"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">
                  {note.length}/500 characters
                </span>
                {note.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setNote("")}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </motion.button>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <Button
              onClick={saveMood}
              disabled={!selectedMood || isLoading}
              className="w-full py-4 text-lg font-semibold btn-primary relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving your mood...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Save My Mood</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Encouragement Message */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-muted-foreground font-serif italic">
              "Every feeling is valid. You're taking a positive step by checking in with yourself. 💙"
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}

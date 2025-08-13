"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Tag {
  id: string;
  label: string;
  color?: string;
}

interface TagPillsProps {
  tags: Tag[];
  selectedTags?: string[];
  onTagSelect?: (tagId: string) => void;
  onTagRemove?: (tagId: string) => void;
  variant?: "selectable" | "display" | "removable";
  size?: "sm" | "md" | "lg";
}

const tagColors = [
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-yellow-400 to-yellow-600",
  "from-indigo-400 to-indigo-600",
  "from-red-400 to-red-600",
  "from-teal-400 to-teal-600",
];

export default function TagPills({
  tags,
  selectedTags = [],
  onTagSelect,
  onTagRemove,
  variant = "display",
  size = "md"
}: TagPillsProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const getTagColor = (index: number) => {
    return tagColors[index % tagColors.length];
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => {
        const isSelected = selectedTags.includes(tag.id);
        const colorClass = tag.color || getTagColor(index);

        return (
          <motion.div
            key={tag.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              onClick={() => variant === "selectable" && onTagSelect?.(tag.id)}
              className={`
                inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer
                ${sizeClasses[size]}
                ${variant === "selectable" && isSelected
                  ? `bg-gradient-to-r ${colorClass} text-white shadow-md`
                  : variant === "selectable"
                  ? "bg-secondary text-secondary-foreground hover:bg-primary/10 border border-border"
                  : variant === "removable"
                  ? `bg-gradient-to-r ${colorClass} text-white shadow-sm`
                  : "bg-secondary text-secondary-foreground"
                }
                ${variant === "selectable" ? "hover:shadow-lg" : ""}
              `}
            >
              <span>{tag.label}</span>
              
              {variant === "removable" && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagRemove?.(tag.id);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-0.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Predefined common tags for mental health journaling
export const commonTags: Tag[] = [
  { id: "gratitude", label: "Gratitude" },
  { id: "anxiety", label: "Anxiety" },
  { id: "happiness", label: "Happiness" },
  { id: "stress", label: "Stress" },
  { id: "work", label: "Work" },
  { id: "relationships", label: "Relationships" },
  { id: "self-care", label: "Self Care" },
  { id: "goals", label: "Goals" },
  { id: "reflection", label: "Reflection" },
  { id: "mindfulness", label: "Mindfulness" },
  { id: "exercise", label: "Exercise" },
  { id: "sleep", label: "Sleep" },
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "creativity", label: "Creativity" },
  { id: "learning", label: "Learning" },
  { id: "nature", label: "Nature" },
  { id: "meditation", label: "Meditation" },
];
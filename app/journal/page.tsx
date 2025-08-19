"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Calendar,
  Tag,
  Edit3,
  Clock,
  Sparkles,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FloatingActionButton from "@/components/FloatingActionButton";
import TagPills, { commonTags } from "@/components/TagPills";
import { CardSkeleton } from "@/components/LoadingShimmer";
import { format, isToday, isYesterday } from "date-fns";
import { parseISO } from "date-fns/parseISO";

// Mock journal entries with enhanced data
const mockEntries = [
  {
    id: "1",
    title: "A Beautiful Morning",
    content: "Today started with the most gorgeous sunrise. I took a moment to appreciate the simple beauty around me. The way the light filtered through my window reminded me that every day is a gift. I'm feeling grateful for this peaceful moment before the day begins.\n\nI've been practicing mindfulness more regularly, and it's really helping me stay present. Even small moments like this feel more meaningful now.",
    createdAt: new Date().toISOString(),
    mood: "😊",
    tags: ["gratitude", "mindfulness", "nature"],
    wordCount: 89,
  },
  {
    id: "2",
    title: "Reflecting on Growth",
    content: "Had an interesting conversation with a friend today about personal growth. It made me realize how much I've changed over the past year. The challenges I faced seemed overwhelming at the time, but looking back, they were exactly what I needed to become stronger.\n\nI'm learning to trust the process more and worry less about the outcome.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    mood: "🤗",
    tags: ["reflection", "growth", "friends"],
    wordCount: 76,
  },
  {
    id: "3",
    title: "Creative Energy",
    content: "Spent the afternoon working on a creative project. There's something magical about getting lost in the flow of creation. Time seemed to disappear, and I felt completely absorbed in the moment.\n\nThese are the moments that remind me why creativity is so important to my well-being.",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    mood: "😤",
    tags: ["creativity", "flow", "self-care"],
    wordCount: 54,
  },
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function JournalPage() {
  const [entries, setEntries] = useState(mockEntries);
  const [filteredEntries, setFilteredEntries] = useState(mockEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(setEntries, isWriting, setLoading);
  // Filter entries based on search and tags
  useEffect(() => {
    let filtered = entries;

    if (searchQuery) {
      filtered = filtered.filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(entry =>
        selectedTags.some(tag => entry.tags.includes(tag))
      );
    }

    setFilteredEntries(filtered);
  }, [entries, searchQuery, selectedTags]);

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMMM d, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "h:mm a");
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold gradient-text">My Journal</h1>
            </div>
            <p className="text-xl text-muted-foreground font-serif italic">
              &ldquo;Your thoughts, your story, your journey&rdquo;
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search your thoughts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  />
                </div>

                {/* Tag Filters */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Filter by tags:</span>
                    {(searchQuery || selectedTags.length > 0) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Clear filters
                      </Button>
                    )}
                  </div>
                  <TagPills
                    tags={commonTags}
                    selectedTags={selectedTags}
                    onTagSelect={handleTagSelect}
                    variant="selectable"
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* New Entry Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button
              onClick={() => setIsWriting(true)}
              className="btn-primary px-8 py-4 text-lg font-semibold group"
            >
              <Plus className="w-5 h-5 mr-2" />
              Write New Entry
              <Edit3 className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Entries Grid */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <CardSkeleton count={3} />
            ) : filteredEntries.length === 0 ? (
              <Card className="p-12 text-center bg-card/30">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {searchQuery || selectedTags.length > 0 ? "No entries found" : "Start your journaling journey"}
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery || selectedTags.length > 0 
                        ? "Try adjusting your search or filters"
                        : "Your first entry is just a click away. Share your thoughts, feelings, and experiences."
                      }
                    </p>
                  </div>
                  {!(searchQuery || selectedTags.length > 0) && (
                    <Button
                      onClick={() => setIsWriting(true)}
                      className="btn-primary"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Write Your First Entry
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <Card className="journal-card h-full cursor-pointer overflow-hidden">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {entry.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(entry.createdAt)}</span>
                                <Clock className="w-3 h-3 ml-2" />
                                <span>{formatTime(entry.createdAt)}</span>
                              </div>
                            </div>
                            <div className="text-2xl ml-2">{entry.mood}</div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground text-sm line-clamp-4 mb-4">
                            {entry.content}
                          </p>
                          
                          <div className="space-y-3">
                            {/* Tags */}
                            <TagPills
                              tags={entry.tags.map(tag => ({ id: tag, label: commonTags.find(t => t.id === tag)?.label || tag }))}
                              variant="display"
                              size="sm"
                            />
                            
                            {/* Word Count */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{entry.wordCount} words</span>
                              <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                <span>Tap to read</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Stats */}
          {filteredEntries.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {filteredEntries.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {filteredEntries.length === 1 ? "Entry" : "Entries"}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {filteredEntries.reduce((sum, entry) => sum + entry.wordCount, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Words</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {Math.round(filteredEntries.reduce((sum, entry) => sum + entry.wordCount, 0) / filteredEntries.length)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Words</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Encouragement */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-muted-foreground font-serif italic">
              &ldquo;Every word you write is a step towards understanding yourself better. Keep going! ✨&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>

      <FloatingActionButton />
    </div>
  );
}

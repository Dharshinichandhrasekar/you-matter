"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Calendar, 
  Heart, 
  BookOpen, 
  Target, 
  Award,
  BarChart3,
  Activity,
  Zap,
  Smile
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FloatingActionButton from "@/components/FloatingActionButton";
import DailyQuote from "@/components/DailyQuote";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data - in real app, this would come from Firebase
const moodData = [
  { date: "Mon", mood: 4, entries: 2 },
  { date: "Tue", mood: 3, entries: 1 },
  { date: "Wed", mood: 5, entries: 3 },
  { date: "Thu", mood: 4, entries: 2 },
  { date: "Fri", mood: 5, entries: 1 },
  { date: "Sat", mood: 4, entries: 4 },
  { date: "Sun", mood: 5, entries: 2 },
];

const weeklyMoodData = [
  { week: "Week 1", avgMood: 3.8 },
  { week: "Week 2", avgMood: 4.2 },
  { week: "Week 3", avgMood: 3.9 },
  { week: "Week 4", avgMood: 4.5 },
];

const stats = {
  totalEntries: 47,
  currentStreak: 7,
  averageMood: 4.2,
  mostCommonMood: "Happy",
  journalEntries: 23,
  moodEntries: 47,
};

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

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BarChart3 className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold gradient-text">Your Insights</h1>
            </div>
            <p className="text-xl text-muted-foreground font-serif italic">
              "Discover patterns in your emotional journey"
            </p>
          </motion.div>

          {/* Daily Quote */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <DailyQuote />
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-glow transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                      <p className="text-2xl font-bold text-foreground">{stats.currentStreak} days</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 bg-gradient-to-br from-green-400/5 to-green-400/10 border-green-400/20 hover:shadow-glow-accent transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Mood</p>
                      <p className="text-2xl font-bold text-foreground">{stats.averageMood}/5</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 bg-gradient-to-br from-purple-400/5 to-purple-400/10 border-purple-400/20 hover:shadow-glow transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Journal Entries</p>
                      <p className="text-2xl font-bold text-foreground">{stats.journalEntries}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="p-6 bg-gradient-to-br from-yellow-400/5 to-yellow-400/10 border-yellow-400/20 hover:shadow-glow-accent transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Smile className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Most Common</p>
                      <p className="text-2xl font-bold text-foreground">{stats.mostCommonMood}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mood Trend Chart */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Mood Trend
                    </CardTitle>
                    <div className="flex gap-2">
                      {["week", "month", "year"].map((range) => (
                        <Button
                          key={range}
                          variant={timeRange === range ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTimeRange(range as any)}
                          className="capitalize"
                        >
                          {range}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis 
                          domain={[1, 5]}
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))"
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Journal Activity Chart */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    Journal Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))"
                          }}
                        />
                        <Bar 
                          dataKey="entries" 
                          fill="hsl(var(--accent))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Achievement Cards */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Recent Achievements</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">7-Day Streak!</p>
                    <p className="text-sm text-muted-foreground">Keep it up!</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">First Journal</p>
                    <p className="text-sm text-muted-foreground">Great start!</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Mood Master</p>
                    <p className="text-sm text-muted-foreground">50 entries logged</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Encouragement Message */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-muted-foreground font-serif italic">
              "Your journey of self-discovery is beautiful. Every entry brings you closer to understanding yourself. 🌟"
            </p>
          </motion.div>
        </motion.div>
      </div>

      <FloatingActionButton />
    </div>
  );
}
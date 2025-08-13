"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Trash2,
  Edit3,
  Camera,
  Award,
  Target,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import FloatingActionButton from "@/components/FloatingActionButton";

// Mock user stats - in real app, this would come from Firebase
const userStats = {
  totalEntries: 47,
  currentStreak: 7,
  longestStreak: 21,
  averageMood: 4.2,
  joinDate: "2024-01-15",
  totalWords: 12847,
  favoriteTime: "Evening",
  mostUsedTag: "Gratitude",
};

const achievements = [
  {
    id: "first-entry",
    title: "First Steps",
    description: "Wrote your first journal entry",
    icon: "🌱",
    earned: true,
    date: "2024-01-15"
  },
  {
    id: "week-streak",
    title: "Week Warrior",
    description: "Maintained a 7-day streak",
    icon: "🔥",
    earned: true,
    date: "2024-01-22"
  },
  {
    id: "mood-master",
    title: "Mood Master",
    description: "Logged 50 mood entries",
    icon: "😊",
    earned: true,
    date: "2024-02-10"
  },
  {
    id: "month-streak",
    title: "Monthly Dedication",
    description: "Maintained a 30-day streak",
    icon: "🏆",
    earned: false,
    date: null
  },
];

const containerVariants: Variants = {
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
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-8 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
              <Button onClick={() => window.location.href = '/auth/login'}>
                Log In
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
              <User className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
            </div>
            <p className="text-xl text-muted-foreground font-serif italic">
              "Your journey, your progress, your story"
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-background flex items-center justify-center hover:bg-primary/10 transition-colors">
                    <Camera className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      {user.displayName || "Wellness Warrior"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {new Date(userStats.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold gradient-text">{userStats.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">{userStats.totalEntries}</div>
                    <div className="text-xs text-muted-foreground">Total Entries</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{userStats.averageMood}/5</div>
                <div className="text-sm text-muted-foreground">Average Mood</div>
              </Card>

              <Card className="p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{userStats.longestStreak}</div>
                <div className="text-sm text-muted-foreground">Longest Streak</div>
              </Card>

              <Card className="p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{userStats.totalWords.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Words Written</div>
              </Card>

              <Card className="p-6 text-center hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{achievements.filter(a => a.earned).length}</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </Card>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        achievement.earned
                          ? "bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20"
                          : "bg-card/50 border-border opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-primary mt-1">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {achievement.earned && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Settings & Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Notifications</h3>
                        <p className="text-sm text-muted-foreground">Daily reminders and streak alerts</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Theme</h3>
                        <p className="text-sm text-muted-foreground">Customize your app appearance</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Privacy</h3>
                        <p className="text-sm text-muted-foreground">Data encryption and security settings</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium text-foreground">Export Data</h3>
                        <p className="text-sm text-muted-foreground">Download your journal entries and data</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/20 dark:to-red-900/10 dark:border-red-800">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-red-800 dark:text-red-200">Delete Account</h3>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Encouragement */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-muted-foreground font-serif italic">
              "You're doing amazing! Every day you choose to check in with yourself is a victory. Keep going! 🌟"
            </p>
          </motion.div>
        </motion.div>
      </div>

      <FloatingActionButton />
    </div>
  );
}

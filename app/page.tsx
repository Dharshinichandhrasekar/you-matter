"use client";

import { motion, Variants } from "framer-motion";
import { Heart, Sparkles, TrendingUp, BookOpen, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingActionButton from "@/components/FloatingActionButton";
import DailyQuote from "@/components/DailyQuote";

const features = [
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Beautiful, intuitive mood logging with detailed insights",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: BookOpen,
    title: "Smart Journaling",
    description: "Express your thoughts with our elegant writing experience",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Personal Insights",
    description: "Discover patterns and trends in your emotional journey",
    color: "from-green-400 to-green-600",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and completely private",
    color: "from-purple-400 to-purple-600",
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Heart className="w-12 h-12 text-primary" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                YouMatter
              </h1>
            </div>
            
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-4xl font-bold text-foreground mb-6 max-w-4xl mx-auto"
            >
              Your Journey to{" "}
              <span className="gradient-text font-serif italic">Emotional Wellness</span>{" "}
              Starts Here
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-serif"
            >
              &quot;A beautiful, private space to track your moods, journal your thoughts, 
              and discover insights about your emotional well-being.&quot;
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/mood">
                <Button className="btn-primary px-8 py-4 text-lg font-semibold group">
                  <Heart className="w-5 h-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/journal">
                <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-primary/5">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Journaling
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Everything You Need for{" "}
                <span className="gradient-text">Mental Wellness</span>
              </h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Thoughtfully designed features to support your emotional journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="p-6 h-full border-2 border-border hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">
                    Join Thousands on Their Wellness Journey
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
                    <div className="text-muted-foreground">Mood entries logged</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">95%</div>
                    <div className="text-muted-foreground">Report improved self-awareness</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text mb-2">4.9★</div>
                    <div className="text-muted-foreground">User satisfaction rating</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Daily Quote */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <DailyQuote />
          </motion.div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg gradient-text">YouMatter</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 YouMatter. Made with ❤️ for your mental wellness journey.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sunrise, Moon, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

const quotes = {
  morning: [
    {
      text: "Every morning we are born again. What we do today is what matters most.",
      author: "Buddha"
    },
    {
      text: "The morning breeze has secrets to tell you. Do not go back to sleep.",
      author: "Rumi"
    },
    {
      text: "Today is a new day. You will get out of it just what you put into it.",
      author: "Mary Pickford"
    },
    {
      text: "Rise up, start fresh, see the bright opportunity in each day.",
      author: "Unknown"
    },
    {
      text: "Every sunrise is an invitation for us to arise and brighten someone's day.",
      author: "Richelle E. Goodrich"
    }
  ],
  evening: [
    {
      text: "Reflect upon your present blessings, of which every man has many.",
      author: "Charles Dickens"
    },
    {
      text: "The quieter you become, the more you are able to hear.",
      author: "Rumi"
    },
    {
      text: "Peace comes from within. Do not seek it without.",
      author: "Buddha"
    },
    {
      text: "In the depth of winter, I finally learned that there was in me an invincible summer.",
      author: "Albert Camus"
    },
    {
      text: "The best way to take care of the future is to take care of the present moment.",
      author: "Thich Nhat Hanh"
    }
  ]
};

export default function DailyQuote() {
  const [currentQuote, setCurrentQuote] = useState<{text: string, author: string} | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'evening'>('morning');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    return hour < 18 ? 'morning' : 'evening';
  };

  const getRandomQuote = (time: 'morning' | 'evening') => {
    const quoteList = quotes[time];
    return quoteList[Math.floor(Math.random() * quoteList.length)];
  };

  const refreshQuote = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for animation
    setCurrentQuote(getRandomQuote(timeOfDay));
    setIsRefreshing(false);
  };

  useEffect(() => {
    const time = getTimeOfDay();
    setTimeOfDay(time);
    setCurrentQuote(getRandomQuote(time));
  }, []);

  if (!currentQuote) return null;

  const Icon = timeOfDay === 'morning' ? Sunrise : Moon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon className={`w-5 h-5 ${timeOfDay === 'morning' ? 'text-yellow-500' : 'text-blue-400'}`} />
              <span className="text-sm font-medium text-muted-foreground capitalize">
                {timeOfDay} Inspiration
              </span>
            </div>
            
            <motion.button
              onClick={refreshQuote}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50"
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </motion.button>
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <blockquote className="text-lg font-serif italic text-foreground mb-3 leading-relaxed">
                    "{currentQuote.text}"
                  </blockquote>
                  <cite className="text-sm text-muted-foreground font-medium">
                    — {currentQuote.author}
                  </cite>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import { 
  AlertCircle, 
  Phone, 
  MessageCircle, 
  Globe, 
  Heart, 
  Shield,
  ExternalLink,
  Clock,
  Users,
  Headphones
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const emergencyNumbers = [
  { 
    country: "United States", 
    number: "988", 
    description: "Suicide & Crisis Lifeline",
    available: "24/7",
    type: "call"
  },
  { 
    country: "United Kingdom", 
    number: "116 123", 
    description: "Samaritans",
    available: "24/7",
    type: "call"
  },
  { 
    country: "Canada", 
    number: "1-833-456-4566", 
    description: "Talk Suicide Canada",
    available: "24/7",
    type: "call"
  },
  { 
    country: "Australia", 
    number: "13 11 14", 
    description: "Lifeline Australia",
    available: "24/7",
    type: "call"
  },
  { 
    country: "India", 
    number: "91529 87821", 
    description: "AASRA",
    available: "24/7",
    type: "call"
  },
  { 
    country: "Global", 
    number: "Text HOME to 741741", 
    description: "Crisis Text Line",
    available: "24/7",
    type: "text"
  },
];

const onlineResources = [
  {
    name: "Crisis Text Line",
    description: "Free, 24/7 support via text message",
    url: "https://www.crisistextline.org",
    icon: MessageCircle,
    color: "from-blue-400 to-blue-600"
  },
  {
    name: "7 Cups",
    description: "Free emotional support and online therapy",
    url: "https://www.7cups.com",
    icon: Users,
    color: "from-green-400 to-green-600"
  },
  {
    name: "BetterHelp",
    description: "Professional online counseling",
    url: "https://www.betterhelp.com",
    icon: Headphones,
    color: "from-purple-400 to-purple-600"
  },
  {
    name: "Mental Health America",
    description: "Resources and screening tools",
    url: "https://www.mhanational.org",
    icon: Heart,
    color: "from-pink-400 to-pink-600"
  },
];

const copingStrategies = [
  {
    title: "Breathing Exercise",
    description: "Take slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 6.",
    icon: "🫁"
  },
  {
    title: "Grounding Technique",
    description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
    icon: "🌱"
  },
  {
    title: "Reach Out",
    description: "Contact a trusted friend, family member, or mental health professional.",
    icon: "🤝"
  },
  {
    title: "Safe Space",
    description: "Go to a place where you feel safe and comfortable.",
    icon: "🏠"
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

export default function EmergencyPage() {
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
              <Shield className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold gradient-text">Crisis Support</h1>
            </div>
            <p className="text-xl text-muted-foreground font-serif italic max-w-3xl mx-auto">
              "You are not alone. Help is available 24/7. Your life matters, and there are people who care."
            </p>
          </motion.div>

          {/* Emergency Alert */}
          <motion.div variants={itemVariants}>
            <Card className="border-red-200 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/20 dark:to-red-900/10 dark:border-red-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                      If you're in immediate danger
                    </h3>
                    <p className="text-red-700 dark:text-red-300 mb-4">
                      Please call your local emergency services immediately (911 in the US, 999 in the UK, 112 in EU, etc.) 
                      or go to your nearest emergency room.
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Emergency Services
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Crisis Hotlines */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Crisis Hotlines</h2>
              <p className="text-muted-foreground">Free, confidential support available 24/7</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyNumbers.map((resource, index) => (
                <motion.div
                  key={resource.country}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-2 border-border hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          {resource.type === "call" ? (
                            <Phone className="w-5 h-5 text-primary" />
                          ) : (
                            <MessageCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{resource.country}</CardTitle>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{resource.available}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="font-mono text-lg font-bold text-primary text-center">
                            {resource.number}
                          </p>
                        </div>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => {
                            if (resource.type === "call") {
                              window.open(`tel:${resource.number.replace(/\s/g, '')}`);
                            } else {
                              // For text services, show instructions
                              alert(`Send a text message: ${resource.number}`);
                            }
                          }}
                        >
                          {resource.type === "call" ? (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </>
                          ) : (
                            <>
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Text Now
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Online Resources */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Online Support</h2>
              <p className="text-muted-foreground">Professional help and peer support online</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {onlineResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.name}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="h-full border-2 border-border hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {resource.name}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {resource.description}
                            </p>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => window.open(resource.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Immediate Coping Strategies */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Immediate Coping Strategies</h2>
                <p className="text-muted-foreground">Try these techniques to help manage overwhelming feelings</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {copingStrategies.map((strategy, index) => (
                  <motion.div
                    key={strategy.title}
                    variants={itemVariants}
                    className="p-4 bg-card/50 rounded-xl border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{strategy.icon}</div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {strategy.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {strategy.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Encouragement */}
          <motion.div variants={itemVariants} className="text-center">
            <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-card to-card/50 border-primary/10">
              <div className="space-y-4">
                <Heart className="w-12 h-12 text-primary mx-auto" />
                <blockquote className="text-xl font-serif italic text-muted-foreground">
                  "The darkest nights produce the brightest stars. You are stronger than you know, 
                  and this difficult moment will pass. Reach out for help – it's a sign of courage, not weakness."
                </blockquote>
                <p className="text-sm text-muted-foreground">— Remember, you matter ❤️</p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

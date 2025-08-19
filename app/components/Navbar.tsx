"use client";

import Link from "next/link";
// import { signOut } from "firebase/auth";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Heart, 
  BookOpen, 
  BarChart3, 
  AlertCircle, 
  User, 

  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/mood", icon: Heart, label: "Mood" },
  { href: "/journal", icon: BookOpen, label: "Journal" },
  { href: "/dashboard", icon: BarChart3, label: "Insights" },
  { href: "/emergency", icon: AlertCircle, label: "Emergency" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isDark = theme === "dark";



  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
      >
        <nav className="floating-nav rounded-2xl px-6 py-3">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">YouMatter</span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.slice(1).map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDark ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-600" />
                  )}
                </motion.div>
              </motion.button>

              {/* Auth Actions */}
              
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden floating-nav border-t"
      >
        <div className="flex items-center justify-around px-4 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isActive ? "bg-primary/10" : ""}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="w-1 h-1 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile spacing */}
      <div className="h-20 md:hidden" />
    </>
  );
}

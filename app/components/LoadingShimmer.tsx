"use client";

import { motion } from "framer-motion";

interface LoadingShimmerProps {
  variant?: "card" | "text" | "avatar" | "button" | "custom";
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

const shimmerVariants = {
  loading: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export default function LoadingShimmer({
  variant = "card",
  width,
  height,
  className = "",
  count = 1,
}: LoadingShimmerProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "card":
        return "w-full h-48 rounded-xl";
      case "text":
        return "w-3/4 h-4 rounded";
      case "avatar":
        return "w-12 h-12 rounded-full";
      case "button":
        return "w-32 h-10 rounded-lg";
      case "custom":
        return "";
      default:
        return "w-full h-48 rounded-xl";
    }
  };

  const shimmerClass = `
    loading-shimmer
    ${getVariantClasses()}
    ${className}
  `;

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  if (count === 1) {
    return (
      <motion.div
        className={shimmerClass}
        style={style}
        variants={shimmerVariants}
        animate="loading"
      />
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={shimmerClass}
          style={style}
          variants={shimmerVariants}
          animate="loading"
          transition={{
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Specific loading components for common use cases
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-4">
            <LoadingShimmer variant="avatar" />
            <div className="flex-1 space-y-2">
              <LoadingShimmer variant="text" width="60%" />
              <LoadingShimmer variant="text" width="40%" />
            </div>
          </div>
          <LoadingShimmer variant="card" height="200px" />
        </div>
      ))}
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <LoadingShimmer
          key={index}
          variant="text"
          width={index === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}

export function MoodCardSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-3">
          <LoadingShimmer width="100%" height="120px" className="rounded-xl" />
          <LoadingShimmer variant="text" width="80%" className="mx-auto" />
        </div>
      ))}
    </div>
  );
}
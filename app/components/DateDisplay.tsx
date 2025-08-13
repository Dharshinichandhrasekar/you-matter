"use client";

import ClientOnly from "./ClientOnly";

interface DateDisplayProps {
  timestamp: any; // Firebase Timestamp
  className?: string;
}

export default function DateDisplay({ timestamp, className }: DateDisplayProps) {
  return (
    <ClientOnly fallback={<span className={className}>Loading...</span>}>
      <span className={className}>
        {timestamp?.toDate ? timestamp.toDate().toLocaleString() : ""}
      </span>
    </ClientOnly>
  );
}
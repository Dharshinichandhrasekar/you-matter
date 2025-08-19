"use client";

import ClientOnly from "./ClientOnly";

interface DateDisplayProps {
  // Accept Firestore Timestamp-like or Date
  timestamp: { toDate?: () => Date } | Date | null | undefined;
  className?: string;
}

export default function DateDisplay({ timestamp, className }: DateDisplayProps) {
  const date: Date | null = timestamp
    ? (timestamp instanceof Date
        ? timestamp
        : timestamp.toDate
          ? timestamp.toDate()
          : null)
    : null;

  return (
    <ClientOnly fallback={<span className={className}>Loading...</span>}>
      <span className={className}>
        {date ? date.toLocaleString() : ""}
      </span>
    </ClientOnly>
  );
}
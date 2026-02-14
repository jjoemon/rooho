"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";

type LessonTemplateProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  onPlayAgain?: () => void;
  continuePath?: string;
  hideControls?: boolean;
};

export default function LessonTemplate({
  title,
  description,
  children,
  onPlayAgain,
  continuePath,
  hideControls = false,
}: LessonTemplateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 p-6 text-white">

      {/* Header */}
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="opacity-80">{description}</p>
      </div>

      {/* Main content */}
      <div className="w-full flex justify-center">
        {children}
      </div>

      {/* Controls */}
      {!hideControls && (
        <div className="flex flex-col gap-4 w-full max-w-xs mt-6">

          {onPlayAgain && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlayAgain}
              className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold shadow-md"
            >
              ▶ Play Again
            </motion.button>
          )}

          {continuePath && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(continuePath)}
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold shadow-md"
            >
              ➡ Continue
            </motion.button>
          )}

        </div>
      )}
    </div>
  );
}

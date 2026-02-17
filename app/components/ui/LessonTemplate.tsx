"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type LessonTemplateProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  characterMessage?: string;
  videoSrc?: string;
  hideControls?: boolean;
};

export default function LessonTemplate({
  children,
  title,
  description,
  characterMessage,
  videoSrc,
}: LessonTemplateProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start px-6 py-6">

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center"
      >
        {/* Header */}
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Character */}
        {characterMessage && videoSrc && (
          <div className="flex flex-col items-center mb-6">
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-40 h-40 object-contain mb-3"
            />
            <div className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md rounded-xl px-4 py-2 shadow-md">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                {characterMessage}
              </p>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="w-full flex justify-center items-start">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

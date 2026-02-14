"use client";

import ContentCard from "@/app/components/ui/ContentCard";
import { motion } from "framer-motion";

type LessonTemplateProps = {
  characterMessage?: string;
  videoSrc?: string;
  children?: React.ReactNode;       // lesson-specific content
};

export default function LessonTemplate({
  characterMessage,
  videoSrc,
  children,
}: LessonTemplateProps) {
  return (
    <ContentCard variant="responsive" className="p-6">

      {/* Character message */}
      {characterMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <div className="inline-block bg-transparent text-white text-lg font-medium px-4 py-2">
            {characterMessage}
          </div>
        </motion.div>
      )}

      {/* Character animation */}
      {videoSrc && (
        <motion.video
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          autoPlay
          loop
          muted
          playsInline
          className="w-64 h-64 object-contain rounded-2xl mb-6"
          src={videoSrc}
        />
      )}

      {/* Lesson-specific UI (buttons, tasks, activities, etc.) */}
      <div className="w-full flex flex-col items-center gap-4">
        {children}
      </div>
    </ContentCard>
  );
}

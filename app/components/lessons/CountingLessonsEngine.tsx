"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type NumberItem = {
  number: number;
  color: string;
  image: string;
  audio?: string;
};

type LessonData = {
  introText: string;
  endText: string;
  continuePath: string;
  numbers: NumberItem[];
};

type Step =
  | { type: "single"; number: number; repeat?: boolean }
  | { type: "together" }
  | { type: "end" };

type Props = {
  data: LessonData;
};

export default function CountingLessonsEngine({ data }: Props) {
  const router = useRouter();
  const numbers = data.numbers;

  /* ------------------ STEPS ------------------ */
    const steps: Step[] = [
    // Meaning phase
    ...numbers.map(n => ({
      type: "single" as const,
      number: n.number
    })),

    // Participation phase
    ...numbers.map(n => ({
      type: "single" as const,
      number: n.number,
      repeat: true
    })),

    // Ordering phase
    { type: "together" },

    // End
    { type: "end" }
  ];



  const [stepIndex, setStepIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const step = steps[stepIndex];

  /* ---------- AUTO PROGRESSION ---------- */
  useEffect(() => {
    if (!step) return;

    // Pause on together + end
    if (step.type === "together" || step.type === "end") return;

    const timer = setTimeout(() => {
      setStepIndex(prev => prev + 1);
    }, 3500);

    return () => clearTimeout(timer);
  }, [stepIndex, step]);

  /* ---------- AUDIO ---------- */
  useEffect(() => {
    if (!audioEnabled) return;
    if (!step) return;
    if (step.type !== "single") return;

    const item = numbers.find(n => n.number === step.number);
    if (item?.audio) {
      const audio = new Audio(item.audio);
      audio.play().catch(() => {});
    }
  }, [stepIndex, audioEnabled, step, numbers]);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col items-start justify-start px-6 py-6">

      {/* ---------- AUDIO GATE ---------- */}
      {!audioEnabled && (
        <div
          onClick={() => setAudioEnabled(true)}
          className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center cursor-pointer rounded-3xl"
        >
          <div className="bg-white rounded-2xl px-8 py-6 text-center shadow-xl">
            <p className="text-xl font-bold">Tap to start 🔊</p>
            <p className="text-sm mt-2 text-gray-600">Sound will play automatically</p>
          </div>
        </div>
      )}

      {/* ---------- SINGLE STEP ---------- */}
      {step?.type === "single" && (() => {
        const item = numbers.find(n => n.number === step.number);
        if (!item) return null;

        return (
          <motion.div
            key={`${step.number}-${step.repeat}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-start gap-6"
          >
            {/* Number bubble */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-6xl font-extrabold text-white shadow-xl"
              style={{ backgroundColor: item.color }}
            >
              {item.number}
            </div>

            {/* Objects */}
            <div className="flex gap-4 flex-wrap">
              {Array.from({ length: item.number }).map((_, i) => (
                <Image
                  key={i}
                  src={item.image}
                  alt="object"
                  width={90}
                  height={90}
                  className="rounded-full shadow-md border-4 border-white"
                />
              ))}
            </div>

            {/* Repeat prompt */}
            {step.repeat && (
              <div className="text-xl font-semibold text-green-300">
                Say it with me! 🎤
              </div>
            )}
          </motion.div>
        );
      })()}

      {/* ---------- TOGETHER / ORDERING ---------- */}
      {step?.type === "together" && (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-3 mt-6 w-full max-w-3xl mx-auto"
      >
        {numbers.map((n) => (
          <div
            key={n.number}
            className="flex items-center gap-4 py-1"
          >
            {/* Number bubble */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold text-white shadow-md flex-shrink-0"
              style={{ backgroundColor: n.color }}
            >
              {n.number}
            </div>

            {/* Objects */}
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: n.number }).map((_, i) => (
                <Image
                  key={i}
                  src={n.image}
                  alt="object"
                  width={26}
                  height={26}
                  className="rounded-full shadow-sm"
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

    {/* Pause Actions */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex gap-6 mt-8 justify-center"
    >

      <button
        onClick={() => setStepIndex(0)}
        className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl font-semibold shadow-xl"
      >
        ▶ Play Again
      </button>

      <button
        onClick={() => router.push(data.continuePath)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-xl"
      >
        ➡ Continue
      </button>
    </motion.div>
  </>
)}

    </div>
  );
}

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
    // Meaning
    ...numbers.slice(0, 3).map(n => ({
      type: "single" as const,
      number: n.number
    })),

    // Repetition
    ...numbers.slice(0, 3).map(n => ({
      type: "single" as const,
      number: n.number,
      repeat: true
    })),

    // Ordering
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
          {/* LINE BY LINE MEANING VIEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 mt-8 w-full max-w-xl"
          >
            {numbers.map((n) => (
              <div
                key={n.number}
                className="flex items-center gap-6 bg-white rounded-2xl p-4 shadow-lg border"
              >
                {/* Number */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold text-white shadow-lg flex-shrink-0"
                  style={{ backgroundColor: n.color }}
                >
                  {n.number}
                </div>

                {/* Objects */}
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: n.number }).map((_, i) => (
                    <Image
                      key={i}
                      src={n.image}
                      alt="object"
                      width={46}
                      height={46}
                      className="rounded-full border-2 border-pink-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ---------- PAUSE ACTIONS ---------- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4 mt-10 p-4 rounded-2xl bg-gray-900/80 shadow-2xl border border-white/20"
          >

          <button
            onClick={() => setStepIndex(0)}
            className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl font-bold shadow-xl ring-2 ring-green-300/40"
            >
            ▶ Play Again
            </button>

            <button
            onClick={() => router.push(data.continuePath)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-bold shadow-xl ring-2 ring-blue-300/40"
            >
            ➡ Continue
            </button>

          </motion.div>
        </>
      )}
    </div>
  );
}

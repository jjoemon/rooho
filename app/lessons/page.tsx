"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ContentCard from "@/app/components/ui/ContentCard";
import { useState, useEffect, useRef } from "react";
import { getRandomImage } from "@/app/utils/randomImage";
import { getRandomBackgroundImage } from "@/app/utils/randomBg";

export default function LessonsPage() {
  const router = useRouter();

  const [background, setBackground] = useState("/images/background/background2.jpg");
  const [imageSrc, setImageSrc] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null); // 🎧 track the current audio

  const ageGroupsTop = [
    { label: "3–4", path: "/lessons/eng/maths/3-4/" },
    { label: "4–5", path: "/lessons/eng/maths/4-5/" },
  ];

  const ageGroupsBottom = [
    { label: "5–6", path: "/lessons/eng/maths/5-6" },
    { label: "6–7", path: "/lessons/eng/maths/6-7" },
    { label: "7–8", path: "/lessons/eng/maths/7-8" },
  ];

  // Background + Voice greeting
  useEffect(() => {
    setBackground(getRandomBackgroundImage());
    setImageSrc(getRandomImage());

    // Play Uncle Joe’s greeting
    const audio = new Audio("/sounds/characters/uncle_kaka.mp3");
    audio.volume = 1;
    audio.play().catch((err) => console.warn("Audio playback failed:", err));
    audioRef.current = audio;

    //  Cleanup: stop audio when component unmounts or user navigates away
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      window.speechSynthesis.cancel();
    };
  }, []); // will re-run each time the user reloads or revisits this page

  // When user selects an age group, stop any sound or speech first
  const handleNavigation = (path: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    router.push(path);
  };

  return (
    <section
      className="min-h-screen flex items-start justify-center bg-cover bg-center p-0"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-[520px] px-3 flex flex-col items-center justify-start">
        <ContentCard className="relative w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden">

          {/* Greeting */}
          <div className="w-full text-center pt-6 pb-2 z-20">
            <h2 className="bg-white/60 text-black font-semibold text-base rounded-2xl px-4 py-2 backdrop-blur-md shadow-sm inline-block">
              👋 Hello! I’m your uncle Joe.<br />Please choose your age group.
            </h2>
          </div>

          {/* Animated Character */}
          <motion.div
            animate={{
              y: [0, -6, 0, -4, 0],
              scale: [1, 1.02, 1, 1.01, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-[50vh] w-full flex justify-center items-center mt-2 mb-4"
          >
            <video
              src="/images/characters/animations/_Kaka's_Gift(A).mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain object-bottom drop-shadow-lg pointer-events-none"
            />
          </motion.div>

          {/* Age group buttons */}
          <div className="flex flex-col items-center justify-center pb-8 space-y-4">

            {/* Top row (larger buttons) */}
            <div className="flex justify-center gap-4">
              {ageGroupsTop.map((group) => (
                <button
                  key={group.label}
                  onClick={() => handleNavigation(group.path)}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg transition-all transform hover:scale-105"
                >
                  {group.label}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Bottom row (slightly smaller buttons) */}
            <div className="flex justify-center gap-3 flex-wrap">
              {ageGroupsBottom.map((group) => (
                <button
                  key={group.label}
                  onClick={() => handleNavigation(group.path)}
                  className="flex items-center justify-center gap-2 bg-blue-400/90 hover:bg-blue-500 text-white font-semibold py-2.5 px-5 rounded-lg text-base shadow-md transition-all transform hover:scale-105"
                >
                  {group.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </ContentCard>
      </div>
    </section>
  );
}

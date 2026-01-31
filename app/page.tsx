'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentCard from "@/app/components/ui/ContentCard";
import DateCard from "@/app/components/ui/DateCard";
import { useState, useEffect } from "react";
import { getRandomImage } from "@/app/utils/randomImage";
import { getRandomBackgroundImage } from "@/app/utils/randomBg";

export default function HomePage() {
  const router = useRouter();
  const [background, setBackground] = useState("/images/background/background1.jpg");
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    setBackground(getRandomBackgroundImage());
    setImageSrc(getRandomImage());
  }, []);

  const handleStartClick = () => {
    router.push("/lessons");
  };

  return (
    <section
      className="min-h-screen flex items-start justify-center bg-cover bg-center p-0"
      style={{ backgroundImage: `url(${background})` }}
    >
      <ContentCard className="bg-white/30 backdrop-blur-lg shadow-xl border border-white/20 m-0">
        <DateCard className="mb-3" />

        <div className="relative w-full h-64 rounded-xl overflow-hidden">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="Culturally Embedded Learning"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="mt-4 px-2 text-center p-6">
          <h2 className="text-3xl font-bold">Welcome to RooHo!</h2>
          <p className="text-sm font-semibold opacity-800 mt-1 p-6">
            Explore culturally embedded learning experiences through play and creativity.
          </p>
        </div>

        <div className="pb-6">
          <button
            onClick={handleStartClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            START
          </button>
        </div>
      </ContentCard>
    </section>
  );
}

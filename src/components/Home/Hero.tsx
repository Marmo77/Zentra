import React, { useMemo } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import RotatingText from "../ui/reactbits/RotatingText";

const Hero = () => {
  const CTAtexts: string[] = [
    "Achieve More.",
    "Focus Better.",
    "Stay Productive.",
  ];

  // znajdź najdłuższy tekst
  const maxTextLength = useMemo(() => {
    return Math.max(...CTAtexts.map((t) => t.length));
  }, [CTAtexts]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        <div className="flex justify-center max-lg:flex-col items-center text-5xl md:text-6xl lg:text-7xl mb-6">
          <h1 className="tracking-tight text-black dark:text-white text-nowrap">
            Stay Focused.{" "}
          </h1>
          <RotatingText
            texts={CTAtexts}
            className="text-primary dark:text-white max-lg:text-center duration-300 transition-colors  text-nowrap"
            rotationInterval={3000}
            animatePresenceMode="wait"
            style={{ display: "inline-block", minWidth: `${maxTextLength}ch` }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

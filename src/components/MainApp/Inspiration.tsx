import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const Inspiration = () => {
  const quotes = [
    {
      text: "Discipline is choosing between what you want now and what you want most.",
      author: "Abraham Lincoln",
    },
    {
      text: "Focus is the art of knowing what to ignore.",
      author: "Ancient Wisdom",
    },
    {
      text: "The successful warrior is the average man, with laser-like focus.",
      author: "Bruce Lee",
    },
    {
      text: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
      author: "Alexander Graham Bell",
    },
    {
      text: "Where focus goes, energy flows.",
      author: "Tony Robbins",
    },
    {
      text: "One reason so few of us achieve what we truly want is that we never direct our focus.",
      author: "Tony Robbins",
    },
    {
      text: "Your life is controlled by what you focus on.",
      author: "Tony Robbins",
    },
    {
      text: "It's not the daily increase but daily decrease. Hack away at the unessential.",
      author: "Bruce Lee",
    },
  ];

  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useEffect(() => {
    const randomStartIndex = Math.floor(Math.random() * quotes.length);
    setActiveQuoteIndex(randomStartIndex);

    const interval = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-border rounded-2xl bg-card/20 backdrop-blur-sm h-fit">
      <CardContent className="px-6 flex flex-col gap-6">
        <div className="flex text-sm items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <p>Todays Inspirations</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuoteIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <p className="italic text-sm ">{quotes[activeQuoteIndex].text}</p>
            <span className="text-xs text-muted-foreground">
              — {quotes[activeQuoteIndex].author}
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-1 mt-2">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === activeQuoteIndex
                  ? "bg-accent"
                  : "bg-muted-foreground/15"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Inspiration;

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowRight, Circle, Sparkles } from "lucide-react";
import RotatingText from "../ui/reactbits/RotatingText";
import { AnimatePresence, motion } from "motion/react";
const Hero = () => {
  const rotatingTexts = [
    "Achieve More.",
    "Focus Better.",
    "More Productive.",
    "Work Smarter.",
    "Find Your Flow.",
  ];

  const maxTextLength = useMemo(() => {
    return Math.max(...rotatingTexts.map((t) => t.length));
  }, [rotatingTexts]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-between px-6 pt-20 bg-background">
      <div className="max-w-4xl flex-1 justify-center mx-auto text-center flex flex-col gap-2">
        {/* Simple Circle Icon */}
        <div className="flex justify-center mb-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group hover:scale-110 transition-all duration-500">
            {/* <Circle className="w-8 h-8 text-primary" /> */}
            <img
              src="/web-icon.svg"
              alt="meditation-person"
              className="w-8 h-8 group-hover:scale-125 transition-all duration-300"
            />
          </div>
        </div>

        {/* Heading with Rotating Text */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
            <span className="block mb-2 text-foreground">Stay Focused.</span>
            <RotatingText
              texts={rotatingTexts}
              className="text-primary font-medium"
              rotationInterval={3500}
              animatePresenceMode="wait"
              staggerDuration={0.025}
              initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
              }}
              style={{
                minWidth: `${maxTextLength * 0.55}em`,
                display: "flex",
                justifyContent: "center",
              }}
            />
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          A minimalist focus timer designed to help you stay in flow and boost
          productivity through mindful work sessions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="default"
            className="px-8 py-4 max-md:px-12 max-md:py-5 group"
          >
            Start Focusing
            <ArrowRight className="w-2 h-2 group-hover:translate-x-1 transition-all duration-300 " />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border relative text-accent-foreground hover:border-border px-8 py-3 rounded-lg font-medium transition-all max-md:px-12 max-md:py-5 group"
          >
            Learn More
          </Button>
          {/* <Button
            size="lg"
            className="group relative px-8 py-6 text-lg font-medium overflow-hidden
                       bg-gradient-to-r from-primary to-primary/80 
                       hover:shadow-xl hover:shadow-primary/30 hover:scale-105
                       transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Focusing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Button> */}
        </div>
        <div className="mt-20">
          <Quotes />
        </div>
        {/* Arrow Down indicator */}
      </div>
      <div>
        <div className="mb-8 animate-smooth-bounce">
          <ArrowDown />
        </div>
      </div>
    </section>
  );
};

const Quotes = () => {
  const motivationalQuotes: string[] = [
    "Discipline is choosing between what you want now and what you want most.",
    "Focus is the art of knowing what to ignore.",
    "The successful warrior is the average man, with laser-like focus.",
    "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
    "Where focus goes, energy flows.",
    "One reason so few of us achieve what we truly want is that we never direct our focus.",
    "Your life is controlled by what you focus on.",
    "It's not the daily increase but daily decrease. Hack away at the unessential.",
    "The key to success is to focus our conscious mind on things we desire, not things we fear.",
    "When walking, walk. When eating, eat.",
    "Success demands singleness of purpose.",
    "Energy flows where attention goes—guard it wisely.",
    "Focus on being productive instead of busy.",
    "You can’t depend on your eyes when your imagination is out of focus.",
    "The more you focus, the more clear your path becomes.",
    "Small daily improvements over time lead to stunning results.",
    "Eliminate distractions, and watch your potential unfold.",
    "Clarity about your priorities drives unstoppable momentum.",
    "Mastery is achieved through consistent, focused practice.",
    "Your future is created by what you do today, not tomorrow.",
  ];

  const [currentQuote, setCurrentQuote] = useState<number>(
    Math.floor(Math.random() * motivationalQuotes.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0.2 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center italic text-muted-foreground  md:text-lg"
          >
            {motivationalQuotes[currentQuote]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;

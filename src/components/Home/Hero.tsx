import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import RotatingText from "../ui/reactbits/RotatingText";
import { useMemo } from "react";

interface HeroSectionProps {
  onStartFocusing: () => void;
  onLearnMore: () => void;
}

function Hero({ onStartFocusing, onLearnMore }: HeroSectionProps) {
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
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
      id="home"
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1658317708709-f9ff73f45617?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHJhaW4lMjBjaXR5JTIwYmx1cnxlbnwxfHx8fDE3NjIyOTEzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover opacity-20 blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/30 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* HEADLINE */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
            <motion.span
              className="block mb-2 text-transparent bg-clip-text bg-linear-to-br from-foreground to-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Stay Focused.
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            >
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
            </motion.div>
          </h1>
        </div>
        {/* <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -10 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="text-5xl md:text-6xl lg:text-7xl tracking-tight bg-linear-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent"
        >
          Enter your space of clarity.
        </motion.h1> */}

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-lg md:text-xl max-sm:px-4 mb-12 max-w-2xl mx-auto" // text-muted-foreground
        >
          A minimalist environment designed for deep work and undistracted
          focus.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={onStartFocusing}
            size="lg"
            className="rounded-full px-10 py-7 text-lg bg-accent text-black hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20 group min-w-[200px]"
          >
            Go to App
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={onLearnMore}
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-7 text-lg border-accent/30 hover:text-accent/80 hover:border-accent/60 hover:bg-card/5 transition-all duration-300 min-w-[200px]"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{
          opacity: 1,
          y: 5,
        }}
        transition={{
          delay: 0.6,
          duration: 0.5,
        }}
        className="absolute bottom-6"
        style={{
          animation: "smooth-bounce 2s ease-in-out 1.1s infinite", // starts after motion completes (0.2 + 0.9 = 1.1s)
        }}
      >
        <ArrowDown />
      </motion.div>
    </section>
  );
}
export default Hero;

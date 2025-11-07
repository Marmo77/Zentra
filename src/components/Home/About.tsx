import { AppConstants } from "@/data/constants";
import { ListChecks, Mountain, Timer, Volume2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface Feature {
  icon: any;
  title: string;
  description: string;
}

const About = () => {
  const features: Feature[] = [
    {
      icon: <Timer className="w-6 h-6 text-accent" />,
      title: "Pomodoro Flow",
      description:
        "Structured work sessions to maintain peak focus and prevent burnout.",
    },
    {
      icon: <ListChecks className="w-6 h-6 text-accent" />,
      title: "Deep Work Mode",
      description:
        "Distraction-free timer designed for meaningful, concentrated work.",
    },
    {
      icon: <Volume2 className="w-6 h-6 text-accent" />,
      title: "Calm Soundscapes",
      description:
        "Optional ambient sounds to help you enter and maintain flow state.",
    },
    {
      icon: <Mountain className="w-6 h-6 text-accent" />,
      title: "Flow Design",
      description: "Minimalist interface, to let you focus on what matters.",
    },
  ];

  return (
    <section id="about" className="relative pt-20 pb-14 px-4">
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background via-accent/10 to-background pointer-events-none" />
      <div className="max-w-6xl w-full mx-auto px-6 py-10">
        <div className="flex flex-col gap-3 relative z-10 items-center">
          <h2 className=" text-6xl max-sm:text-4xl font-bold text-center text-secondary-foreground">
            What is{" "}
            <span className="text-clip bg-radial from-accent to-primary bg-clip-text text-transparent">
              {AppConstants.Website.Title}
            </span>
            ?
          </h2>
          <p className="max-w-3xl text-sm max-sm:text-base md:text-base text-center text-muted-foreground">
            A minimalistic focus app for deep work. Calm design, ambient
            backgrounds, and a functionalites to help you achieve flow and be
            less distracted.
          </p>
        </div>
        <div className="grid py-12 grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
        <Quotes />
      </div>
    </section>
  );
};

const Feature = ({ icon, title, description }: Feature) => {
  const Icon = icon;
  return (
    <Card className="h-full bg-card/40 shadow-xl backdrop-blur-sm border-accent/20 hover:border-accent/40 hover:bg-card/20 transition-all duration-300">
      <CardContent className="px-8 py-2">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
              {Icon}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
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

export default About;

import { AppConstants } from "@/data/constants";
import { ListChecks, Mountain, Timer, Volume2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

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
    <section id="about" className="relative py-24 px-4">
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background via-accent/10 to-background pointer-events-none" />
      <div className="max-w-6xl w-full mx-auto px-6 py-20">
        <div className="flex flex-col gap-3 relative z-10 items-center">
          <h2 className=" text-6xl max-sm:text-4xl font-bold text-center text-secondary-foreground">
            What is{" "}
            <span className="text-clip bg-radial from-accent to-primary bg-clip-text text-transparent">
              {AppConstants.Website.Title}
            </span>
            ?
          </h2>
          <p className="max-w-3xl text-lg max-sm:text-base md:text-xl text-center text-foreground">
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
            <h3 className="text-xl mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;

import { Eye, EyeClosed, BarChart2, Target, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface FeatureCardprops {
  icon: any;
  title: string;
  description: string;
}

const Features = () => {
  const features: FeatureCardprops[] = [
    {
      icon: <Eye className="h-10 w-10 mx-1 text-accent" />,
      title: "Minimalist Design",
      description:
        "Distraction-free interface to stay fully focused on what matters most.",
    },
    {
      icon: <EyeClosed className="h-10 w-10 mx-1 text-accent" />,
      title: "Distraction Free",
      description:
        "Set session lengths that fit your workflow, from 25 to 60 minutes.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 mx-1 text-accent" />,
      title: "Daily Stats",
      description:
        "Track your focus streaks and progress over time with detailed statistics.",
    },
    {
      icon: <Target className="h-10 w-10 mx-1 text-accent" />,
      title: "Session Goals",
      description:
        "Set daily focus goals and build consistent productive habits.",
    },
    {
      icon: <Zap className="h-10 w-10 mx-1 text-accent" />,
      title: "Instant Start",
      description:
        "One click to begin. No accounts, no setup, just pure focus.",
    },
    {
      icon: <Shield className="h-10 w-10 mx-1 text-accent" />,
      title: "Privacy First",
      description:
        "All your data stays on your device. We respect your privacy.",
    },
  ];
  return (
    <section className="relative py-12" id="features">
      <div className="absolute h-full w-full bg-primary/10 bg-linear-to-b from-background/10 to-muted pointer-events-none z-0 blur-3xl"></div>
      <div className="flex flex-col max-w-7xl mx-auto gap-3 relative py-14 z-10 items-center">
        <div className="flex flex-col gap-3 relative z-10 items-center mx-8">
          <h2 className="text-5xl max-sm:text-4xl font-bold text-center text-secondary-foreground">
            Everythink you need to{" "}
            <span className="text-clip text-transparent bg-linear-to-br from-primary to-primary/30 bg-clip-text">
              focus.
            </span>
          </h2>
          <p className="max-w-3xl text-sm max-sm:text-base md:text-base text-center  text-muted-foreground ">
            Simple, powerful features designed to help you achieve deep work and
            maintain focus.
          </p>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8 mx-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: FeatureCardprops) => {
  const Icon = icon;
  return (
    <Card className="max-w-md py-6 px-4 rounded-2xl bg-transparent border-border/40 border hover:border-accent transition-all duration-500">
      <CardContent className="flex flex-col gap-3">
        <div className="h-10 w-10 text-accent">{Icon}</div>
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm pr-8 max-w-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Features;

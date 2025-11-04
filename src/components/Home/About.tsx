import { AppConstants } from "@/data/constants";

const About = () => {
  const features = [
    {
      title: "Pomodoro Flow",
      description:
        "Structured work sessions to maintain peak focus and prevent burnout.",
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4">
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background via-accent/10 to-background pointer-events-none" />
      <div className="z-10 max-w-6xl w-full mx-auto px-6 py-20">
        <div className="flex flex-col gap-3 items-center">
          <h2 className="text-5xl font-bold text-secondary-foreground">
            What is{" "}
            <span className="text-clip bg-radial from-accent to-primary bg-clip-text text-transparent">
              {AppConstants.Website.Title}
            </span>
            ?
          </h2>
          <p className="max-w-3xl text-lg text-center text-foreground">
            A minimalistic focus app for deep work. Calm design, ambient
            backgrounds, and a functionalites to help you achieve flow and be
            less distracted.
          </p>
        </div>
        <div></div>
      </div>
    </section>
  );
};

const Feature = () => {
  return <div></div>;
};

export default About;

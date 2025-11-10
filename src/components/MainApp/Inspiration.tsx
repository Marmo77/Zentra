import React from "react";
import { Card, CardContent } from "../ui/card";
import { Sparkles } from "lucide-react";

const Inspiration = () => {
  const inspirationalQuotes = [
    "Never give up, never give in, never give out.",
    "It's not over until I say it's over.",
    "Do not fear failure, fear not trying.",
    "Dont be afraid of failure, be afraid of not trying.",
  ];

  return (
    <Card className="border-border rounded-2xl bg-card/20 backdrop-blur-sm h-fit">
      <CardContent className="px-6 flex flex-col gap-6">
        <div className="flex text-sm items-center gap-2 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <h3 className="">Todays Inspirations</h3>
        </div>
        {inspirationalQuotes.map((quote, index) => (
          <p className="italic text-sm" key={index}>
            {quote}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default Inspiration;

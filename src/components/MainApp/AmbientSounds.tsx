import { CloudRainWind, Coffee, Moon, Trees, Waves } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "motion/react";

type Environment = "rain" | "forest" | "night" | "cafe" | "ocean" | null;

type AmbientSoundsElementsProps = {
  id: Environment;
  icon: React.ElementType;
  label: string;
  color: string;
};
function AmbientSounds() {
  const [selectedSound, setSelectedSound] = useState<Environment>(null);

  const AmbietSoundsElements: AmbientSoundsElementsProps[] = [
    { id: "rain", icon: CloudRainWind, label: "Rain", color: "#7dd3fc" },
    { id: "forest", icon: Trees, label: "Forest", color: "#4ade80" },
    { id: "night", icon: Moon, label: "Night", color: "#a78bfa" },
    { id: "cafe", icon: Coffee, label: "Café", color: "#fb923c" },
    { id: "ocean", icon: Waves, label: "Ocean", color: "#38bdf8" },
  ];

  const ToggleEnvironment = (elem: Environment) => {
    if (selectedSound === elem) {
      setSelectedSound(null);
    } else {
      setSelectedSound(elem);
    }
  };

  return (
    <div className="flex flex-col md:fixed bottom-0 left-0 z-10 py-2 mt-12 w-full bg-card/80 border-border/50 border-t border-x-0 border-b-0">
      <div className="flex mx-auto w-full max-w-6xl justify-between gap-4 px-6 py-4">
        <div className="w-full flex-4 flex gap-4 items-center">
          <h1 className="text-base font-light">Ambient Sounds</h1>
          <div className="flex gap-4 ">
            {AmbietSoundsElements.map((elem) => {
              const Icon = elem.icon;
              const isActive = selectedSound === elem.id;
              return (
                <motion.div key={elem.id} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`relative rounded-full px-7 py-4 transition-all ${
                      isActive
                        ? "bg-primary/75 text-primary-foreground"
                        : "hover:border-border hover:bg-foreground/5"
                    }`}
                    size={"ambient"}
                    variant={"ambient"}
                    onClick={() => ToggleEnvironment(elem.id)}
                  >
                    <Icon className="w-5 h-5 sm:mr-2" />
                    <h4 className="text-sm font-medium">{elem.label}</h4>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex-1"></div>
      </div>
    </div>
  );
}

export default AmbientSounds;

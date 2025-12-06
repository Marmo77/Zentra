import {
  CloudRainWind,
  Coffee,
  Moon,
  Trees,
  Volume2,
  VolumeX,
  Waves,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { Slider } from "../ui/slider";
import { toast } from "sonner";
import type { AmbinetSounds, Environment } from "@/types/types";

type AmbientSoundsElementsProps = {
  id: Environment;
  icon: React.ElementType;
  label: string;
  color: string;
};

function AmbientSounds({
  ambientSounds,
  setAmbientSounds,
}: {
  ambientSounds: AmbinetSounds;
  setAmbientSounds: React.Dispatch<React.SetStateAction<AmbinetSounds>>;
}) {
  const AmbientSoundsElements: AmbientSoundsElementsProps[] = [
    { id: "rain", icon: CloudRainWind, label: "Rain", color: "#7dd3fc" },
    { id: "forest", icon: Trees, label: "Forest", color: "#4ade80" },
    { id: "night", icon: Moon, label: "Night", color: "#a78bfa" },
    { id: "cafe", icon: Coffee, label: "Café", color: "#fb923c" },
    { id: "ocean", icon: Waves, label: "Ocean", color: "#38bdf8" },
  ];

  const toggleEnvironment = (elem: Environment) => {
    if (ambientSounds.environment === elem) {
      setAmbientSounds({
        ...ambientSounds,
        environment: null,
        isMuted: true,
      });
    } else {
      setAmbientSounds({
        ...ambientSounds,
        environment: elem,
        isMuted: false,
      });
    }
  };

  const toggleMuted = () => {
    setAmbientSounds({
      ...ambientSounds,
      isMuted: !ambientSounds.isMuted,
    });
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setAmbientSounds({
      ...ambientSounds,
      volume: newVolume[0],
    });
  };

  const checkMuted = () => {
    if (!ambientSounds.environment) {
      toast.info("Please select sound", {
        richColors: true,
        duration: 3000,
        dismissible: true,
      });
    } else if (ambientSounds.isMuted) {
      toast.error("Please unmute!", {
        richColors: true,
        duration: 3000,
        dismissible: true,
      });
    }
  };

  return (
    <div className="flex flex-col md:fixed bottom-0 left-0 z-10 py-2 mt-12 w-full bg-card/80 border-border/50 border-t border-x-0 border-b-0">
      <div className="flex mx-auto items-center w-full max-w-6xl justify-between gap-4 px-6 py-4">
        {/* Ambient Sounds */}
        <div className="w-full flex-4 flex gap-4 items-center">
          <h1 className="text-base font-light">Ambient Sounds</h1>
          <div className="flex gap-4">
            {AmbientSoundsElements.map((elem) => {
              const Icon = elem.icon;
              const isActive = ambientSounds.environment === elem.id;
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
                    onClick={() => toggleEnvironment(elem.id)}
                  >
                    <Icon className="w-5 h-5 sm:mr-2" />
                    <h4 className="text-sm font-medium">{elem.label}</h4>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Volume settings */}
        <div className="flex items-center gap-3">
          <div
            className="hidden md:flex items-center gap-2 w-32 cursor-pointer"
            onClick={checkMuted}
          >
            <Slider
              value={[ambientSounds.volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              disabled={ambientSounds.isMuted || !ambientSounds.environment}
              className="flex-1"
            />
          </div>
          <Button
            variant="ambient"
            size="icon"
            onClick={toggleMuted}
            disabled={!ambientSounds.environment}
            className="rounded-full"
          >
            {ambientSounds.isMuted || !ambientSounds.environment ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AmbientSounds;

import { memo, useEffect } from "react";
import { Button } from "../ui/button";
import { timeOptions } from "@/types/focus-app";
import { motion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { UserSettings } from "@/types/types";

const Fucus = ({
  time,
  isRunning,
  setTime,
  setIsRunning,
  userSettings,
}: {
  time: number;
  isRunning: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  userSettings: UserSettings;
}) => {
  const lastSessionLength = localStorage.getItem("sessionLength") || "25";
  useEffect(() => {
    const savedTime = localStorage.getItem("time");
    if (savedTime && userSettings.saveTime) {
      setTime(Number(savedTime));
    } else {
      setTime(Number(lastSessionLength) * 60);
    }
  }, []);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(Number(lastSessionLength) * 60);
    if (userSettings.saveTime) {
      localStorage.setItem("time", time.toString());
    }
  };

  useEffect(() => {
    if (time === 0 && isRunning) {
      setIsRunning(false);
      alert("Congratulations!");
      setTime(Number(lastSessionLength) * 60);
    }
  }, [time, isRunning, setIsRunning, setTime, lastSessionLength]);

  const handleSessionLengthSelect = (value: string) => {
    setIsRunning(false);
    setTime(Number(value) * 60);
    localStorage.setItem("sessionLength", value);
  };

  return (
    <div className="text-center flex flex-col gap-4 justify-center items-center space-y-8 py-8">
      <div className="">
        <Timer time={time} isRunning={isRunning} />
      </div>
      <div className="flex gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gap-4 flex"
        >
          {!isRunning ? (
            <Button
              onClick={handleStart}
              variant={"focusTime"}
              size={"lg"}
              className="rounded-3xl px-4"
            >
              <Play className="mr-1 h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button
              onClick={handleStop}
              variant={"outline"}
              size={"lg"}
              className="rounded-3xl py-4"
            >
              <Pause className="mr-1 h-4 w-4" />
              Pause
            </Button>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleReset}
            variant={"ghost"}
            size={"lg"}
            className="rounded-full px-8"
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </Button>
        </motion.div>
      </div>
      <div>
        <h2>Choose Session length:</h2>
        <div className="gap-3">
          <SessionLength
            lastSessionLength={lastSessionLength.toString()}
            handleSession={handleSessionLengthSelect}
          />
        </div>
      </div>
    </div>
  );
};

const Timer = memo(
  ({ time, isRunning }: { time: number; isRunning: boolean }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
    const formatedTime = `${minutes}:${seconds}`;

    return (
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          key={time}
          initial={{ scale: 1 }}
          animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
          className="text-8xl sm:text-9xl text-center text-card-foreground tracking-tight font-semibold"
          style={{
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {formatedTime}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base text-center text-muted-foreground mt-4"
        >
          {isRunning ? "Stay focused." : "Ready to focus?"}
        </motion.p>
      </div>
    );
  }
);

const SessionLength = memo(
  ({
    lastSessionLength,
    handleSession,
  }: {
    lastSessionLength: string;
    handleSession: (value: string) => void;
  }) => {
    const sessionLength = timeOptions;

    return (
      <div className="grid grid-cols-3 gap-3">
        {sessionLength.map((option) => (
          <Button
            variant={
              option.value === lastSessionLength ? "focusTime" : "default"
            }
            key={option.value}
            className="hover:underline cursor-pointer"
            onClick={() => handleSession(option.value)}
          >
            <p>{option.label}</p>
          </Button>
        ))}
      </div>
    );
  }
);

export default Fucus;

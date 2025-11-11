import { memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { timeOptions } from "@/types/focus-app";
import { motion } from "motion/react";

const Fucus = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const lastSessionLength = localStorage.getItem("sessionLength") || "25";

  useEffect(() => {
    setTime(Number(lastSessionLength) * 60);
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
    // localStorage.setItem("sessionLength", "25");
  };

  useEffect(() => {
    if (time === 0) {
      handleReset();
      alert("Congratulations!");
    }
  }, [time]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

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
      {/* <div className="flex gap-4">
        <Button onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button variant={"outline"} onClick={handleStop} disabled={!isRunning}>
          Pause
        </Button>
        <Button variant={"destructive"} onClick={handleReset}>
          Reset
        </Button>
      </div> */}
      <div>
        <h2>Choose Session length:</h2>
        <div className="gap-3">
          <SessionLength
            lastSessionLength={lastSessionLength}
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
          className="text-8xl sm:text-9xl text-center text-card-foreground tracking-tight"
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
          className="text-base text-center text-card-foreground mt-4"
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

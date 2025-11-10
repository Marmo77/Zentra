import { memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { timeOptions } from "@/types/focus-app";

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
        <Timer time={time} />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button variant={"outline"} onClick={handleStop} disabled={!isRunning}>
          Pause
        </Button>
        <Button variant={"destructive"} onClick={handleReset}>
          Reset
        </Button>
      </div>
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

const Timer = memo(({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
  const formatedTime = `${minutes}:${seconds}`;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-8xl sm:text-9xl text-center text-card- font-bold">
        {formatedTime}
      </p>
    </div>
  );
});

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

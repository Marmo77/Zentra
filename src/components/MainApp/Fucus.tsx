import { memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { timeOptions, timeOptionsData } from "@/types/focus-app";
import { motion } from "motion/react";
import { Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import type { UserSettings } from "@/types/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

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

  const handleSessionLengthSelectCustom = (value: string) => {
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
              variant={"default"}
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
        <p className="text-muted-foreground font-semibold text-sm">
          Session length
        </p>
        <div className="flex flex-col gap-3">
          <SessionLength
            lastSessionLength={lastSessionLength.toString()}
            handleSession={handleSessionLengthSelect}
          />
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="rounded-xl self-center px-8 hover:bg-primary/80">
                Custom
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerFocusTime
                sessionLength={Number(lastSessionLength)}
                handleSession={handleSessionLengthSelectCustom}
              />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

const DrawerFocusTime = memo(
  ({
    sessionLength,
    handleSession,
  }: {
    sessionLength: number;
    handleSession: (value: string) => void;
  }) => {
    const [newSessionLength, setNewSessionLength] =
      useState<number>(sessionLength);

    const onMinusClick = () => {
      if (newSessionLength > timeOptionsData[0].value) {
        setNewSessionLength(newSessionLength - 5);
      }
    };

    const onPlusClick = () => {
      if (
        newSessionLength < timeOptionsData[timeOptionsData.length - 1].value
      ) {
        setNewSessionLength(newSessionLength + 5);
      }
    };

    const onCustomClick = () => {
      handleSession(newSessionLength.toString());
    };

    return (
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Focus Time</DrawerTitle>
          <DrawerDescription>Set your custom session length.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={onMinusClick}
              className="h-10 w-10 shrink-0 rounded-full"
              disabled={newSessionLength === timeOptionsData[0].value}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <div className="flex-1 text-center">
              <h2 className="text-7xl font-bold -mb-2">{newSessionLength}</h2>
              <span className="text-muted-foreground text-[0.7rem] uppercase">
                Minutes
              </span>
            </div>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={onPlusClick}
              className="h-10 w-10 shrink-0 rounded-full"
              disabled={
                newSessionLength ===
                timeOptionsData[timeOptionsData.length - 1].value
              }
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-3 h-[120px] border-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeOptionsData}>
                <Bar
                  dataKey="value"
                  onClick={(e) => {
                    const val = Array.isArray(e.value) ? e.value[0] : e.value;
                    setNewSessionLength(val);
                  }}
                  className="bg-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <DrawerFooter className="flex flex-col gap-2">
            <DrawerClose asChild>
              <Button
                variant={"default"}
                size={"lg"}
                className="rounded-xl hover:bg-primary/80"
                onClick={onCustomClick}
              >
                Save
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                variant={"outline"}
                size={"lg"}
                className="rounded-xl hover:bg-primary/80"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </div>
    );
  }
);

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
      <div>
        <div className="flex bg-card mt-2 rounded-2xl">
          {sessionLength.map((option) => (
            <Button
              variant={"focusTime"}
              key={option.value}
              className={`hover:bg-primary/80 cursor-pointer first:rounded-l-2xl last:rounded-r-2xl py-2 px-6 ${
                option.value.toString() === lastSessionLength
                  ? "bg-primary text-card"
                  : ""
              }`}
              onClick={() => handleSession(option.value.toString())}
            >
              <p>{option.label}</p>
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

export default Fucus;

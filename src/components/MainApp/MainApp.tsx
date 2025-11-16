import { useEffect, useState } from "react";
import Fucus from "./Fucus";
import Inspiration from "./Inspiration";
import FocusNav from "./Navigation";
import Tasks from "./Tasks";
import { motion } from "motion/react";
import type { TaskProps, UserSettings } from "@/types/types";

const MainApp = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [tasks, setTasks] = useState<TaskProps[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  const [userSettings, setUserSettings] = useState<UserSettings>({
    saveToLocalStorage: true,
    saveTime: true,
  });

  console.log(darkMode);

  useEffect(() => {
    if (userSettings.saveToLocalStorage) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks, userSettings.saveToLocalStorage]);

  // FOCUS TIME AND IS RUNNING
  const savedTime = localStorage.getItem("time");
  const [time, setTime] = useState(savedTime ? Number(savedTime) : 25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    if (userSettings.saveTime) {
      localStorage.setItem("time", time.toString());
    } else {
      localStorage.removeItem("time");
    }
  }, [time, userSettings.saveTime]);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* ANIMATED BACKGROUND radial gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] inset-0 overflow-hidden pointer-events-none"
      />
      <FocusNav darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="max-w-7xl mx-auto px-6">
        {/* DESKTOP */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr_320px] gap-8 items-start">
          <div className="sticky top-24">
            <Tasks tasks={tasks} setTasks={setTasks} />
          </div>
          <Fucus
            time={time}
            isRunning={isRunning}
            setTime={setTime}
            setIsRunning={setIsRunning}
            userSettings={userSettings}
          />
          <div className="sticky top-24">
            <Inspiration />
          </div>
        </div>
        {/* MOBILE */}
        <div className="lg:hidden flex flex-col justify-center space-y-6 p-6">
          <Fucus
            time={time}
            isRunning={isRunning}
            setTime={setTime}
            setIsRunning={setIsRunning}
            userSettings={userSettings}
          />
          <Tasks tasks={tasks} setTasks={setTasks} />
          <Inspiration />
        </div>
      </div>
    </section>
  );
};

export default MainApp;

import { useEffect, useState } from "react";
import Fucus from "./Fucus";
import Inspiration from "./Inspiration";
import FocusNav from "./Navigation";
import Tasks from "./Tasks";
import { motion } from "motion/react";
import {
  type AmbinetSounds,
  type TaskProps,
  type UserSettings,
} from "@/types/types";
import AmbientSounds from "./AmbientSounds";

// Load UserSettings from localStorage on initialization
const getInitialSettings = (): UserSettings => {
  const savedSettings = localStorage.getItem("userSettings");
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (error) {
      console.error("Error parsing saved settings:", error);
    }
  }
  // Return defaults if nothing saved
  return {
    saveToLocalStorage: true,
    saveTime: true,
    saveAmbinetSounds: false,
  };
};

// Load AmbientSounds from localStorage on initialization
const getInitialAmbientSounds = (): AmbinetSounds => {
  const saved = localStorage.getItem("fr-ambient_sounds");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing ambient sounds:", error);
    }
  }
  // Return defaults if nothing saved
  return {
    environment: null,
    isMuted: true,
    volume: 50,
  };
};

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

  const [userSettings, setUserSettings] =
    useState<UserSettings>(getInitialSettings);

  // Initialize ambientSounds
  const [ambientSounds, setAmbientSounds] = useState<AmbinetSounds>(
    getInitialAmbientSounds
  );

  // Save userSettings to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }, [userSettings]);

  // Save ambient sounds ONLY when saveAmbinetSounds is enabled
  useEffect(() => {
    if (userSettings.saveAmbinetSounds) {
      localStorage.setItem("fr-ambient_sounds", JSON.stringify(ambientSounds));
    } else {
      localStorage.removeItem("fr-ambient_sounds");
    }
  }, [ambientSounds, userSettings.saveAmbinetSounds]);

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

  // Saving to localStorage based on settings
  useEffect(() => {
    if (userSettings.saveToLocalStorage) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks, userSettings.saveToLocalStorage]);

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
      <FocusNav
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userSettings={userSettings}
        setUserSettings={setUserSettings}
      />
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
        <div className="lg:hidden flex flex-col justify-center space-y-6 pb-12 p-6">
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
      <AmbientSounds
        ambientSounds={ambientSounds}
        setAmbientSounds={setAmbientSounds}
      />
    </section>
  );
};

export default MainApp;

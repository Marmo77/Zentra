import { useEffect, useState } from "react";
import Fucus from "./Fucus";
import Inspiration from "./Inspiration";
import FocusNav from "./Navigation";
import Tasks from "./Tasks";
import { motion } from "motion/react";
import type { TaskProps, UserSettings } from "@/types/types";

const MainApp = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  const [userSettings, setUserSettings] = useState<UserSettings>({
    saveToLocalStorage: true,
  });

  useEffect(() => {
    if (userSettings.saveToLocalStorage) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks, userSettings.saveToLocalStorage]);

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* ANIMATED BACKGROUND radial gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
        />
      </div>
      <FocusNav />
      <div className="max-w-7xl mx-auto">
        {/* DESKTOP */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr_320px] gap-8 items-start">
          <div className="sticky top-24">
            <Tasks tasks={tasks} setTasks={setTasks} />
          </div>
          <Fucus />
          <div className="sticky top-24">
            <Inspiration />
          </div>
        </div>
        {/* MOBILE */}
        <div className="lg:hidden flex flex-col justify-center space-y-6 p-6">
          <Fucus />
          <Tasks tasks={tasks} setTasks={setTasks} />
          <Inspiration />
        </div>
      </div>
    </section>
  );
};

export default MainApp;

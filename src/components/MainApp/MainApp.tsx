import Fucus from "./Fucus";
import Inspiration from "./Inspiration";
import FocusNav from "./Navigation";
import Tasks from "./Tasks";
import { motion } from "motion/react";

const MainApp = () => {
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
      <div className="max-w-6xl mx-auto">
        {/* <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 px-6"> */}
        <div className="lg:grid lg:grid-cols-[320px_1fr_320px] lg:px-2 py-4 px-12 gap-8 items-start">
          <Tasks />
          <Fucus />
          <Inspiration />
        </div>
      </div>
    </section>
  );
};

export default MainApp;

import { AppConstants } from "@/data/constants";
import { Settings, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (section: string) => {
    if (section.startsWith("#")) {
      navigate("/", { state: { scrollTo: section } });
    }
  };

  return (
    <section className="p-6">
      <div className="flex gap-3 items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavigate("#home")}
        >
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Timer className="h-4 w-4 text-accent" />
          </div>
          <p className="text-xl font-medium tracking-tight cursor-pointer text-transparent bg-clip-text bg-linear-to-br from-accent to-primary group-hover:to-accent group-hover:from-primary transition-colors duration-300 ease-in-out">
            {AppConstants.Website.Title}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {formattedTime}
          </span>
          <div className="w-7 h-7 hover:bg-muted-foreground/10 duration-300 transition-colors flex items-center justify-center rounded-full cursor-pointer">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navigation;

import { AppConstants } from "@/data/constants";
import { Settings, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SettingsFocus from "./SettingsFocus";
import type { UserSettings } from "@/types/types";

const Navigation = ({
  darkMode,
  setDarkMode,
  userSettings,
  setUserSettings,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  userSettings: UserSettings;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}) => {
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
    <section className="py-6 px-10">
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
          <Sheet>
            <SheetTrigger asChild>
              <div className="w-8 h-8 hover:bg-muted-foreground/10 duration-300 transition-colors flex items-center justify-center rounded-full cursor-pointer">
                <Settings className="h-4 w-4 text-muted-foreground" />
              </div>
            </SheetTrigger>
            <SheetContent>
              <SettingsFocus
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default Navigation;

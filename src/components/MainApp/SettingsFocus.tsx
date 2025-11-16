import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { AppConstants } from "@/data/constants";
import { ClipboardCheck, Clock10, Moon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import type { UserSettings } from "@/types/types";
import { useEffect } from "react";

const SettingsFocus = ({
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
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }, [userSettings.saveToLocalStorage, userSettings.saveTime]);

  const handleLocalStorageToggle = () => {
    setUserSettings({
      ...userSettings,
      saveToLocalStorage: !userSettings.saveToLocalStorage,
    });
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  };
  const handleSaveTimeToggle = () => {
    setUserSettings({
      ...userSettings,
      saveTime: !userSettings.saveTime,
    });
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  };

  return (
    <SheetHeader>
      <SheetTitle>
        <h1 className="text-xl font-light">Settings</h1>
        <SheetDescription>
          <p className="text-sm font-medium text-muted-foreground">
            Customize your {AppConstants.Website.Title} experience
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            Set up for your own comfort
          </p>
        </SheetDescription>
      </SheetTitle>
      <div className="py-4 px-1">
        {/* APPEARANCE */}
        <Appearance darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* Data Storage */}
        <DataStorage
          userSettings={userSettings}
          setUserSettings={setUserSettings}
          handleLocalStorageToggle={handleLocalStorageToggle}
          handleSaveTimeToggle={handleSaveTimeToggle}
        />
        {/* Navigation */}
        <div className="flex flex-col">
          <h3 className="text-lg font-light">Navigation</h3>
        </div>
      </div>
    </SheetHeader>
  );
};

const Appearance = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-light">Appearance</h3>
      {/* DARK MODE */}
      <div className="flex justify-between items-center py-3 px-1">
        <Label htmlFor="dark-mode" className="flex items-center gap-4">
          <Moon />
          <div className="flex flex-col">
            <h4 className="text-sm font-medium">Dark Mode</h4>
            <p className="text-xs text-muted-foreground">
              Dark mode is {darkMode ? "enabled" : "disabled"}
            </p>
          </div>
        </Label>
        <div>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

const DataStorage = ({
  userSettings,
  setUserSettings,
  handleLocalStorageToggle,
  handleSaveTimeToggle,
}: {
  userSettings: UserSettings;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  handleLocalStorageToggle: () => void;
  handleSaveTimeToggle: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-light">Data Storage</h3>
      <p className="text-xs px-1 text-muted-foreground">
        Data are stored in your browser. Even if you refresh your page or close
        your browser, your data will be preserved.
      </p>
      {/* Save Tasks */}
      <div className="flex justify-between items-center py-3 px-1">
        <Label htmlFor="save-tasks" className="flex items-center gap-4">
          <ClipboardCheck />
          <div className="flex flex-col">
            <h4 className="text-sm font-medium">Save Tasks</h4>
            <p className="text-xs text-muted-foreground">
              Saving tasks to local storage is{" "}
              {userSettings.saveToLocalStorage ? "enabled" : "disabled"}
            </p>
          </div>
        </Label>
        <div>
          <Switch
            id="save-tasks"
            checked={userSettings.saveToLocalStorage}
            onCheckedChange={handleLocalStorageToggle}
          />
        </div>
      </div>
      {/* Save Time */}
      <div className="flex justify-between items-center py-3 px-1">
        <Label htmlFor="save-time" className="flex items-center gap-4">
          <Clock10 />
          <div className="flex flex-col">
            <h4 className="text-sm font-medium">Save Time</h4>
            <p className="text-xs text-muted-foreground">
              Saving time to local storage is{" "}
              {userSettings.saveTime ? "enabled" : "disabled"}
            </p>
          </div>
        </Label>
        <div>
          <Switch
            id="save-time"
            checked={userSettings.saveTime}
            onCheckedChange={handleSaveTimeToggle}
          />
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  return <div></div>;
};

export default SettingsFocus;

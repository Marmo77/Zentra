import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { AppConstants } from "@/data/constants";
import { Moon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const SettingsFocus = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
      <div className="py-4">
        {/* APPEARANCE */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Appearance</h3>
          {/* DARK MODE */}
          <div className="flex justify-between items-center py-3">
            <Label htmlFor="dark-mode" className="flex items-center gap-4">
              <Moon />
              <div className="flex flex-col">
                <h4 className="text-sm font-medium">Dark Mode</h4>
                <p className="text-sm text-muted-foreground">
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
        {/* Data Storage */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Data Storage</h3>
          {/* Save to local storage */}
          <div className="flex justify-between items-center py-3">
            <Label
              htmlFor="save-to-local-storage"
              className="flex items-center gap-4"
            >
              <Moon />
              <div className="flex flex-col">
                <h4 className="text-sm font-medium">Save to local storage</h4>
                <p className="text-sm text-muted-foreground">
                  Save to local storage is enabled
                </p>
              </div>
            </Label>
            <div>
              <Switch id="save-to-local-storage" />
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Navigation</h3>
        </div>
      </div>
    </SheetHeader>
  );
};

export default SettingsFocus;

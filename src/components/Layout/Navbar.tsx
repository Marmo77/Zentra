import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
import { AppConstants } from "@/data/constants";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Navbar = ({ isDarkMode, onThemeToggle }: NavbarProps) => {
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    if (section.startsWith("#")) {
      navigate("/", { state: { scrollTo: section } });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40 shadow-xs">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <p
            onClick={() => handleNavigate("#home")}
            className="text-xl font-medium tracking-tight cursor-pointer text-transparent bg-clip-text bg-linear-to-br from-accent to-primary hover:to-accent hover:from-primary transition-colors duration-300 ease-in-out"
          >
            {AppConstants.Website.Title}
          </p>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {AppConstants.Navigation.navbar.map((item) => (
              <a
                key={item.label}
                className="text-sm font-light text-muted-foreground cursor-pointer hover:text-foreground duration-300 ease-in-out transition-colors"
                onClick={() => handleNavigate(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="rounded-full w-10 h-10"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

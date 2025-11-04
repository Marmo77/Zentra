import React from "react";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
import { AppConstants } from "@/data/constants";

interface NavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Navbar = ({ isDarkMode, onThemeToggle }: NavbarProps) => {
  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            onClick={() => handleNavigate("home")}
            className="text-xl font-medium tracking-tight cursor-pointer text-transparent bg-clip-text bg-linear-to-br from-accent to-primary hover:to-accent hover:from-primary transition-colors duration-300 ease-in-out"
          >
            {AppConstants.Website.Title}
          </a>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                onClick={() => handleNavigate(item.href.replace("#", ""))}
                className="text-sm font-light text-muted-foreground cursor-pointer hover:text-foreground duration-300 ease-in-out transition-colors"
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

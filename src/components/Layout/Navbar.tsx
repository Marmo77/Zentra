import React from "react";
import { Button } from "../ui/button";
import { Sun, Moon } from "lucide-react";
import { AppConstants } from "@/data/constants";

interface NavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Navbar = ({ isDarkMode, onThemeToggle }: NavbarProps) => {
  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl font-medium tracking-tight text-foreground hover:text-primary transition-colors"
          >
            {AppConstants.Website.Title}
          </a>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
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

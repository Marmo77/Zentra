import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({
  isDarkMode,
  onThemeToggle,
}: {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

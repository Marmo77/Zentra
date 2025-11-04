import { useState, useEffect } from "react";
import Home from "./components/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("isDarkMode");
    // If no value in localStorage, default to true (dark mode)
    return stored === null ? true : stored === "true";
  });

  useEffect(() => {
    // Apply the dark class based on the state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage if it's the first visit
    if (localStorage.getItem("isDarkMode") === null) {
      localStorage.setItem("isDarkMode", "true");
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode.toString());
  };

  return (
    <>
      <Routes>
        <Route
          element={
            <Layout isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
          }
        >
          <Route path="/" index element={<Home />} />
          {/* <Route path="/app" element={}/> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

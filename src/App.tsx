import { useState, useEffect } from "react";
import Home from "./components/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage on mount
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

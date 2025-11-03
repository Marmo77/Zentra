import { useState } from "react";
import MainPage from "./components/MainPage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound";

function App() {
  const welcoms = ["Zentra", "Focus App", "Pomodoro Timer"];
  const [welcome, setWelcome] = useState(welcoms[0]);

  setTimeout(() => {
    let index = welcoms.indexOf(welcome);
    setWelcome(welcoms[index + 1]);
    if (index === welcoms.length - 1) {
      setWelcome(welcoms[0]);
    }
  }, 2000);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<MainPage welcome={welcome} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

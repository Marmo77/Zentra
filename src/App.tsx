import { useState } from "react";
import MainPage from "./components/MainPage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

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
        <Route path="/" index element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;

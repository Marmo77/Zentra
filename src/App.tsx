import { useState } from "react";
import { Button } from "./components/ui/button";
import MainPage from "./components/MainPage";

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
      <div className="flex flex-col items-center justify-center h-screen">
        <MainPage />
      </div>
    </>
  );
}

export default App;

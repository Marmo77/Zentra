import { useState } from "react";
import { Button } from "./components/ui/button";

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
        <h1 className="text-center text-xl">
          Welcome to <span className="text-primary">{welcome}</span>
        </h1>
        <Button
          variant={"outline"}
          className="hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          onClick={() => {
            alert("Welcome to " + welcome);
          }}
        >
          Welcome!
        </Button>
      </div>
    </>
  );
}

export default App;

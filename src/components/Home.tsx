import About from "./Home/About";
import Features from "./Home/Features";
import Hero from "./Home/Hero";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const onStartFocusing = () => {
    navigate("/app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onLearnMore = () => {
    return;
  };

  return (
    <section className="flex-1 flex flex-col">
      <Hero onStartFocusing={onStartFocusing} onLearnMore={onLearnMore} />
      <About />
      <Features />
    </section>
  );
};

export default Home;

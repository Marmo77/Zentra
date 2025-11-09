import About from "./Home/About";
import Features from "./Home/Features";
import Hero from "./Home/Hero";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onStartFocusing = () => {
    navigate("/app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.querySelector(location.state.scrollTo);

      // Delay to ensure component is mounted
      setTimeout(() => {
        element?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [location]);

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

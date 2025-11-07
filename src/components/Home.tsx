import About from "./Home/About";
import Features from "./Home/Features";
import Hero from "./Home/Hero";

const Home = () => {
  return (
    <section className="flex-1 flex flex-col">
      <Hero onStartFocusing={() => {}} onLearnMore={() => {}} />
      <About />
      <Features />
    </section>
  );
};

export default Home;

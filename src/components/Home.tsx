import About from "./Home/About";
import Hero from "./Home/Hero";

const Home = () => {
  return (
    <section className="flex-1 flex flex-col">
      <Hero onStartFocusing={() => {}} onLearnMore={() => {}} />
      <About />
    </section>
  );
};

export default Home;

import Hero from "./Home/Hero";

const Home = ({ welcome }: { welcome: string }) => {
  return (
    <section className="max-w-6xl gap-8 mx-auto flex flex-col justify-center items-center">
      <Hero />
    </section>
  );
};

export default Home;

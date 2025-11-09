import Fucus from "./Fucus";
import Inspiration from "./Inspiration";
import FocusNav from "./Navigation";
import Tasks from "./Tasks";

const MainApp = () => {
  return (
    <section>
      <FocusNav />
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 grid-cols-1 gap-4 px-6">
        <Tasks />
        <Fucus />
        <Inspiration />
      </div>
    </section>
  );
};

export default MainApp;

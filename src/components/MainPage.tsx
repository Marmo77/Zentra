const MainPage = ({ welcome }: { welcome: string }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <h1 className="text-4xl font-bold text-accent-foreground">{welcome}</h1>
    </div>
  );
};

export default MainPage;

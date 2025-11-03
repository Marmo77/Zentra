import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <Link to={"/"}>
        <Button variant={"default"}>Get Back</Button>
      </Link>
    </div>
  );
};

export default NotFound;

import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex justify-center">
      <div className="flex h-16 w-6xl items-center justify-between max-lg:px-6 z-50">
        <h1 className="text-4xl font-bold">Zentra</h1>
      </div>
    </div>
  );
};

export default Navbar;

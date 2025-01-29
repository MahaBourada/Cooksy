import React from "react";
import HomeHeader from "../components/Headers/HomeHeader";

function HomePage() {
  return (
    <>
      <HomeHeader />
      <main className="flex-grow flex flex-col items-center justify-center h-screen relative p-10 pt-16">
        <div>
          <h1 className="absolute right-[28%] top-[15%] text-5xl text-center font-bold">
            Créez, savourez, <br />
            partagez!
          </h1>
          <div className="absolute left-[15%] top-[10%]">
            <img
              src="/assets/images/Lasagnes.png"
              alt="Logo"
              className="w-[450px] h-[450px] rounded-full border-border border-4"
            />
            <img
              src="/assets/images/Curry.png"
              alt="Logo"
              className="absolute -right-[30%] bottom-[-5%] w-[280px] h-[280px] rounded-full border-border border-4"
            />
          </div>
          <img
            src="/assets/images/Brunch.png"
            alt="Logo"
            className="absolute left-[60%] top-[33%] w-[350px] h-[350px] rounded-full border-border border-4 m-5"
          />
        </div>
      </main>
    </>
  );
}

export default HomePage;

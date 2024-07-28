import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
        <span className="text-yellow-300">Embark on Your Dream Journey:</span>
        <br />
        Seamless Travel Planning Powered by Advanced AI Technology
      </h1>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200">
        Your Dream Trip, Just a Click Away
      </p>
      <Link to="/create-trip">
        <Button className="mt-8 px-6 py-3 text-lg font-semibold bg-yellow-400 text-gray-800 hover:bg-yellow-300 rounded-lg transition-colors duration-300">
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default Hero;

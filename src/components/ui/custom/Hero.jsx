import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="flex items-center mx-56 gap-9 flex-col">
            <h1 className="font-extrabold text-[50px] mt-16 text-center">
            
                <span className=" text-[#f56551]">
                    Embark on Your Dream Journey:
                </span>
                Seamless Travel Planning Powered by Advanced AI Technology
            </h1>
            <p className="text-xl text-center text-gray-500">Your Dream Trip, Just a Click Away</p>
            <Link to={'/create-trip'}>
            <Button>Get Started</Button>
            </Link>
        </div>
    );
}

export default Hero;

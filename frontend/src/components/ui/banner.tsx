import React from "react";
import { Button } from "./button";

interface BannerProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
}

const Banner: React.FC<BannerProps> = ({ image, title, subtitle, description, buttonText }) => {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center bg-no-repeat flex items-center px-8 flex-row-reverse my-10"
      style={{ backgroundImage: `url('/${image}')` }}
    >
      <div className="w-1/2 text-black text-left space-y-4 p-4 rounded-lg">
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <h3 className="text-2xl font-semibold">{subtitle}</h3>}
        <p className="text-lg">{description}</p>
        <Button className="text-white px-6 py-3 rounded-lg font-semibold transition">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Banner;

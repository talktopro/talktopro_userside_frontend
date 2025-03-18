import React from "react";
import { buttonVariants } from "./ui/button";
import { Link } from "react-router-dom";

interface BannerProps {
  bg: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
}

const Banner: React.FC<BannerProps> = ({
  bg,
  image,
  title,
  subtitle,
  description,
  buttonText,
}) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row md:flex-col sm:flex-col items-center sm:px-8 not-sm:px-4 my-10 rounded-lg gap-6"
      style={{ backgroundImage: `url('/${bg}')` }}
    >
      {/* Image Section */}
      <div className="lg:w-1/2 w-full md:w-full sm:w-full flex justify-center">
        <img
          src={`/${image}`}
          alt={title}
          className="h-auto object-cover max-w-md w-full sm:max-w-xs sm:mx-auto"
        />
      </div>

      {/* Text Section */}
      <div className="lg:w-1/2 md:w-full sm:w-full text-black space-y-4 p-4 lg:pl-12 lg:text-left md:text-center sm:text-center">
        <h2 className="text-4xl font-bold md:text-2xl sm:text-xl">{title}</h2>
        {subtitle && (
          <h3 className="text-2xl font-semibold md:text-xl sm:text-lg">
            {subtitle}
          </h3>
        )}
        <p className="text-2xl md:text-xl sm:text-lg">{description}</p>

        <div className="flex lg:justify-start md:justify-center sm:justify-center">
          <Link to={"/mentor/register"} className={buttonVariants({ variant: "default" })}>{buttonText}</Link>
          {/* <Button>{buttonText}</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;

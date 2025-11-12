import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { easeOut, motion } from "framer-motion";
import { heroSlides } from "../../public/heroSlideData";
const HeroBanner = () => {
  const [currentslide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-[60vh] md:h-[90vh] relative  overflow-hidden">
      {/* hero-slide bg */}
      <div className="absolute w-full h-full">
        <img src={heroSlides?.[currentslide].image} alt="" className="w-full h-full object-cover brightness-60" />
      </div>
      {/* hero-slide info */}
      <div className="absolute h-full w-full flex flex-col justify-center items-center px-6">
        <motion.div
          key={currentslide}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center text-yellow-400 mb-6">
            {heroSlides?.[currentslide].title}
          </h1>
          <p className="text-lg md:text-2xl text-center text-purple-100 mb-8">{heroSlides[currentslide].subtitle}</p>
          {/* <div className=" w-fit mx-auto flex flex-col md:flex-row gap-3">
            <Link
              to={heroSlides?.[currentslide].ctaLink}
              className="btn  bg-lime-900 h-12 text-white text-base text-bold btn-outline btn-success shadow-none hover:bg-green-900"
            >
              {heroSlides?.[currentslide].cta}
            </Link>
            <Link to="/plants" className="btn h-12 btn-outline text-white shadow-none hover:bg-black">
              Browse All Plants
            </Link>
          </div> */}
        </motion.div>
      </div>
      {/* slide indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 space-x-3">
        {heroSlides?.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`text-xs rounded-full  text-white btn btn-outline shadow-none border hover:cursor-pointer  ${
              currentslide === index ? "bg-yellow-100 !text-black" : " opacity-75"
            }`}>{index+1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;

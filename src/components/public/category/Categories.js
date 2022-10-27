import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import { Link } from "react-router-dom";
import "./category.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const callouts = [
  {
    name: "Breakfast",
    imageSrc: "/photos/categories/breakfast/breakfast.svg",
    imageShadow: "/photos/categories/breakfast/breakfast-shadow.svg",
    href: "#",
    _id: "6281683a750e3cd953e014a7",
  },
  {
    name: "Vegan",
    imageSrc: "/photos/categories/vegan/vegan.svg",
    imageShadow: "/photos/categories/vegan/vegan-shadow.svg",

    href: "#",
    _id: "62816849750e3cd953e014a9",
  },
  {
    name: "Meat",
    imageSrc: "/photos/categories/meat/meat.svg",
    imageShadow: "/photos/categories/meat/meat-shadow.svg",
    href: "#",
    _id: "62816852750e3cd953e014ab",
  },
  {
    name: "Dessert",
    imageSrc: "/photos/categories/dessert/dessert.svg",
    imageShadow: "/photos/categories/dessert/dessert-shadow.svg",
    href: "#",
    _id: "6281685b750e3cd953e014ad",
  },
  {
    name: "Lunch",
    imageSrc: "/photos/categories/lunch/lunch.svg",
    imageShadow: "/photos/categories/lunch/lunch-shadow.svg",
    href: "#",
    _id: "62816866750e3cd953e014af",
  },
  {
    name: "Chocolate",
    imageSrc: "/photos/categories/chocolate/chocolate.svg",
    imageShadow: "/photos/categories/chocolate/chocolate-shadow.svg",
    href: "#",
    _id: "62816874750e3cd953e014b1",
  },
];

export default function Example() {
  return (
    <div id="category" className="flex flex-col mx-auto">
      <div className="flex items-center justify-between mb-4 mx-4">
        <span className="font-bold text-xl sm:text-4xl lg:text-5xl text-gray-500">
          Categories
        </span>
        <Link
          to="/"
          className="viewall flex items-center justify-center gap-1 rounded-lg py-1 px-3 leading-3  shadow-lg  sm:w-40 sm:text-lg sm:font-bold
          md:w-36 md:px-6 md:leading-5 lg:text-xl lg:w-40 xl:text-2xl xl:w-48 2xl:text-3xl 2xl:w-56"
        >
          <span className="font-semibold text-lg text-gray-500"> All </span>
          <GridViewIcon className="text-gray-500" />
        </Link>
      </div>

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          className="h-28 w-[97vw]"
        >
          {callouts.map((callout) => (
            <SwiperSlide
              key={callout.name}
              className={` ${callout.name} rounded-3xl`}
            >
              <Link
                to={`/`}
                className="flex flex-col items-center gap-2 pb-2 rounded-3xl"
              >
                <img
                  src={`${callout.imageSrc}`}
                  alt=""
                  className="group-hover:scale-125 z-10 transition-all w-16 object-fill"
                />
                <img
                  src={`${callout.imageShadow}`}
                  alt=""
                  className="absolute group-hover:w-36 group-hover:h-36 top-10 left-12 transition-all w-16 h-16 object-fill"
                />

                <p className="flex justify-center items-center text-lg font-bold text-gray-800">
                  {callout.name}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

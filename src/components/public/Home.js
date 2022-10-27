// import { Link } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'
import React from "react";
import Slide from "./headerslide/Slide";
import Categories from "./category/Categories";
import RecipeList from "../../features/recipes/RecipeList";
// import AboutUs from "./aboutUs/AboutUs";
// import Subscribe from "../commonComponents/Subscribe";

const Public = () => {
  return (
    <>
      <div className="">
        <div>
          <Slide />
        </div>
        <div className="">
          <div className="" >
            <Categories />
          </div>
          <div className="pt-6">
            {/* <div className="flex justify-center pb-2">
              <input className="bg-gray-50 rounded-lg px-4 py-1 ring-2 ring-blue-100 focus:ring-blue-300 outline-none" placeholder="search recipe..." />
            </div> */}
            <RecipeList/>
          </div>
          <div>
            {/* <AboutUs /> */}
          </div>
          <div>
            {/* <Subscribe /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Public;

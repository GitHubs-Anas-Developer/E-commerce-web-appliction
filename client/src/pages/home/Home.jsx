import React from "react";
import CategoryBanner from "./categoryBanner/CategoryBanner";
import Slider from "./bannerSlider/Slider";
import Featured from "../featured/Featured";
import BrandBanner from "./brandBanner/BrandBanner";
import Products from "../productsAll/Products";

function Home() {
  return (
    <div>
      <CategoryBanner />
      <Slider />
      <Featured />
      <BrandBanner />
      <Products />
    </div>
  );
}

export default Home;

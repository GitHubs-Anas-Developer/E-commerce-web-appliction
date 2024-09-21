import React from "react";
import CategoryBanner from "./categoryBanner/CategoryBanner";
import Slider from "./bannerSlider/Slider";
import Featured from "../featured/Featured";
import BrandBanner from "./brandBanner/BrandBanner";

function Home() {
  return (
    <div>
      <CategoryBanner />
      <Slider/>
      <Featured />
      <BrandBanner />
    </div>
  );
}

export default Home;

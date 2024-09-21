import React from "react";
import Slider from "react-slick"; // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

function CustomSlider() {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/99d92de820037ad5.jpg?q=20"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6a862ee9a3d2061c.jpg?q=20"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-vector/happy-diwali-sale-banner-with-discount-details-pink-background_1017-39845.jpg?size=626&ext=jpg&ga=GA1.1.473907030.1717564347&semt=ais_hybrid"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}

export default CustomSlider;

import React, { useContext } from "react";
import "./CategoryBanner.css";
import CategoryContext from "../../../context/CategoryApi";

function CategoryBanner() {
 
  const {category} =  useContext(CategoryContext)

  return (
    <div className="category">
      {category.map((item, index) => (
        <div key={index} className="category-item">
          <img className="category-img" src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.images[0]?.filename}`} alt={item.name} />
          <h6>{item.name}</h6>
        </div>
      ))}
    </div>
  );
}

export default CategoryBanner;

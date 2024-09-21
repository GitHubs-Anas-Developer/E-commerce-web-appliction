import React, { useContext } from "react";
import category from "../../../assets/category"; // Adjust the path if needed
import "./CategoryBanner.css";
import CategoryContext from "../../../context/CategoryApi";

function CategoryBanner() {
 
  const {category} =  useContext(CategoryContext)

  return (
    <div className="category">
      {category.map((item, index) => (
        <div key={index} className="category-item">
          <img className="category-img" src={`http://localhost:8050/images/${item.images[0]?.filename}`} alt={item.name} />
          <h6>{item.name}</h6>
        </div>
      ))}
    </div>
  );
}

export default CategoryBanner;

import React, { useContext, useState } from "react";
import "./CategorySidebar.css";
import CategoryContext from "../../context/CategoryApi";
import SubCategoryContext from "../../context/SubCategoryApi";
import { Link } from "react-router-dom";
const SidebarCategory = () => {
  const { category } = useContext(CategoryContext);
  const { mobiles, openCategory, toggleCategory } =
    useContext(SubCategoryContext);
  console.log();

  // State to track the active category
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (cateId) => {
    toggleCategory(cateId);
    setActiveCategory(activeCategory === cateId ? null : cateId); // Toggle active state
  };

  return (
    <div className="sidebarcontainer">
      <div className="sidebarcategory-container">
        <h6 className="sidebarcategory-header">Categories</h6>
        <ul className="sidebarcategory-list">
          {category.map((cate) => (
            <li
              key={cate._id}
              className={`sidebarcategory-item ${
                activeCategory === cate._id ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(cate._id)}
            >
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${cate.images[0]?.filename}`}
                alt={cate.name}
                className="sidebarcategory-image"
              />
              <span className="sidebarcategory-name">{cate.name}</span>
              {openCategory === cate._id && (
                <ul className="sidebarcategory-subcategory-list">
                  {mobiles.map((subcat) => (
                    <li
                      key={subcat._id}
                      className="sidebarcategory-subcategory-item"
                    >
                      {subcat.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="right-div">
        <div className="right-items">
          {mobiles.map((item) => (
            <Link className="Link" to={`/subCategoryProducts/${item._id}`}>
              <div key={item._id} className="right-item">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.images[0]?.filename}`}
                  alt={item.name}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarCategory;

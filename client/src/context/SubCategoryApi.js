import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SubCategoryContext = createContext();

export const SubCategoryContextProvider = ({ children }) => {
  const [mobiles, setMobiles] = useState([]);
  const [openCategory, setOpenCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fetchMobilesSubcategory = async () => {
      if (categoryId) {
        try {
          const response = await axios.get(
            `http://localhost:8050/api/v1/subcategories/category/${categoryId}`
          );
          setMobiles(response.data.subCategories);
          console.log(response.data.subCategories);
          
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMobilesSubcategory();
  }, [categoryId]); // Added categoryId to the dependency array

  const toggleCategory = (id) => {
    setCategoryId(id);
  };

  console.log(categoryId);
  
  return (
    <SubCategoryContext.Provider
      value={{ mobiles, openCategory, toggleCategory }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};

export default SubCategoryContext;

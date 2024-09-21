import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SubCategoryContext = createContext();

export const SubCategoryContextProvider = ({ children }) => {
  const [subcategory, setSubcategory] = useState([]);
  const [categoryOneId, setCategoryOneId] = useState("");

  useEffect(() => {
    const fetchSubcategory = async () => {
      if (categoryOneId) {
        try {
          const response = await axios(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/subcategories/category/${categoryOneId}`
          );

          console.log(response.data.subCategories);
          setSubcategory(response.data.subCategories);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSubcategory();
  }, [categoryOneId]); // Run this whenever categoryOneId changes

  const cateId = (sub_id) => {
    setCategoryOneId(sub_id); // Set categoryOneId to the passed sub_id
  };

  console.log("categoryOneId", categoryOneId);
  
  return (
    <SubCategoryContext.Provider value={{ subcategory, cateId }}>
      {children}
    </SubCategoryContext.Provider>
  );
};

export default SubCategoryContext;

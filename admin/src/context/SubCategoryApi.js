import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SubCategoryContext = createContext();

export const SubCategoryContextProvider = ({ children }) => {
  const [subcategory, setSubcategory] = useState([]);

  useEffect(() => {
    const fethSubcategory = async () => {
      try {
        const response = await axios(
          "http://localhost:8050/api/v1/SubCategory"
        );
        setSubcategory(response.data.subCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fethSubcategory();
  });

  return (
    <SubCategoryContext.Provider value={{ subcategory }}>
      {children}
    </SubCategoryContext.Provider>
  );
};

export default SubCategoryContext;

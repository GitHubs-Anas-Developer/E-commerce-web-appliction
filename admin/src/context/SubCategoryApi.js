import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SubCategoryContext = createContext();

export const SubCategoryContextProvider = ({ children }) => {
  const [subcategory, setSubcategory] = useState([]);

  useEffect(() => {
    const fethSubcategory = async () => {
      try {
        const response = await axios(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/SubCategory`
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

import axios from "axios";
import { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8050/api/v1/category`
        );
        setCategory(response.data.category);
      } catch (error) {
        console.error(error);
      }
    };
    fetCategory();
  }, []);
  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;

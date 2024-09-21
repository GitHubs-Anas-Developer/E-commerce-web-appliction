import axios from "axios";
import { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category`);
        setCategory(response.data.category);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;

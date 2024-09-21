import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [productsAll, setProductsAll] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`
        );
        setProductsAll(response.data.products);
      } catch (err) {
        console.error();
      }
    };

    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ productsAll }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

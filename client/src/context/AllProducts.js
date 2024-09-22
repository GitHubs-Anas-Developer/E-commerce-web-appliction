import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [productsAll, setProductsAll] = useState([]);
  const [prodId, setProdId] = useState("");
  const [product, setProduct] = useState(null); // Start with null instead of an array

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`
        );
        setProductsAll(response.data.products);
      } catch (err) {
        console.error(err); // Add error logging
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOneProduct = async () => {
      if (prodId) { // Check if prodId is not empty
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${prodId}`
          );
          setProduct(response.data.product);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchOneProduct();
  }, [prodId]); // Fetch the product whenever prodId changes

  const productId = (id) => {
    setProdId(id);
  };

  return (
    <ProductContext.Provider value={{ productsAll, productId, product }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

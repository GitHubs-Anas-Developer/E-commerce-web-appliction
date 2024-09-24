import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const token = Cookies.get("token");
  const [productsAll, setProductsAll] = useState([]);
  const [prodId, setProdId] = useState("");
  const [product, setProduct] = useState(null);
  const [subProductsId, setSubProductsId] = useState("");
  const [subProducts, setSubProducts] = useState([]);
  
  // Loading and error states
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [loadingSubProducts, setLoadingSubProducts] = useState(true);
  const [errorSubProducts, setErrorSubProducts] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductsAll(response.data.products);
      } catch (err) {
        setErrorProducts("Failed to load products.");
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Fetch a single product by ID
  useEffect(() => {
    const fetchOneProduct = async () => {
      if (prodId) {
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
  }, [prodId]);

  // Fetch subcategory products based on subProductsId
  useEffect(() => {
    const fetchSubcategoryProducts = async () => {
      if (subProductsId) { // Ensure subProductsId is not empty
        setLoadingSubProducts(true);
        try {
          const response = await axios.get(
            `http://localhost:8050/api/v1/subcategoryProducts/${subProductsId}`
          );
          setSubProducts(response.data.products);
        } catch (error) {
          setErrorSubProducts("Failed to load subcategory products.");
          console.error(error);
        } finally {
          setLoadingSubProducts(false);
        }
      }
    };

    fetchSubcategoryProducts();
  }, [subProductsId]); // Add subProductsId as a dependency

  // Function to set the product ID
  const productId = (id) => {
    setProdId(id);
  };

  // Function to set the subcategory product ID
  const subcategoryProducstId = (id) => {
    setSubProductsId(id);
  };

  return (
    <ProductContext.Provider
      value={{
        productsAll,
        loadingProducts,
        errorProducts,
        productId,
        product,
        subcategoryProducstId,
        subProducts,
        loadingSubProducts,
        errorSubProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

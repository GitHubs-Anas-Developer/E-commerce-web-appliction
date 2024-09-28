import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContextApi";
import axios from "axios";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // List of products in orders
  const [order, setOrder] = useState(null); // Single order for viewing
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;

  // Fetch orders when userId changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.log("User ID is null, skipping order fetch.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8050/api/v1/orders/${userId}`
        );
        setOrders(response.data.orders || []); // Ensure orders is an array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  // Extract product details when orders are updated
  useEffect(() => {
    const fetchProducts = async () => {
      if (orders.length === 0) return; // No need to fetch if there are no orders

      try {
        const productRequests = orders.map((order) =>
          axios.get(`http://localhost:8050/api/v1/product/${order.prodId}`)
        );
        const responses = await Promise.all(productRequests); // Wait for all product fetches
        const fetchedProducts = responses.map(
          (response) => response.data.product
        ); // Extract product data
        setProducts(fetchedProducts); // Set all products at once
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [orders]); // This will run whenever orders are updated

  // Fetch a single order by product ID
  const handleViewProduct = async (prodId) => {

    
    try {
      const response = await axios.get(
        `http://localhost:8050/api/v1/order/${prodId}` // Corrected URL
      );
      setOrder(response.data.data); // Set the fetched order
    } catch (error) {
      console.error("Error viewing product:", error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, products, handleViewProduct, order }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

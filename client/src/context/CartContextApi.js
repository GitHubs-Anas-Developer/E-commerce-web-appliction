import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import AuthContext from "./AuthContextApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContextApi = createContext();
const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`; // Define API base URL

export const CartContextApiProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [cartCount,setCartCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;


  const handleToCart = async (userId, productId, price, title, images) => {
    const cartData = {
      userId,
      productId,
      price,
      quantity: 1,
      name: title,
      image: images,
    };

    try {
      await axios.post(`${API_BASE_URL}/newCart`, cartData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`${title} has been added to your cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(
        error.response ? error.response.data.message : "Failed to add item to cart."
      );
    }
  };

  const fetchCarts = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarts(response.data.carts.products);
     setCartCount(response.data.carts.products.length);
      
    } catch (error) {
      console.error("Error fetching carts:", error);
      toast.error("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/cart/update/${userId}`, {
        productId,
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarts(response.data.carts.products);
      toast.success("Cart item quantity updated successfully!");
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      toast.error("Failed to update cart item quantity.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarts((prevCarts) => prevCarts.filter(item => item.productId !== productId)); // Update local state
      toast.success("Cart item removed successfully!");
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast.error("Failed to remove cart item.");
    }
  };

  useEffect(() => {
    fetchCarts(); 
  }, [userId]);

  return (
    <CartContextApi.Provider
      value={{
        handleToCart,
        carts,
        loading,
        updateItemQuantity,
        handleRemove,
        cartCount
      }}
    >
      {children}
      <ToastContainer />
    </CartContextApi.Provider>
  );
};

export default CartContextApi;

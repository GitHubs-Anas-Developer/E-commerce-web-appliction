import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./AuthContextApi";
import WishList from './../pages/wishlist/WishList';

const WishListContext = createContext();

export const WishListContextProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  const [WishListCount,setWishListCount] = useState(0)
  const token = Cookies.get("token");
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;

  // Function to add an item to the wishlist
  const handleToWishList = async (userId, productId, name, images) => {
    const newWishList = {
      userId,
      productId,
      name,
      image: images, // Ensure 'images' is in the correct format expected by the API
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/newWishlist`,
        newWishList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show success toast with the product name
      toast.success(`${name} has been added to your wishlist!`);
      // Fetch updated wishlist after adding a new item
      fetchWishlistProduct();
    } catch (error) {
      // Show error toast
      toast.error("Product is already in the wishlist");
      console.error("Error adding to wishlist:", error);
    }
  };

  // Function to fetch the wishlist products
  const fetchWishlistProduct = async () => {
    if (!userId) return; // Check if userId is available

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/newWishlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishList(response.data.wishList ); // Ensure you're setting the correct data structure
  setWishListCount(response.data.wishList.length);
      
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Function to remove an item from the wishlist
  const handleRemoveFromWishList = async (prodId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1//newWishlist/remove/${prodId}`, // Corrected URL
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        }
      );
      // Show success toast
      toast.success("Item removed from wishlist!");
      // Fetch updated wishlist after removing an item
      fetchWishlistProduct();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Fetch wishlist when component mounts or userId changes
  useEffect(() => {
    fetchWishlistProduct();
  }, [userId]); // Dependency array includes userId to refetch if it changes

  return (
    <WishListContext.Provider
      value={{ wishList, handleToWishList, handleRemoveFromWishList,WishListCount }}
    >
      {children}
      {/* Optional: Include ToastContainer here for notifications */}
      <ToastContainer />
    </WishListContext.Provider>
  );
};

export default WishListContext;

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import axios from "axios";
import AuthContext from "./AuthContextApi";

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;

  const token = Cookies.get("token");

  const [Address, setAddress] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8050/api/v1/delivaryAddress/${userId}`
        );

        setAddress(response.data.address[0]);
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [token, userId]); // Ensure token and userId are dependencies

  return (
    <AddressContext.Provider value={{ Address }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;

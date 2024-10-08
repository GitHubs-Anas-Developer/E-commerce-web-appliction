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
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/delivaryAddress/${userId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAddress(response.data.address[0]);
      } catch (error) {
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

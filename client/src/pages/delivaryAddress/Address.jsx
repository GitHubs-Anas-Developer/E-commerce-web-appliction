import React, { useContext, useState } from "react";
import "./Address.css"; // Import your CSS for styling
import axios from "axios";
import AuthContext from "../../context/AuthContextApi";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import AddressContext from "../../context/AddressApi";
import { useNavigate, useParams } from "react-router-dom";

function Address() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Address } = useContext(AddressContext);
  const { user } = useContext(AuthContext);
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    firstName: Address?.firstName || "",
    lastName: Address?.lastName || "",
    streetAddress: Address?.streetAddress || "",
    apartmentNumber: Address?.apartmentNumber || "",
    place: Address?.place || "",
    district: Address?.district || "",
    city: Address?.city || "",
    landmark: Address?.landmark || "",
    postalCode: Address?.postalCode || "",
    phoneNumber: Address?.phoneNumber || "",
    userId: user ? user._id : Address?.userId || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      streetAddress,
      apartmentNumber,
      place,
      district,
      city,
      landmark,
      postalCode,
      phoneNumber,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !streetAddress ||
      !apartmentNumber ||
      !place ||
      !district ||
      !city ||
      !landmark ||
      !postalCode ||
      !phoneNumber
    ) {
      return "All fields must be filled out.";
    }
    if (phoneNumber.length < 10) {
      return "Phone number should be at least 10 digits long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/createDelivaryAddress`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          streetAddress: "",
          apartmentNumber: "",
          place: "",
          district: "",
          city: "",
          landmark: "",
          postalCode: "",
          phoneNumber: "",
          userId: user ? user._id : "",
        });

        navigate(`/payment`, { state: { id, formData } }); // Navigate to payment page on success
      }
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Error submitting address."
      );
    } finally {
      setLoading(false); // Stop loading after the request
    }
  };

  return (
    <div className="address-container">
      <h2 className="address-title">Enter Your Address</h2>
      {error && <p className="error-message">{error}</p>}
      {success && (
        <p className="success-message">Address added successfully!</p>
      )}

      <form className="address-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
          className="form-control"
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
          className="form-control"
        />
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleInputChange}
          placeholder="Street Address"
          required
          className="form-control"
        />
        <input
          type="text"
          id="apartmentNumber"
          name="apartmentNumber"
          value={formData.apartmentNumber}
          onChange={handleInputChange}
          placeholder="Apartment Number"
          required
          className="form-control"
        />
        <input
          type="text"
          id="place"
          name="place"
          value={formData.place}
          onChange={handleInputChange}
          placeholder="Place"
          required
          className="form-control"
        />
        <input
          type="text"
          id="district"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
          placeholder="District"
          required
          className="form-control"
        />
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          required
          className="form-control"
        />
        <input
          type="text"
          id="landmark"
          name="landmark"
          value={formData.landmark}
          onChange={handleInputChange}
          placeholder="Landmark"
          required
          className="form-control"
        />
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          placeholder="Postal Code"
          required
          className="form-control"
        />
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
          className="form-control"
        />
        <button type="submit" className="address-submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Address;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Feature.css"; // Ensure this file contains your desired styles

function Feature() {
  const [initialPrice, setInitialPrice] = useState(0);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    offerPrice: "",
    discountPercentage: "",
    about: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    const discountedPrice =
      newProduct.price -
      (newProduct.price * newProduct.discountPercentage) / 100;
    setInitialPrice(discountedPrice);
  }, [newProduct.price, newProduct.discountPercentage]);

  const [loading, setLoading] = useState(false); // For showing a loading indicator
  const [imagePreviews, setImagePreviews] = useState([]); // For showing image previews

  // Clean up object URLs when component unmounts or imagePreviews changes
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Update newProduct images with existing images plus new files
    setNewProduct((prevState) => {
      const updatedImages = [...prevState.images, ...files];
      return { ...prevState, images: updatedImages };
    });

    // Generate previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    // Remove image from newProduct images array
    setNewProduct((prevState) => {
      const updatedImages = prevState.images.filter((_, i) => i !== index);
      return { ...prevState, images: updatedImages };
    });

    // Remove preview from imagePreviews array
    setImagePreviews((prevPreviews) => {
      const updatedPreviews = prevPreviews.filter((_, i) => i !== index);
      return updatedPreviews;
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < newProduct.images.length; i++) {
          formData.append("images", newProduct.images[i]);
        }
      } else {
        formData.append(key, newProduct[key]);
      }
    });

    try {
      await axios.post("http://localhost:8050/api/v1/createFeature", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully!");
      setNewProduct({
        title: "",
        price: "",
        offerPrice: "",
        discountPercentage: "",
        about: "",
        description: "",
        images: [],
      });
      setImagePreviews([]); // Clear previews
    } catch (error) {
      console.error("Error adding new product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h2>Add New Featured</h2>
      <form onSubmit={handleAddProduct} className="feature-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter product title"
            value={newProduct.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="discountPercentage">Discount Percentage</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            placeholder="Enter discount percentage"
            value={newProduct.discountPercentage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="offerPrice">Offer Price</label>
          <input
            type="number"
            id="offerPrice"
            name="offerPrice"
            placeholder="Enter offer price"
            value={(newProduct.offerPrice = initialPrice)}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            placeholder="Enter product about information"
            value={newProduct.about}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="preview-container">
              <img
                src={preview}
                alt={`preview ${index}`}
                className="preview-image"
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Feature;

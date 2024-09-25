import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";
import SubCategoryContext from "../../context/SubCategoryApi";
import CategoryContext from "../../context/categoryApi";

function Product() {
  const { subcategory, cateId } = useContext(SubCategoryContext);
  const { category } = useContext(CategoryContext);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    offerPrice: "",
    discountPercentage: "",
    about: "",
    description: "",
    images: [],
    subcategoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Auto-calculate offer price based on discount and price
  useEffect(() => {
    if (newProduct.price && newProduct.discountPercentage) {
      const discountedPrice =
        newProduct.price - (newProduct.price * newProduct.discountPercentage) /100 - 0
      setNewProduct((prev) => ({ ...prev, offerPrice: discountedPrice }));
    }
  }, [newProduct.price, newProduct.discountPercentage]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload and preview generation
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setNewProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));

    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Form validation logic
  const isFormValid = () => {
    return (
      newProduct.title &&
      newProduct.price &&
      newProduct.discountPercentage >= 0 &&
      newProduct.discountPercentage <= 100 &&
      newProduct.subcategoryId &&
      newProduct.images.length > 0
    );
  };

  // Submit handler for adding new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.subcategoryId) {
      toast.error("Subcategory ID is required.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      if (key === "images") {
        newProduct.images.forEach((file) => formData.append("images", file));
      } else {
        formData.append(key, newProduct[key]);
      }
    });

    try {
      await axios.post(
        `http://localhost:8050/api/v1/product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Product added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding new product:", error);
      if (error.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form after successful submission
  const resetForm = () => {
    setNewProduct({
      title: "",
      price: "",
      offerPrice: "",
      discountPercentage: "",
      about: "",
      description: "",
      images: [],
      subcategoryId: "",
    });
    setImagePreviews([]);
  };

  return (
    <div className="products-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleAddProduct} className="products-form">
        <div className="products-input-group">
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

        <div className="products-input-group">
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

        <div className="products-input-group">
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

        <div className="products-input-group">
          <label htmlFor="offerPrice">Offer Price</label>
          <input
            type="number"
            id="offerPrice"
            name="offerPrice"
            placeholder="Offer price will auto-calculate"
            value={newProduct.offerPrice}
            disabled
          />
        </div>

        <div className="products-input-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            placeholder="Enter product about information"
            value={newProduct.about}
            onChange={handleInputChange}
          />
        </div>

        <div className="products-input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="products-input-group">
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

        <div className="products-input-group">
          <label htmlFor="categoryId">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={newProduct.categoryId}
            onChange={(e) => {
              handleInputChange(e);
              cateId(e.target.value); // Update subcategories on category change
            }}
            required
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="products-input-group">
          <label htmlFor="subcategoryId">Subcategory</label>
          <select
            id="subcategoryId"
            name="subcategoryId"
            value={newProduct.subcategoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Subcategory</option>
            {subcategory.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        <div className="products-previews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="products-preview">
              <img src={preview} alt="product preview" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="products-submit-btn"
          disabled={!isFormValid() || loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Product;

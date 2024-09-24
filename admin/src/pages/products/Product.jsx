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

  useEffect(() => {
    if (newProduct.price && newProduct.discountPercentage) {
      const discountedPrice =
        newProduct.price - (newProduct.price * newProduct.discountPercentage) / 100;
      setNewProduct((prev) => ({ ...prev, offerPrice: discountedPrice }));
    }
  }, [newProduct.price, newProduct.discountPercentage]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setNewProduct((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

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
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/createProduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding new product:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id} onClick={() => cateId(cat._id)}>
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
            <div key={index} className="products-preview-container">
              <img
                src={preview}
                alt={`preview ${index}`}
                className="products-preview-image"
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
        <button type="submit" className="products-button" disabled={loading || !isFormValid()}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Product;

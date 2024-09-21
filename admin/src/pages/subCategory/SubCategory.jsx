import React, {  useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SubCategory.css";

function SubCategory() {


 
  

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Renamed for clarity
  const [files, setFiles] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // Renamed for clarity

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value); // Renamed for clarity
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName || files.length === 0 || !categoryId) {
      // Renamed for clarity
      toast.error(
        "Please enter a subcategory name, select at least one image, and provide a category ID."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("category", categoryId); // Renamed for clarity

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8050/api/v1/createSubCategory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("SubCategory added successfully!");
        setCategoryName("");
        setFiles([]);
      } else {
        toast.error("Error creating subcategory: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add subcategory. Please try again.");
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8050/api/v1/category"
        );
        setSubCategories(response.data.category);
        console.log("Fetched subCategories:", response.data.subCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to fetch subcategories. Please try again.");
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <div className="category-wrapper">
      <h2 className="category-title">Create SubCategory</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="SubCategory Name"
          className="category-input"
          value={categoryName}
          onChange={handleNameChange}
        />
        <select
          name="category"
          className="category-select"
          value={categoryId} // Updated value for selected category
          onChange={handleCategoryChange} // Handle category selection
        >
          <option value="" disabled>
            Select Category
          </option>
          {subCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          multiple
          className="category-file-input"
          onChange={handleFileChange}
        />
        <button type="submit" className="category-submit-button">
          Create SubCategory
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SubCategory;

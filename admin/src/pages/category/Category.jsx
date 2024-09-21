import React, { useState } from "react";
import axios from "axios";
import "./Category.css"; // Ensure you have this CSS file imported
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [files, setFiles] = useState([]);

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName || files.length === 0) {
      toast.error(
        "Please enter a category name and select at least one image."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/v1/createCategory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Category added successfully!");
        setCategoryName("");
        setFiles([]);
      } else {
        toast.error("Error creating category: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="category-wrapper">
      <h2 className="category-title">Create Category</h2>
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          className="category-input"
          value={categoryName}
          onChange={handleInputChange}
        />
        <input
          type="file"
          multiple
          className="category-file-input"
          onChange={handleFileChange}
        />
        <button type="submit" className="category-submit-button">
          Create Category
        </button>
      </form>
    </div>
  );
}

export default Category;

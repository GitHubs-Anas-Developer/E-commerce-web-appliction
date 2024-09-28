import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import ProductContext from "../../../context/AllProducts";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { productsAll } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleInputSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/searchProduct", { state: { searchQuery } }); // Navigate with the search query
    setSearchQuery(""); // Clear the input after search
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          className="search-input"
          type="search"
          value={searchQuery}
          onChange={handleInputSearch}
          placeholder="Search for products, brands, and more"
          aria-label="Search"
        />
        <button className="search-btn" type="submit">
          <CiSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

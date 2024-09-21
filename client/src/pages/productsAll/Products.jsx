import React, { useContext } from "react";
import ProductContext from "../../context/AllProducts";

function Products() {
  const { productsAll } = useContext(ProductContext);
  console.log("productsAll",productsAll);

  return <div>products</div>;
}

export default Products;

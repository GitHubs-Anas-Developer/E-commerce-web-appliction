import "./App.css";
import Feature from "./pages/feature/Feature";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Category from "./pages/category/Category";
import SubCategory from "./pages/subCategory/SubCategory";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/products/Product";
import Customers from "./pages/customers/Customers";
import Settings from "./pages/settings/Settings";
import Orders from "./pages/orders/Orders";

function App() {
  return (
    <div className="App">
      <Layout />

      <Routes>
   
        <Route path="/" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/subCategory" element={<SubCategory />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/settings" element={<Settings />} />




      </Routes>
    </div>
  );
}

export default App;

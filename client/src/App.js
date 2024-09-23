import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/layouts/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/authentication/signup/Signup";
import Login from "./pages/authentication/login/Login";
import Footer from "./components/layouts/footer/Footer";
import BottomNavbar from "./components/layouts/bottomNavbar/BottomNabvar";
import CategorySidebar from "./pages/category/CategorySidebar";
import Profile from "./pages/profile/Profile";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Address from "./pages/delivaryAddress/Address";
import Payment from "./pages/payment/Payment";

function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<CategorySidebar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/delivaryAddress/:id" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default App;

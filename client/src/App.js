import { useLocation } from "react-router-dom"; // Import useLocation hook
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
import SubCategoryProducts from "./pages/subCategoryProducts/SubCategoryProducts";
import Cart from "./pages/cart/Cart";
import WishList from "./pages/wishlist/WishList";
import Orders from "./pages/orders/Orders";
import UserAddress from "./pages/userAddress/UserAddress"
import Tracking from "./pages/orderTracking/Tracking";
import Receipt from "./pages/viewReceipt/Receipt";
import SearchProduct from "./pages/searchProduct/SearchProduct";
function App() {
  const location = useLocation(); // Get the current route

  // Define paths where you don't want to show the Footer and BottomNavbar
  const hideFooterAndNavbar = ["/login", "/signup"];

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<CategorySidebar />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/subCategoryProducts/:id"
          element={<SubCategoryProducts />}
        />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/delivaryAddress/:id" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/userAddress" element={<UserAddress />} />
        <Route path="/orderTracking" element={<Tracking />} />
        <Route path="/viewReceipt" element={<Receipt />} />
        <Route path="/searchProduct" element={<SearchProduct />} />




      </Routes>

      {/* Conditionally render Footer and BottomNavbar */}
      {!hideFooterAndNavbar.includes(location.pathname) && (
        <>
          <Footer />
          <BottomNavbar />
          <Layout />
        </>
      )}
    </div>
  );
}

export default App;

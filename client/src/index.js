import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { AuthContextProvider } from "./context/AuthContextApi";
import { FeatureContextProvider } from "./context/FeatureContextApi";
import { CategoryContextProvider } from "./context/CategoryApi";
import { SubCategoryContextProvider } from "./context/SubCategoryApi";
import { ProductContextProvider } from "./context/AllProducts";
import { AddressContextProvider } from "./context/AddressApi";
import { CartContextApiProvider } from "./context/CartContextApi";
import { WishListContextProvider } from "./context/WishListContextApi";
import { OrderContextProvider } from "./context/OrderContextApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <AuthContextProvider>
          <FeatureContextProvider>
            <CategoryContextProvider>
              <SubCategoryContextProvider>
                <ProductContextProvider>
                  <AddressContextProvider>
                    <CartContextApiProvider>
                      <WishListContextProvider>
                        <OrderContextProvider>
                          <App />
                        </OrderContextProvider>
                      </WishListContextProvider>
                    </CartContextApiProvider>
                  </AddressContextProvider>
                </ProductContextProvider>
              </SubCategoryContextProvider>
            </CategoryContextProvider>
          </FeatureContextProvider>
        </AuthContextProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

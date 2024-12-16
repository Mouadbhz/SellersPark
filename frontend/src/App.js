import React ,{useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// ---------Landing page ----------------
import Home from "./pages/landing_page/Home";
import ContactUs from "./pages/landing_page/ContactUs";

//----------Authentication --------------------------
import Activate from "./pages/authentication/Activate";
import Login from "./pages/authentication/Login";
import ResetPassword from "./pages/authentication/ResetPassword";
import ResetPasswordConfirm from "./pages/authentication/ResetPasswordConfirm";
import Signup from "./pages/authentication/Signup";
// import Facebook from "./pages/authentication/Facebook";
// import Google from "./pages/authentication/Google";
import AboutUs from "./pages/landing_page/About.js";
import FaqPage from "./pages/landing_page/faq.js";
//---------------Client Dashboard -----------------------------
import Categories from "./pages/client_dashboard/Categories";
import Category from "./pages/client_dashboard/Category";
import DashboardClient from "./pages/client_dashboard/ClientDashboard";
import CommandsClient from "./pages/client_dashboard/Commands";
import Favorites from "./pages/client_dashboard/Favorites";
import MessagesClient from "./pages/client_dashboard/Messages";
import SettingsClient from "./pages/client_dashboard/Settings";
import Wishlist from "./pages/client_dashboard/Wishlist";
import BeSeller from "./pages/client_dashboard/BeSeller";
import ProductDetails from "./pages/client_dashboard/ProductDetails";
import Payment from "./pages/client_dashboard/payment";
import ReportSellerPage from "./pages/client_dashboard/Repportseller";
import ResetPasswordModalCl from "./pages/client_dashboard/ResetPasswordModal.js";
import DeleteAccountPage from "./pages/client_dashboard/Deleteacc.js";
import PaymentWishlist from "./pages/client_dashboard/payment wishlist.js";
// ------------Seller Dashboard ---------------------------
import SellerDashboard from "./pages/seller_dashboard/SellerDashboard";
import CommandsSeller from "./pages/seller_dashboard/Commands";
import MessagesSeller from "./pages/seller_dashboard/Messages";
import SettingsSeller from "./pages/seller_dashboard/Settings";
import DeleteAccountVen from "./pages/seller_dashboard/Deleteacc.js";
import ResetPasswordModalV from "./pages/seller_dashboard/ResetPasswordModal.js";
import AddProduct from "./pages/seller_dashboard/AddProduct";
import EditProduct from "./pages/seller_dashboard/Editproduct.js";
import ProductDetailsVen from "./pages/seller_dashboard/ProductDetails.js";

// ------------Internaut -------------------
import Internaut from "./pages/internaut/internaut";
import FavoriteInternaut from "./pages/internaut/FavoriteInternaut.js";
import ProductDetailsAlternate from "./pages/internaut/ProductDetailsAlternate.js";

import {Provider} from 'react-redux';
import store from "./store";

import Layout from "./hocs/Layout";
import { checkAuthenticated } from './actions/auth';


function App() {
  useEffect(() => {
     store.dispatch(checkAuthenticated());
   }, []);
  return (
    <Provider store={store}>
       <BrowserRouter>
      <Layout>
        <Routes>
          {/*---------------- landing page routes ----------------------*/ }
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contactus" element={<ContactUs />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/faq" element={<FaqPage />} />
          {/*---------------- authentication routes ----------------------*/ }
          <Route exact path="/activate/:uid/:token" element={<Activate />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/reset_password" element={<ResetPassword />} />
          <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* <Route exact path="/facebook" element={<Facebook />} />
          <Route exact path="/google" element={<Google />} /> */}
          {/*---------------- client dashboard routes ----------------------*/ }
          <Route exact path="/client-dashboard" element={<DashboardClient />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/category/:categoryId" element={<Category />} />
          {/* <Route exact path="/category/:categoryId" render={(props) => <Category {...props} />} /> */}
          {/* <Route exact path="/category" element={<Category />} /> */}
          <Route exact path="/commands-client" element={<CommandsClient />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/messages-client" element={<MessagesClient />} />       
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/be-seller" element={<BeSeller />} />
          <Route exact path="/settings-client" element={<SettingsClient />} /> 
          <Route exact path="/product-details/:productId" element={<ProductDetails />} />
          <Route exact path="/payment/order/:productId" element={<Payment />} />
          <Route exact path="/report-seller/:vendorId" element={<ReportSellerPage />} />
          <Route exact path="/change-password" element={<ResetPasswordModalCl />} />
          <Route exact path="/confirm-delete" element={<DeleteAccountPage />} />
          <Route exact path="/payment/order/from-wishlist/:total" element={<PaymentWishlist />} />
          {/*---------------- seller dashboard routes ----------------------*/ }
          <Route path="/seller-dashboard/:vendorId" element={<SellerDashboard />} />
          <Route exact path="/messages-seller" element={<MessagesSeller />} />
          <Route exact path="/commands-seller" element={<CommandsSeller />} />
          <Route exact path="/settings-seller" element={<SettingsSeller />} /> 
          <Route exact path="/change-password-seller" element={<ResetPasswordModalV />} />
          <Route exact path="/confirm-delete-seller" element={<DeleteAccountVen />} />
          <Route exact path="/add-product" element={<AddProduct />} /> 
          <Route exact path="/edit-product/:productId" element={<EditProduct/>} />
          <Route exact path="/product-details-vendor/:productId" element={<ProductDetailsVen/>} />
          {/*---------------- internaut routes ----------------------*/ }
          <Route exact path="/internaut" element={<Internaut />} /> 
          <Route exact path="/favorite-internaut" element={<FavoriteInternaut />} /> 
          <Route exact path="/product-details-alternate/:productId" element={<ProductDetailsAlternate />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
    </Provider>
  );
}

export default App;


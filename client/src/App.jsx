// src/App.jsx
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomeBaber from "./pages/HomeBaber";
import About from "./pages/About";
import Team from "./pages/Team";
import ServicesPrice from "./pages/Services&Pricing";
import Gallery from "./pages/Gallery";

import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Shop from "./pages/Shop";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

import AdminFE from "./routes/admin/AdminFE";
import DetailsFe from "./pages/DetailsFE";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Premium from "./Components/Premium";
import RegisterStaff from "./Components/button/RegisterStaff";
import EditAppoin from "./Components/Admin/EditAppoin";

// 👉 import Chatbot
import Chatbot from "./pages/Chatbot";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar chỉ hiển thị khi không phải admin */}
      {!isAdminRoute && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      {/* thêm pt-16 để chừa chỗ cho Navbar cao 64px */}
      <main className={!isAdminRoute ? "pt-16" : ""}>
        <Routes>
          {/* Frontend routes */}
          <Route path="/" element={<HomeBaber />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPrice />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services/details/:id" element={<DetailsFe />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/registerStaff" element={<RegisterStaff />} />
          <Route path="/edit-appoint/:id" element={<EditAppoin />} />

          {/* Auth routes */}
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />}
          />
          <Route path="/register" element={<RegisterForm />} />

          {/* Member routes */}
          <Route path="/mybookings" element={<MyBookings />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminFE />} />
        </Routes>
      </main>

      {/* Footer chỉ hiển thị khi không phải admin */}
      {!isAdminRoute && <Footer />}

      {/* 👉 Chatbot luôn hiển thị ở mọi trang (trừ admin nếu muốn) */}
      {!isAdminRoute && <Chatbot />}
    </div>
  );
}

export default App;
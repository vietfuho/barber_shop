<<<<<<< HEAD
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomeBaber from './pages/HomeBaber';
import About from './pages/About';
import Team from './pages/Team';
import ServicesPrice from './pages/Services&Pricing';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import Footer from './Components/Footer';
import Profile from './pages/Profile';
=======
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
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Shop from "./pages/Shop";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
>>>>>>> 340f0b5 (update: merge code phần của tôi lên main)

import AdminFE from "./routes/admin/AdminFE";
import DetailsFe from "./pages/DetailsFE";
import MyBookings from "./pages/MyBookings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");


  return (
    <>
<<<<<<< HEAD
      <AdminFE />
      {/* Navbar nhận props để đổi giao diện */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* thêm pt-16 để chừa chỗ cho Navbar cao 64px */}
      <main className="pt-16">
=======
      {!isAdminRoute && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <main className={!isAdminRoute ? "pt-16" : ""}>
>>>>>>> 340f0b5 (update: merge code phần của tôi lên main)
        <Routes>
          {/* Frontend routes */}
          <Route path="/" element={<HomeBaber />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPrice />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shop" element={<Shop />} />
<<<<<<< HEAD
          <Route path="/services/details" element={<DetailsServices />} />
          <Route path="/profile" element={<Profile />} />


          {/* LoginForm gọi onLoginSuccess để cập nhật Navbar */}
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />}
          />

          {/* RegisterForm chỉ cần form, sau khi đăng ký thì navigate sang /login */}
=======
          <Route path="/services/details/:id" element={<DetailsFe />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />} />
>>>>>>> 340f0b5 (update: merge code phần của tôi lên main)
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mybookings" element={<MyBookings />} />

<<<<<<< HEAD
          {/* admin routes */}


=======
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminFE />} />
>>>>>>> 340f0b5 (update: merge code phần của tôi lên main)
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;

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

import DetailsServices from './pages/DetailsServices';
import AdminFE from './routes/admin/AdminFE';

function App() {
  // ✅ trạng thái đăng nhập toàn cục
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <AdminFE/>
      {/* Navbar nhận props để đổi giao diện */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* thêm pt-16 để chừa chỗ cho Navbar cao 64px */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomeBaber />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPrice />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services/details" element={<DetailsServices />} />


          {/* LoginForm gọi onLoginSuccess để cập nhật Navbar */}
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />}
          />

          {/* RegisterForm chỉ cần form, sau khi đăng ký thì navigate sang /login */}
          <Route path="/register" element={<RegisterForm />} />

          {/* admin routes */}
         

        </Routes>

        <Footer />
      </main>
    </>
  );
}

export default App;
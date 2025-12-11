import React from 'react';
import HeroSection from '../Components/HeroSection';
import FeaturedServices from '../Components/FeaturedServices';

// import ảnh nền riêng cho trang Home
import backgroundHome from '../assets/image/backgroundHome.png';
import Chatbot from "./Chatbot" 

const HomeBaber = () => {
  return (
    <div>
      <div>
         <Chatbot/>
         <HeroSection
        title="Khẳng Định"
        subtitle="Phong Cách Nam"
        image={backgroundHome}
      />
      <FeaturedServices />
      </div>
      
     
    </div>
  );
};

export default HomeBaber;
import React from 'react';
import HeroSection from '../Components/HeroSection';
import FeaturedServices from '../Components/FeaturedServices';

// import ảnh nền riêng cho trang Home
import backgroundHome from '../assets/image/backgroundHome.png';

const HomeBaber = () => {
  return (
    <div>
      <HeroSection
        title="Khẳng Định"
        subtitle="Phong Cách Nam"
        image={backgroundHome}
      />
      <FeaturedServices />
    </div>
  );
};

export default HomeBaber;
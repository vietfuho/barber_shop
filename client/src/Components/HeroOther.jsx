import React from 'react';

const HeroOther = ({ title, subtitle, image }) => {
  return (
    <section className="relative h-[250px] md:h-[380px] w-full flex items-center justify-center">
      {/* Background */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Nội dung */}
      <div className="relative z-10 text-center px-4 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && (
          <p className="text-sm md:text-base opacity-90">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default HeroOther;
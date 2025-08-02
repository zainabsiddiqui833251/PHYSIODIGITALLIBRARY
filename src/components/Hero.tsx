'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="w-full h-fit p-6 bg-[url('/images/herobg.png')] bg-cover bg-center ">
      <div className="relative w-64 h-fit md:w-80 md:h-fit m-auto justify-center items-center">
        <img src="/images/physioshelflogo.png" alt="PhysiologyShelf Logo" />
      </div>
    </section>
  );
};

export default Hero;

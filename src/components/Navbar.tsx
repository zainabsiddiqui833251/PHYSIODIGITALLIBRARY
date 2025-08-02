import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#f7ebf9] border-b-2 border-[#d7b4f3] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-[#6b4089] text-2xl md:text-4xl font-extrabold tracking-wide">
            &#128366; PhysiologyShelf
          </span>
        </div>

        <div className="hidden md:block">
          <h3 className="text-[#8a4db9] text-base italic font-medium">
            “Bringing Physiology to Your Fingertips”
          </h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

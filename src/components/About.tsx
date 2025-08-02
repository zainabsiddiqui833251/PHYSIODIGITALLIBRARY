'use client';
import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <section id="about-tabs" className="bg-[#fdf6fd] text-gray-800 py-12 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-[#d7b4f3] mb-6">
          {['about', 'aims'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 font-semibold transition-all duration-300 text-sm sm:text-base
                ${activeTab === tab ? 'text-[#6b4089]' : 'text-gray-600 hover:text-[#6b4089]'}
                group`}
            >
              {tab === 'about' ? 'About' : 'Aims & Objectives'}

              {/* Underline animation */}
              <span
                className={`absolute left-1/2 -bottom-[2px] h-[2px] bg-[#6b4089] transition-all duration-300 
                ${activeTab === tab ? 'w-full left-0' : 'w-0 group-hover:w-full group-hover:left-0'}`}
              ></span>
            </button>
          ))}
        </div>

        {/* About Content */}
        {activeTab === 'about' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#6b4089]">About Physiology Shelf</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Physiology Shelf</strong> is a curated digital library dedicated to providing high-quality
              resources in the field of physiology. Our platform brings together thousands of books, notes, and
              study materials in both English and Urdu, making learning accessible and organized. Whether you're
              a student, teacher, or researcher, this space is designed to simplify your study journey by
              offering quick <strong>Read Now</strong> access and easy download options — all in one place.
            </p>
          </div>
        )}

        {/* Aims & Objectives Content */}
        {activeTab === 'aims' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#6b4089]">Aims & Objectives</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3 text-lg">
              <li>To offer a centralized platform for digital physiology books and notes.</li>
              <li>To provide resources in both English and Urdu for broader accessibility.</li>
              <li>To support students with quick-access downloads and real-time reading tools.</li>
              <li>To encourage organized, self-paced learning through filtered search and categorized content.</li>
              <li>To continually expand the library based on user needs and academic standards.</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-us min-h-[75vh]">
      {/* Hero Section */}
      <div
        className="w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1504674900247-0877df9cc836")`,
        }}
      >
        <div className="text-center bg-black bg-opacity-50 p-6 rounded-md max-w-lg">
          <h1 className="text-5xl font-bold text-white mb-4">Order Now 🍴</h1>
          <p className="text-lg text-gray-200">
            Discover the passion behind every dish we serve. Crafted with love,
            delivered with care.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="p-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images3.alphacoders.com/922/thumb-1920-922680.jpg"
              alt="Quality"
              className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Sourced from the best, prepared with precision.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
              alt="Variety"
              className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500 mb-2">
              Endless Variety
            </h3>
            <p className="text-gray-600">
              From street favorites to gourmet delights, we’ve got it all.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Experience"
              className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500 mb-2">
              A Culinary Experience
            </h3>
            <p className="text-gray-600">
              More than just food—it’s a journey of flavors.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div
        className="p-8 md:p-16 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url("https://wallpapers.com/images/featured/indian-food-x2tv62mgy6kq4or3.jpg")`,
        }}
      >
        <h2 className="text-4xl font-bold text-center mb-6">
          Our Mission, Your Satisfaction
        </h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          To redefine food delivery with exceptional service and unforgettable
          meals. We believe in creating moments of joy, one bite at a time.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="p-8 text-center bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Explore?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Experience the finest dishes and the best service in town. Let's
          indulge together.
        </p>
        <Link
          to="/menu"
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600"
        >
          Check Out Our Menu
        </Link>
      </div>
    </div>
  );
};

export default About;

import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-50 dark:bg-gray-900 py-20 px-6 md:px-20 scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          About Our Store
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          Welcome to <span className="font-semibold text-indigo-600">Sport-X</span>, your ultimate destination for premium football gear. 
          We bring top brands, expert-curated products, and the latest football accessories right to your fingertips.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Our mission is to empower players of all levels — from beginners to professionals — to perform their best. 
          Quality, style, and innovation drive everything we do, ensuring you get nothing but the best on and off the field.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <a
            href="#shop"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Shop Now
          </a>
          <a
            href="#contact"
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;

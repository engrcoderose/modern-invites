import React from "react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-sage-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-elegant font-bold text-sage-700">
              Modern Invites
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#gallery"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Gallery
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-sage-600 transition-colors"
            >
              Pricing
            </a>
            <button className="bg-sage-600 text-white px-6 py-2 rounded-full hover:bg-sage-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

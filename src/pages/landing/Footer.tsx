import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-2xl font-elegant font-bold text-white mb-4">
              Modern Invites
            </h4>
            <p className="text-gray-400">
              Creating elegant digital invitations for every special moment.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Product</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-sage-400 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Modern Invites. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

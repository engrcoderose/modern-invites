"use client";

import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4e2a0d] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-[#c79d5f] fill-[#c79d5f]" />
          </div>

          {/* Names */}
          <div>
            <h3 className="text-5xl font-imperial mb-2">Eric & Li</h3>
            <p className="text-[#eae4cc] text-sm tracking-wider font-medium">
              JUNE 20, 2026
            </p>
          </div>

          {/* Message */}
          <div className="max-w-md mx-auto">
            <p className="text-[#eae4cc]/80 text-sm leading-relaxed font-medium">
              Thank you for being part of our special day.
              <br />
              Your presence means the world to us.
            </p>
          </div>

          {/* Divider */}
          <div className="w-20 h-px bg-[#c79d5f]/50 mx-auto" />

          {/* Copyright */}
          <p className="text-[#eae4cc]/60 text-xs font-medium">
            © {currentYear} Eric & Li Wedding. All rights reserved.
          </p>

          {/* Credits */}
          <p className="text-[#eae4cc]/40 text-xs font-medium">
            Made with <Heart className="w-3 h-3 inline fill-[#c79d5f] text-[#c79d5f]" /> by Modern Invites
          </p>
        </div>
      </div>
    </footer>
  );
}


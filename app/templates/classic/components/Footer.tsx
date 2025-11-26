"use client";

import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-rose-900 to-blue-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-rose-300 fill-rose-300" />
          </div>

          {/* Names */}
          <div>
            <h3 className="text-3xl font-serif mb-2">Emily & James</h3>
            <p className="text-rose-200 text-sm tracking-wider">
              JUNE 20, 2026
            </p>
          </div>

          {/* Message */}
          <div className="max-w-md mx-auto">
            <p className="text-white/80 text-sm leading-relaxed">
              Thank you for being part of our special day.
              <br />
              Your presence means the world to us.
            </p>
          </div>

          {/* Divider */}
          <div className="w-20 h-px bg-white/30 mx-auto" />

          {/* Copyright */}
          <p className="text-white/60 text-xs">
            © {currentYear} Emily & James Wedding. All rights reserved.
          </p>

          {/* Credits */}
          <p className="text-white/40 text-xs">
            Made with <Heart className="w-3 h-3 inline fill-rose-400 text-rose-400" /> by Modern Invites
          </p>
        </div>
      </div>
    </footer>
  );
}


"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-yellow-100 to-yellow-200 text-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-600" />
          </div>

          {/* Message */}
          <div className="max-w-md mx-auto">
            <p className="text-gray-700 text-sm leading-relaxed">
              Rara Events Center © {currentYear}. All Rights Reserved.
            </p>
          </div>

          {/* Divider */}
          <div className="w-20 h-px bg-yellow-400 mx-auto" />

          {/* Credits */}
          <p className="text-gray-600 text-xs">
            Made with <span className="text-yellow-600">❤️</span> by Modern Invites
          </p>
        </div>
      </div>
    </footer>
  );
}

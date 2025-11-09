import React from "react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold text-gray-900 mb-6 leading-tight">
              Elegant E-Invites for{" "}
              <span className="text-gradient">Every Occasion</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create beautiful, personalized digital invitations that leave a
              lasting impression. Perfect for weddings, birthdays, corporate
              events, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-sage-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-sage-700 transition-all transform hover:scale-105 shadow-lg shadow-sage-200">
                Create Your Invite
              </button>
              <button className="border-2 border-sage-600 text-sage-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-sage-50 transition-all">
                View Examples
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="h-4 bg-sage-200 rounded w-3/4"></div>
                  <div className="h-4 bg-sage-100 rounded w-1/2"></div>
                  <div className="mt-8 space-y-3">
                    <div className="h-32 bg-gradient-to-br from-sage-300 to-sage-400 rounded-lg"></div>
                    <div className="h-4 bg-sage-200 rounded w-full"></div>
                    <div className="h-4 bg-sage-100 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-sage-300 rounded-3xl opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

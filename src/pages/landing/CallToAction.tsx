import React from "react";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-sage-600 to-sage-800 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-elegant font-bold mb-6">
            Ready to Create Your Perfect Invitation?
          </h3>
          <p className="text-xl mb-8 text-sage-100">
            Join thousands of satisfied customers who have made their events
            unforgettable
          </p>
          <button className="bg-white text-sage-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-sage-50 transition-all transform hover:scale-105 shadow-lg">
            Start Creating Now
          </button>
        </div>
      </div>
    </section>
  );
}

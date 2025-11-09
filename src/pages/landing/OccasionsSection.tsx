import React from 'react'

export default function OccasionsSection() {
    return (
        <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-sage-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 mb-4">
              Perfect for <span className="text-sage-600">Any Occasion</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Weddings', 'Birthdays', 'Corporate Events', 'Anniversaries'].map((occasion, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="aspect-square bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-4xl">💐</span>
                    </div>
                    <h4 className="text-2xl font-elegant font-semibold text-white">{occasion}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}
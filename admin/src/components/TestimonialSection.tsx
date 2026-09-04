import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TestimonialSection: React.FC = () => {
  const { testimonials } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Bukti Kepuasan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Ulasan nyata dari para kreator, pelajar, dan pengguna yang telah mempercayakan kebutuhan digitalnya kepada kami.
          </p>
        </div>

        {/* Carousel / Grid on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-3xl p-7 border border-white/10 flex flex-col justify-between space-y-5 relative group"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/[0.03] group-hover:text-purple-500/10 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* Customer Info */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center space-x-1.5">
                    <span>{item.name}</span>
                    <span title="Pembeli Terverifikasi">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">{item.role}</div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-purple-300 font-medium">
                  {item.productUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, ArrowRight, Clock, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoBanner: React.FC = () => {
  const { settings, products, openProductModal } = useStore();

  // Find promo product or default to CapCut 7 Days
  const promoProduct = products.find(p => p.isPromo) || products[0];

  // Calculate live countdown to promoEndsAt
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 18
  });

  useEffect(() => {
    const targetDate = new Date(settings.promoEndsAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.promoEndsAt]);

  if (!settings.isPromoActive || !promoProduct) return null;

  const handleClaimPromo = () => {
    openProductModal(promoProduct);
  };

  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-card border border-purple-500/30 p-8 sm:p-12 shadow-glow-md">
          {/* Background Gradient Mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] pointer-events-none rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 blur-[100px] pointer-events-none rounded-full"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30 text-red-300 text-xs font-bold tracking-wider uppercase">
                <Tag className="w-3.5 h-3.5 text-red-400" />
                <span>LIMITED OFFER</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                {settings.promoTitle}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {settings.promoSubtitle} Dapatkan akses instan sekarang sebelum promo berakhir!
              </p>

              {/* Deal Item Box */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#090b13] border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-white">{promoProduct.name}</div>
                    <div className="text-xs text-purple-300">Paket {promoProduct.package}</div>
                  </div>
                </div>

                <div className="flex items-baseline space-x-2 sm:border-l sm:border-white/10 sm:pl-4">
                  <span className="text-gray-500 line-through text-xs sm:text-sm">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(promoProduct.originalPrice || 15000)}
                  </span>
                  <span className="text-2xl font-black text-white">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(promoProduct.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Countdown & Button */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-5">
              <div className="text-center lg:text-right space-y-2">
                <div className="text-xs text-gray-400 flex items-center justify-center lg:justify-end space-x-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Promo Berakhir Dalam:</span>
                </div>

                {/* Countdown Digit Blocks */}
                <div className="flex items-center space-x-2">
                  <div className="w-14 py-2 rounded-xl bg-[#0a0d17] border border-white/10 text-center">
                    <span className="font-display font-extrabold text-xl text-white">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] uppercase text-gray-400">Jam</span>
                  </div>
                  <span className="text-white font-bold text-lg">:</span>
                  <div className="w-14 py-2 rounded-xl bg-[#0a0d17] border border-white/10 text-center">
                    <span className="font-display font-extrabold text-xl text-white">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] uppercase text-gray-400">Menit</span>
                  </div>
                  <span className="text-white font-bold text-lg">:</span>
                  <div className="w-14 py-2 rounded-xl bg-[#0a0d17] border border-purple-500/30 text-center shadow-glow-sm">
                    <span className="font-display font-extrabold text-xl text-purple-400">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] uppercase text-purple-300/70">Detik</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClaimPromo}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group shimmer-btn"
              >
                <span>Klaim Promo Ini</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

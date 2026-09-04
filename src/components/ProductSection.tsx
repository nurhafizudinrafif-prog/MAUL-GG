import React from 'react';
import { Check, Flame, MessageSquare, ShoppingCart, Sparkles, Film, PlayCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ProductSection: React.FC = () => {
  const { products, openProductModal, generateWhatsAppOrderUrl } = useStore();

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getProductIcon = (name: string) => {
    if (name.toLowerCase().includes('capcut')) {
      return <Film className="w-5 h-5 text-purple-400" />;
    }
    return <PlayCircle className="w-5 h-5 text-red-400" />;
  };

  return (
    <section id="products" className="py-20 relative">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Premium Digital Products
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Pilih layanan digital yang sesuai dengan kebutuhanmu. Seluruh transaksi dijamin aman, proses instan, dan bergaransi penuh.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map(product => {
            const isBestSeller = product.isBestSeller;

            return (
              <div
                key={product.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2.5 ${
                  isBestSeller
                    ? 'glass-card border-purple-500/60 shadow-glow-md hover:shadow-glow-lg md:-translate-y-2 bg-gradient-to-b from-[#181c30] to-[#0f121d]'
                    : 'glass-card border-white/10 hover:border-purple-500/40 hover:shadow-glow-sm bg-[#0d101a]'
                }`}
              >
                {/* Best Seller Badge Ribbon */}
                {isBestSeller && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center space-x-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-purple-600/30 animate-pulse-subtle">
                      <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-bounce" />
                      <span>BEST SELLER</span>
                    </span>
                  </div>
                )}

                {/* Card Header & Content */}
                <div className="p-6 sm:p-7 space-y-6">
                  {/* Top Bar: Icon, Category & Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-500/40 transition-all">
                        {getProductIcon(product.name)}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <div className="text-xs text-gray-300 font-medium">Digital License</div>
                      </div>
                    </div>

                    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Tersedia</span>
                    </span>
                  </div>

                  {/* Title & Package Duration */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight font-display group-hover:text-purple-200 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-purple-300">
                        Paket {product.package}
                      </span>
                      {isBestSeller && (
                        <span className="inline-flex items-center space-x-1 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-medium">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>18+ Terjual Hari Ini</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-1 pb-2 border-y border-white/5 space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {formatRupiah(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatRupiah(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">Harga nett, tanpa biaya tersembunyi</p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
                      Fitur Termasuk:
                    </span>
                    <ul className="space-y-2.5">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-300">
                          <div className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-500/30 transition-colors">
                            <Check className="w-2.5 h-2.5 text-purple-400" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 sm:p-7 pt-0 space-y-3">
                  {/* Primary CTA: Beli Sekarang */}
                  <button
                    onClick={() => openProductModal(product)}
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] shimmer-btn ${
                      isBestSeller
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-glow-sm hover:shadow-glow-md'
                        : 'bg-white/10 hover:bg-purple-600 text-white border border-white/10 hover:border-purple-500/30'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Beli Sekarang</span>
                  </button>

                  {/* Secondary CTA: WhatsApp Quick Order */}
                  <a
                    href={generateWhatsAppOrderUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safe Purchase Disclaimer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-gray-400 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Semua layanan bergaransi ganti akun/perbaikan jika mengalami kendala teknis selama masa aktif.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

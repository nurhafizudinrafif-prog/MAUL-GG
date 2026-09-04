import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Flame, Star, QrCode } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { products, openProductModal } = useStore();

  const handleOrderNow = () => {
    const targetProduct = products.find(p => p.isBestSeller) || products[0];
    if (targetProduct) {
      openProductModal(targetProduct);
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Ambient Glow & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Purple Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-purple-700/25 via-indigo-600/25 to-blue-500/15 blur-[130px] rounded-full animate-pulse-glow"></div>
        {/* Secondary Cyan Glow */}
        <div className="absolute bottom-10 right-10 w-[380px] h-[380px] bg-cyan-500/15 blur-[120px] rounded-full animate-float-slow"></div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium animate-pulse-subtle shadow-glow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Toko Layanan Digital Terpercaya & Termurah</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Upgrade Your <br className="hidden sm:inline" />
              <span className="text-gradient">Digital Experience.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Akses layanan digital premium dengan harga terjangkau, proses mudah, dan pelayanan yang responsif. Didesain khusus untuk kreator, pelajar, dan pecinta streaming.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-base shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[1.02] active:scale-[0.98] shimmer-btn"
              >
                <span>Lihat Produk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-white/10 text-gray-200 hover:text-white font-semibold text-base transition-all duration-300 border border-white/10 hover:border-purple-500/40 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Order Sekarang</span>
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Aktivasi 5-15 Menit</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Garansi Penuh Sesuai Paket</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>CS Aktif Setiap Hari</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Tech Showcase & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Center Phone / Device Frame Mockup */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] p-2 rounded-[36px] bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/10 shadow-2xl shadow-purple-950/40 group">
              {/* Outer Neon Glow Ring */}
              <div className="absolute -inset-1 rounded-[38px] bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-indigo-600/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              <div className="relative rounded-[30px] bg-[#0c0e17] overflow-hidden border border-white/5 p-5 space-y-4">
                {/* Header App Mockup */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-400 shadow-glow-sm">
                      RX
                    </div>
                    <span className="text-xs font-semibold text-gray-200">RAFIF RXFIF STORE</span>
                  </div>

                  {/* Live Equalizer + Status */}
                  <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <div className="flex items-end space-x-[2px] h-3">
                      <span className="w-[3px] bg-emerald-400 rounded-full eq-bar-1"></span>
                      <span className="w-[3px] bg-emerald-400 rounded-full eq-bar-2"></span>
                      <span className="w-[3px] bg-emerald-400 rounded-full eq-bar-3"></span>
                      <span className="w-[3px] bg-emerald-400 rounded-full eq-bar-4"></span>
                    </div>
                    <span className="text-[10px] text-emerald-300 font-semibold">Live Store</span>
                  </div>
                </div>

                {/* Featured Mock Item: CapCut Pro */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/50 via-indigo-950/30 to-[#121524] border border-purple-500/30 space-y-3 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-purple-600 text-white flex items-center space-x-1 shadow-glow-sm">
                          <Flame className="w-3 h-3 text-amber-300 fill-amber-300" />
                          <span>BEST SELLER</span>
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white pt-1">CapCut Premium</h4>
                      <p className="text-xs text-purple-200">Paket 1 Bulan Penuh</p>
                    </div>
                    <span className="text-base font-extrabold text-white">Rp35.000</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                    <div className="p-2 rounded-lg bg-white/5 flex items-center space-x-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>No Watermark</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 flex items-center space-x-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Export 4K 60FPS</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const item = products.find(p => p.id === 'capcut-1m') || products[0];
                      if (item) openProductModal(item);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-glow-sm hover:opacity-95 transition-all shimmer-btn active:scale-95"
                  >
                    Beli Paket Ini
                  </button>
                </div>

                {/* Secondary Mock Item: YouTube Premium */}
                <div className="p-3 rounded-xl bg-[#141827] border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-bold">
                      YT
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">YouTube Premium</h5>
                      <p className="text-[11px] text-gray-400">Bebas Iklan + YT Music</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-white">Rp10.000</div>
                    <span className="text-[10px] text-emerald-400">Tersedia</span>
                  </div>
                </div>

                {/* Secure Payment Badges (QRIS Tunggal) */}
                <div className="pt-2 flex items-center justify-between text-[10px] text-gray-400 border-t border-white/5">
                  <div className="flex items-center space-x-1">
                    <QrCode className="w-3.5 h-3.5 text-purple-400" />
                    <span>Metode: QRIS Otomatis (Semua Bank & E-Wallet)</span>
                  </div>
                  <span className="text-purple-300 font-semibold bg-purple-500/10 px-1.5 py-0.5 rounded">Instan</span>
                </div>
              </div>
            </div>

            {/* Floating Glass Pill 1: Instant Activation (Top-Right) */}
            <div className="absolute -top-4 -right-2 sm:-right-6 glass-card p-3 rounded-2xl shadow-xl border border-white/10 flex items-center space-x-2.5 animate-float-slow hidden sm:flex z-20">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-glow-sm">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Aktivasi Instan</div>
                <div className="text-[10px] text-gray-400">Rata-rata 5-10 menit</div>
              </div>
            </div>

            {/* Floating Glass Pill 2: Rating & Reviews (Left-Side) */}
            <div className="absolute top-1/2 -left-4 sm:-left-10 -translate-y-1/2 glass-card p-3 rounded-2xl shadow-xl border border-white/10 flex items-center space-x-2.5 animate-float-reverse hidden lg:flex z-20">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-glow-sm">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-1">
                  <span>4.9 / 5.0</span>
                  <span className="text-amber-400 text-[10px]">★★★★★</span>
                </div>
                <div className="text-[10px] text-gray-400">1,400+ Pengguna Puas</div>
              </div>
            </div>

            {/* Floating Glass Pill 3: 100% Secure (Bottom-Right) */}
            <div
              className="absolute -bottom-6 -right-2 sm:-right-6 glass-card p-3 rounded-2xl shadow-xl border border-white/10 flex items-center space-x-2.5 animate-float-slow hidden sm:flex z-20"
              style={{ animationDelay: '2.5s' }}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-glow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">100% Aman & Bergaransi</div>
                <div className="text-[10px] text-gray-400">Support siap mendampingi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

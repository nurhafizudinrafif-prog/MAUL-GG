import React from 'react';
import { ShoppingBag, QrCode, Sparkles, ArrowRight } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'PILIH PRODUK',
      desc: 'Pilih layanan digital dan durasi paket yang Anda butuhkan melalui katalog produk kami.',
      icon: ShoppingBag,
      color: 'from-purple-500 to-indigo-500',
      badge: 'Langkah Awal'
    },
    {
      step: '02',
      title: 'LAKUKAN PEMBAYARAN',
      desc: 'Scan kode QRIS resmi toko kami menggunakan m-Banking atau E-Wallet apa saja (BCA, Mandiri, BRI, DANA, GoPay, OVO, ShopeePay, dll). Bebas biaya admin & proses instan.',
      icon: QrCode,
      color: 'from-indigo-500 to-blue-500',
      badge: 'Scan QRIS Mudah & Cepat'
    },
    {
      step: '03',
      title: 'PRODUK DIPROSES',
      desc: 'Ikuti instruksi pengiriman atau aktivasi akun via WhatsApp CS. Akun siap digunakan dalam 5–15 menit.',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Aktivasi Instan'
    }
  ];

  return (
    <section id="how-to-order" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Panduan Pembelian
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            How To Order
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Hanya 3 langkah sederhana untuk menikmati layanan digital premium favorit Anda.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-purple-500/50 -translate-y-8 z-0 animate-gradient-flow"></div>

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-3xl p-7 border border-white/10 relative z-10 space-y-5 flex flex-col justify-between group hover:border-purple-500/50 hover:shadow-glow-md transition-all duration-300 hover:-translate-y-2"
              >
                {/* Background soft glow on hover */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-purple-600/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div className="space-y-4 relative z-10">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] shadow-glow-sm group-hover:scale-110 group-hover:shadow-glow-md transition-all duration-300`}
                    >
                      <div className="w-full h-full bg-[#0d101c] rounded-[15px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors" />
                      </div>
                    </div>

                    <span className="font-display font-black text-3xl sm:text-4xl text-white/20 group-hover:text-purple-400/40 tracking-tighter transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                      {item.badge}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide font-display group-hover:text-purple-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center text-xs text-purple-400 font-medium group-hover:translate-x-1 transition-transform relative z-10">
                  <span>Langkah {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

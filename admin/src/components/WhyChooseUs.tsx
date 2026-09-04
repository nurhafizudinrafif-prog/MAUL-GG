import React from 'react';
import { DollarSign, Sliders, Zap, Headphones, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhyChooseUs: React.FC = () => {
  const { settings } = useStore();

  const reasons = [
    {
      title: 'Affordable',
      subtitle: 'Harga Terjangkau',
      desc: 'Menawarkan harga paling bersahabat untuk pelajar, mahasiswa, dan kreator tanpa mengorbankan kualitas layanan.',
      icon: DollarSign,
      color: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-500/40'
    },
    {
      title: 'Simple',
      subtitle: 'Proses Order Sederhana',
      desc: 'Mekanisme pemesanan intuitif langsung dari website tanpa perlu instalasi aplikasi tambahan atau alur berbelit-belit.',
      icon: Sliders,
      color: 'text-purple-400',
      borderGlow: 'hover:border-purple-500/40'
    },
    {
      title: 'Fast',
      subtitle: 'Proses Cepat',
      desc: 'Aktivasi dan pengiriman pesanan dilakukan dengan cepat sesuai ketersediaan, rata-rata hanya 5–15 menit.',
      icon: Zap,
      color: 'text-amber-400',
      borderGlow: 'hover:border-amber-500/40'
    },
    {
      title: 'Support',
      subtitle: 'Bantuan Responsif',
      desc: 'Customer support yang ramah dan siap mendampingi hingga akun Anda aktif dan dapat digunakan dengan normal.',
      icon: Headphones,
      color: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-500/40'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-[#0b0e17]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Nilai Utama Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Why Choose {settings.storeName}?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Kami mengutamakan kepercayaan, kepuasan, dan kenyamanan pelanggan dalam setiap transaksi layanan digital.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`glass-card glass-card-hover rounded-3xl p-6 border border-white/10 transition-all duration-300 space-y-4 ${item.borderGlow}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-display flex items-center space-x-1.5">
                    <span>{item.title}</span>
                  </h3>
                  <div className="text-xs font-semibold text-purple-300">{item.subtitle}</div>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1">{item.desc}</p>
                </div>

                <div className="pt-2 flex items-center space-x-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Komitmen Layanan</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

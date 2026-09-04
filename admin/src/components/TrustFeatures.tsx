import React from 'react';
import { Zap, ShieldCheck, Gem, MessageCircle } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: Zap,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-transparent',
      title: 'PROSES MUDAH',
      desc: 'Order dengan cepat dan sederhana tanpa langkah yang rumit.'
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-transparent',
      title: 'AMAN & TERPERCAYA',
      desc: 'Data pelanggan ditangani dengan baik dan privasi terlindungi.'
    },
    {
      icon: Gem,
      color: 'text-purple-400',
      bgGlow: 'from-purple-500/10 to-transparent',
      title: 'HARGA TERJANGKAU',
      desc: 'Layanan digital premium kualitas terbaik dengan harga bersahabat.'
    },
    {
      icon: MessageCircle,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-transparent',
      title: 'CUSTOMER SUPPORT',
      desc: 'Support responsif siap membantu ketika Anda mengalami kendala.'
    }
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-2xl p-5 border border-white/5 relative overflow-hidden group"
              >
                {/* Subtle gradient hover */}
                <div
                  className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${feat.bgGlow} blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}
                ></div>

                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className={`w-5 h-5 ${feat.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-wider text-white uppercase font-display">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

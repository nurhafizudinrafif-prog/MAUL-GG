import React, { useState, useEffect } from 'react';
import { CheckCircle, Zap, ShieldCheck, X, Sparkles } from 'lucide-react';

interface NotificationItem {
  id: number;
  name: string;
  city: string;
  action: string;
  product: string;
  timeAgo: string;
  iconType: 'order' | 'received' | 'verified';
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    name: 'Dimas S.',
    city: 'Bandung',
    action: 'baru saja memesan',
    product: 'CapCut Pro 1 Bulan',
    timeAgo: '2 menit lalu',
    iconType: 'order'
  },
  {
    id: 2,
    name: 'Fajar R.',
    city: 'Surabaya',
    action: 'menerima akun & password',
    product: 'YouTube Premium',
    timeAgo: '4 menit lalu',
    iconType: 'received'
  },
  {
    id: 3,
    name: 'Sarah A.',
    city: 'Jakarta Selatan',
    action: 'baru saja order',
    product: 'CapCut Pro 7 Hari',
    timeAgo: 'Baru saja',
    iconType: 'order'
  },
  {
    id: 4,
    name: 'Kevin M.',
    city: 'Medan',
    action: 'berhasil bayar via QRIS',
    product: 'CapCut Pro 1 Bulan',
    timeAgo: '7 menit lalu',
    iconType: 'verified'
  },
  {
    id: 5,
    name: 'Rizky W.',
    city: 'Yogyakarta',
    action: 'aktivasi sukses',
    product: 'CapCut Pro 1 Bulan',
    timeAgo: '11 menit lalu',
    iconType: 'received'
  }
];

export const LiveSalesNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delay before first popup shows
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    // Interval to cycle through notifications
    const cycleInterval = setInterval(() => {
      // Hide current
      setIsVisible(false);

      // Wait 1.5s while hidden, then change to next and show
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 1500);
    }, 8500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleInterval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = NOTIFICATIONS[currentIndex];

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-[320px] sm:max-w-sm transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="glass-card rounded-2xl p-3.5 border border-purple-500/30 shadow-2xl shadow-purple-950/40 relative overflow-hidden backdrop-blur-xl bg-[#0c0e18]/90">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/15 blur-xl rounded-full pointer-events-none"></div>

        {/* Shimmer line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent"></div>

        <div className="flex items-start space-x-3 relative z-10">
          {/* Animated Avatar / Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px] shadow-glow-sm">
              <div className="w-full h-full bg-[#111422] rounded-[11px] flex items-center justify-center font-bold text-xs text-purple-300">
                {current.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0c0e18] flex items-center justify-center text-[9px] text-white font-bold">
              ✓
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-white truncate">{current.name}</span>
              <span className="text-[10px] text-gray-400">({current.city})</span>
            </div>

            <p className="text-[11px] text-gray-300 leading-snug mt-0.5">
              {current.action}{' '}
              <span className="font-semibold text-purple-300">{current.product}</span>
            </p>

            <div className="flex items-center space-x-2 mt-1.5 text-[10px]">
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Terverifikasi</span>
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{current.timeAgo}</span>
            </div>
          </div>

          {/* Close / Dismiss Button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Tutup notifikasi"
            className="text-gray-500 hover:text-gray-300 p-1 rounded-lg hover:bg-white/5 transition-colors absolute top-2 right-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

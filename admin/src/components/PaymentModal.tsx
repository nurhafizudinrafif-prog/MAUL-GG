import React, { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, Clock, ShieldCheck, Download, ExternalLink, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PaymentModal: React.FC = () => {
  const { currentPaymentOrder, closePayment, finishPayment, paymentMethods } = useStore();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown

  // Get active QRIS method
  const qrisMethod = paymentMethods.find(m => m.type === 'qris') || paymentMethods[0];

  // 15-minute countdown timer
  useEffect(() => {
    if (!currentPaymentOrder) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentPaymentOrder]);

  if (!currentPaymentOrder) return null;

  const order = currentPaymentOrder;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleConfirmPaid = () => {
    finishPayment(order);
  };

  const qrisImageUrl = qrisMethod?.qrCodeUrl || '/qris.jpg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card max-w-lg w-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative my-6">
        {/* Top Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500"></div>

        {/* Close Button */}
        <button
          onClick={closePayment}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Header & Countdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1 text-[10px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 mb-1">
                <QrCode className="w-3 h-3" />
                <span>Pembayaran Resmi QRIS</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">
                Scan QRIS untuk Membayar
              </h3>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-bold shrink-0 self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          {/* QRIS Display Container */}
          <div className="p-5 rounded-2xl bg-[#090b13] border border-white/10 space-y-4">
            {/* Merchant Info Banner */}
            <div className="text-center space-y-0.5">
              <div className="text-sm font-bold text-white tracking-wide">
                {qrisMethod?.accountName || 'RNH STORE, DIGITAL & KREATIF'}
              </div>
              <div className="text-[11px] text-gray-400 font-mono">
                {qrisMethod?.accountNumber || 'NMID: ID1026574607879'}
              </div>
            </div>

            {/* The Real Uploaded QR Code Image */}
            <div className="flex flex-col items-center">
              <div className="p-2 bg-white rounded-2xl shadow-xl shadow-purple-950/30 max-w-[280px] sm:max-w-[300px] border-2 border-purple-500/30 group relative">
                <img
                  src={qrisImageUrl}
                  alt="QRIS Standar Pembayaran Nasional - RNH STORE"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>

              {/* Download / Open QRIS button for mobile users */}
              <div className="pt-3">
                <a
                  href={qrisImageUrl}
                  download="QRIS_RAFIF_RXFIF_STORE.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Unduh / Buka Gambar QRIS Penuh</span>
                </a>
              </div>
            </div>

            {/* Total Tagihan Box with Copy */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30">
              <div className="space-y-0.5">
                <span className="text-[10px] text-purple-300 uppercase font-semibold">Total Tagihan Tepat</span>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                  {formatRupiah(order.totalPrice)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(order.totalPrice.toString(), 'amount')}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-medium flex items-center space-x-1.5 transition-colors"
              >
                {copiedText === 'amount' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Nominal</span>
                  </>
                )}
              </button>
            </div>

            {/* Supported Banks & E-wallets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase">
                Mendukung Semua Pembayaran (Bebas Biaya Admin):
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                Scan QRIS di atas melalui aplikasi <strong>BCA, Mandiri, BRI, BNI, DANA, GoPay, OVO, ShopeePay, LinkAja, Seabank</strong>, atau aplikasi perbankan lainnya.
              </p>
            </div>
          </div>

          {/* Action Confirm Payment */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleConfirmPaid}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-base shadow-lg shadow-emerald-950/40 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Check className="w-5 h-5" />
              <span>Saya Sudah Bayar (Verifikasi Pesanan)</span>
            </button>

            <button
              onClick={closePayment}
              className="w-full py-2 text-center text-xs text-gray-400 hover:text-white transition-colors"
            >
              Ubah rincian pesanan atau batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

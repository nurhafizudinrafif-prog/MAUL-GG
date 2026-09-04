import React from 'react';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Copy, Check, Download } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SuccessModal: React.FC = () => {
  const { currentSuccessOrder, closeSuccessModal, generateWhatsAppConfirmationUrl } = useStore();
  const [copiedId, setCopiedId] = React.useState(false);

  if (!currentSuccessOrder) return null;

  const order = currentSuccessOrder;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card max-w-lg w-full rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/30 overflow-hidden relative my-6 text-center">
        {/* Top Celebration Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Animated Success Icon */}
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Transaksi Terverifikasi
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Payment Successful 🎉
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Terima kasih! Pesanan Anda telah berhasil tercatat di sistem kami.
            </p>
          </div>

          {/* Order ID & Status Card */}
          <div className="p-4 rounded-2xl bg-[#090c15] border border-white/10 space-y-3 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Nomor Pesanan</span>
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-mono font-extrabold text-white">
                    {order.id}
                  </span>
                  <button
                    onClick={handleCopyOrderId}
                    className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Salin ID Pesanan"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Status</span>
                <div>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Pembayaran Berhasil</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Produk:</span>
                <span className="font-semibold text-white">
                  {order.productName} ({order.package})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Jumlah / Total:</span>
                <span className="font-semibold text-white">
                  {order.quantity}x — {formatRupiah(order.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nama Pembeli:</span>
                <span className="font-medium text-gray-200">{order.customerName}</span>
              </div>
            </div>
          </div>

          {/* Activation & Delivery Guide */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-left space-y-2">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center space-x-1.5">
              <span>🚀 Instruksi Pengiriman / Aktivasi Akun</span>
            </h4>
            <ol className="space-y-1.5 text-xs text-gray-300 list-decimal list-inside leading-relaxed">
              <li>
                Klik tombol hijau <strong>"Ambil Akun via WhatsApp"</strong> di bawah ini.
              </li>
              <li>
                Sistem otomatis mengirimkan <strong>Nomor Pesanan ({order.id})</strong> ke admin.
              </li>
              <li>
                Admin akan segera mengirimkan kredensial login akun / link aktivasi serta panduan penggunaan dalam waktu <strong>5–15 menit</strong>.
              </li>
            </ol>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3 pt-2">
            <a
              href={generateWhatsAppConfirmationUrl(order)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeSuccessModal}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/40 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Kirim Bukti & Ambil Akun via WhatsApp</span>
            </a>

            <button
              onClick={closeSuccessModal}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors"
            >
              Kembali ke Beranda Toko
            </button>
          </div>

          <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Garansi resmi aktif sejak pesanan berhasil diproses.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

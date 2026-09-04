import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Key,
  Copy,
  Check,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  User,
  Package
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const TrackingModal: React.FC = () => {
  const { isTrackingModalOpen, closeTrackingModal, searchOrder, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const result = searchOrder(searchQuery);
    setFoundOrder(result);
    setHasSearched(true);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
      <div className="glass-card max-w-lg w-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative my-6">
        {/* Top Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500"></div>

        {/* Close Button */}
        <button
          onClick={closeTrackingModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              <Key className="w-3 h-3" />
              <span>Pengambilan Akun Digital</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">
              Pesanan & Terima Akun
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ketik <strong>Nomor Pesanan (#RXFIF-XXXXXX)</strong> atau <strong>Nomor WhatsApp</strong> Anda untuk melihat status dan menerima <strong>Email & Password</strong> akun digital Anda.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setHasSearched(false);
                }}
                placeholder="Contoh: #RXFIF-849201 atau 0895..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0c0f18] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glow-sm transition-all shrink-0"
            >
              Cek Status
            </button>
          </form>

          {/* Search Result */}
          {hasSearched && !foundOrder && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2 animate-fadeIn">
              <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
              <div className="text-xs font-semibold text-white">Pesanan Tidak Ditemukan</div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Pastikan nomor pesanan atau nomor WhatsApp yang Anda masukkan sudah sesuai saat checkout. Jika ragu, hubungi customer support kami.
              </p>
            </div>
          )}

          {foundOrder && (
            <div className="space-y-4 animate-fadeIn">
              {/* Order Overview Card */}
              <div className="p-4 rounded-2xl bg-[#0a0d16] border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Nomor Pesanan</span>
                    <div className="font-mono font-bold text-white text-sm">{foundOrder.id}</div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      foundOrder.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : foundOrder.status === 'paid'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : foundOrder.status === 'processing'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : foundOrder.status === 'cancelled'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {foundOrder.status === 'completed'
                      ? 'Selesai (Akun Aktif)'
                      : foundOrder.status === 'paid'
                      ? 'Dibayar (Diproses)'
                      : foundOrder.status === 'processing'
                      ? 'Sedang Disiapkan'
                      : foundOrder.status === 'cancelled'
                      ? 'Dibatalkan'
                      : 'Menunggu Pembayaran QRIS'}
                  </span>
                </div>

                <div className="space-y-1 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Produk:</span>
                    <span className="font-semibold text-white">
                      {foundOrder.productName} ({foundOrder.package})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Penerima:</span>
                    <span className="text-white">{foundOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="font-bold text-white">{formatRupiah(foundOrder.totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Status Specific Content */}
              {foundOrder.status === 'completed' && foundOrder.credentials ? (
                /* Account Credentials Display */
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#0d151c] to-[#0a1018] border border-emerald-500/40 space-y-3.5 shadow-lg shadow-emerald-950/20">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                    <Key className="w-4 h-4" />
                    <span>DATA AKUN DIGITAL ANDA:</span>
                  </div>

                  {/* Email Box */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 uppercase">Email / Username</span>
                      <div className="font-mono text-xs sm:text-sm font-bold text-white select-all">
                        {foundOrder.credentials.emailOrUser}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(foundOrder.credentials!.emailOrUser, 'email')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                      title="Salin Email"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Box */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 uppercase">Password / Key</span>
                      <div className="font-mono text-xs sm:text-sm font-bold text-purple-300 select-all">
                        {foundOrder.credentials.passwordOrKey}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(foundOrder.credentials!.passwordOrKey, 'pass')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                      title="Salin Password"
                    >
                      {copiedField === 'pass' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Notes & Guide */}
                  {foundOrder.credentials.notes && (
                    <div className="text-[11px] text-gray-300 p-2.5 rounded-lg bg-white/5 border border-white/5 leading-relaxed">
                      <strong>Panduan:</strong> {foundOrder.credentials.notes}
                    </div>
                  )}

                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Garansi aktif selama masa pemakaian. Jangan ubah profil email akun.</span>
                  </div>
                </div>
              ) : foundOrder.status === 'completed' && !foundOrder.credentials ? (
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-xs font-bold text-white">Akun Telah Dikirim via WhatsApp</div>
                  <p className="text-[11px] text-gray-400">
                    Detail akun telah dikirimkan langsung oleh admin ke nomor WhatsApp Anda ({foundOrder.customerPhone}).
                  </p>
                </div>
              ) : (
                /* Still processing or pending */
                <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-center space-y-2">
                  <Clock className="w-6 h-6 text-purple-400 mx-auto animate-pulse" />
                  <div className="text-xs font-bold text-white">Akun Sedang Dipersiapkan</div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Pesanan Anda sedang diproses oleh admin (estimasi 5–15 menit). Akun akan dikirimkan ke WhatsApp Anda atau silakan cek halaman ini beberapa saat lagi.
                  </p>
                </div>
              )}

              {/* CS Button */}
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(settings.storeName)},%20saya%20ingin%20cek%20pesanan%20${encodeURIComponent(foundOrder.id)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Hubungi Admin terkait Pesanan Ini</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

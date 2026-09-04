import React, { useState } from 'react';
import { X, Check, ShieldCheck, ArrowRight, MessageSquare, Plus, Minus, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { activeProductModal, closeProductModal, startCheckout, generateWhatsAppOrderUrl } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const totalPrice = product.price * quantity;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const incrementQty = () => {
    setQuantity(prev => (prev < 10 ? prev + 1 : prev));
  };

  const decrementQty = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleProceedOrder = () => {
    startCheckout(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-lg w-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
        {/* Header Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500"></div>

        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Title & Package */}
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[11px] font-semibold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              <span>{product.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {product.name} — <span className="text-purple-300">{product.package}</span>
            </h3>
            <div className="text-2xl font-bold text-white pt-1">{formatRupiah(product.price)} <span className="text-xs text-gray-400 font-normal">/ akun</span></div>
          </div>

          {/* Product Quick Specs */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#0b0e17] border border-white/5 text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase">Masa Aktif</span>
              <div className="text-xs sm:text-sm font-bold text-white">{product.duration}</div>
            </div>
            <div className="space-y-0.5 border-x border-white/5">
              <span className="text-[10px] text-gray-400 uppercase">Jenis Produk</span>
              <div className="text-xs sm:text-sm font-bold text-white">{product.type}</div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase">Status</span>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Available</span>
              </div>
            </div>
          </div>

          {/* Features Included */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Keunggulan Layanan:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Masa aktif sesuai paket</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Proses pengiriman / aktivasi</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Customer support responsif</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Panduan penggunaan lengkap</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector & Live Total Calculation */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-gray-400 font-medium">Jumlah Pesanan</span>
              <div className="text-sm font-bold text-white">Subtotal</div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quantity buttons */}
              <div className="flex items-center space-x-2 bg-[#090b12] p-1 rounded-xl border border-white/10">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 text-white flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={incrementQty}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total Price Display */}
              <div className="text-right">
                <span className="text-lg sm:text-xl font-extrabold text-white">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleProceedOrder}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-glow-md hover:shadow-glow-lg transition-all duration-200 flex items-center justify-center space-x-2 group hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Lanjutkan Order</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={generateWhatsAppOrderUrl(product, quantity)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order Langsung via WhatsApp</span>
            </a>
          </div>

          {/* Trust Notice */}
          <div className="flex items-center space-x-2 text-[11px] text-gray-400 justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Garansi penuh & panduan pemakaian diberikan setelah order.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

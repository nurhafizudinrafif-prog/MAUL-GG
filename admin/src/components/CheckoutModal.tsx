import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, CheckSquare, Square, User, Phone, Mail, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutModal: React.FC = () => {
  const { checkoutItem, closeCheckout, paymentMethods, createOrder, startPayment } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!checkoutItem) return null;

  const { product, quantity } = checkoutItem;
  const totalPrice = product.price * quantity;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorMsg('Silakan masukkan nama lengkap Anda.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.length < 8) {
      setErrorMsg('Silakan masukkan nomor WhatsApp aktif yang valid.');
      return;
    }

    if (!agreedTerms) {
      setErrorMsg('Anda wajib menyetujui Syarat & Ketentuan untuk melanjutkan.');
      return;
    }

    setErrorMsg('');

    // Default to first active payment method (QRIS or E-Wallet)
    const activePayment = paymentMethods.find(m => m.isActive) || paymentMethods[0];

    // Create the order
    const order = createOrder({
      productId: product.id,
      productName: product.name,
      package: product.package,
      price: product.price,
      quantity,
      totalPrice,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      notes: notes.trim(),
      paymentMethodId: activePayment.id,
      paymentMethodName: activePayment.name
    });

    // Proceed to Payment Modal
    startPayment(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-card max-w-lg w-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative my-6">
        {/* Top Header Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500"></div>

        {/* Close Button */}
        <button
          onClick={closeCheckout}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div>
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
              Langkah 2 dari 3
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Checkout Pesanan
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Lengkapi informasi kontak untuk proses aktivasi dan pengiriman produk.
            </p>
          </div>

          {/* Order Summary Box */}
          <div className="p-4 rounded-2xl bg-[#0a0d16] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Ringkasan Pesanan</span>
              <span className="text-emerald-400 font-medium">Digital Product</span>
            </div>

            <div className="space-y-1.5 border-t border-white/5 pt-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-white">{product.name}</div>
                  <div className="text-xs text-purple-300">Paket: {product.package}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">
                    {formatRupiah(product.price)} x {quantity}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-sm font-semibold text-gray-300">Total Pembayaran</span>
                <span className="text-lg font-extrabold text-white">{formatRupiah(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleProceedPayment} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Nama Lengkap *</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Contoh: Rafif Pratama"
                className="w-full px-4 py-3 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            {/* Nomor WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nomor WhatsApp Aktif *</span>
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-3 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
              />
              <p className="text-[11px] text-gray-500">
                Detail login/link akun akan dikirimkan dan dikonfirmasi melalui WhatsApp ini.
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Email (Opsional)</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="Contoh: nama@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            {/* Catatan Pesanan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span>Catatan Pesanan (Opsional)</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Tulis email akun yang ingin diupgrade atau catatan khusus..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm resize-none"
              ></textarea>
            </div>

            {/* Checkbox Terms & Conditions */}
            <div
              onClick={() => setAgreedTerms(!agreedTerms)}
              className="flex items-start space-x-2.5 pt-1 cursor-pointer select-none"
            >
              <div className="mt-0.5 text-purple-400">
                {agreedTerms ? (
                  <CheckSquare className="w-4 h-4 text-purple-400" />
                ) : (
                  <Square className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <span className="text-xs text-gray-400 leading-relaxed">
                Saya telah membaca dan menyetujui <span className="text-white underline">Syarat & Ketentuan</span> layanan RAFIF RXFIF STORE.ID.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-glow-md hover:shadow-glow-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Lanjutkan Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privasi data Anda terenkripsi aman & tidak akan disalahgunakan.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

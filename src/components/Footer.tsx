import React, { useState } from 'react';
import { MessageSquare, Shield, FileText, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings } = useStore();
  const [showLegalModal, setShowLegalModal] = useState<'terms' | 'privacy' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-[#050608] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-[1px] shadow-glow-sm">
                <div className="w-full h-full bg-[#090b11] rounded-[11px] flex items-center justify-center">
                  <span className="font-display font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    {settings.brandMonogram}
                  </span>
                </div>
              </div>
              <span className="font-display font-extrabold text-lg text-white tracking-tight">
                {settings.storeName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              {settings.tagline} Platform penyedia layanan digital premium aman, mudah, dan terpercaya di Indonesia.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {settings.whatsappDisplayName}</span>
              </a>
            </div>
          </div>

          {/* Links Column 1: Store */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Store</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#home" className="hover:text-purple-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-purple-300 transition-colors">
                  Produk
                </a>
              </li>
              <li>
                <a href="#how-to-order" className="hover:text-purple-300 transition-colors">
                  Cara Order
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Support</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#faq" className="hover:text-purple-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-300 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Informasi Legal</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => setShowLegalModal('terms')}
                  className="hover:text-purple-300 transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowLegalModal('privacy')}
                  className="hover:text-purple-300 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 {settings.storeName}. All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <span>Dark Premium Technology Edition</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal (Terms / Privacy) */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-white/10 shadow-2xl relative space-y-4">
            <h3 className="text-lg font-bold text-white">
              {showLegalModal === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
            </h3>
            <div className="text-xs text-gray-300 max-h-72 overflow-y-auto space-y-3 leading-relaxed pr-2">
              {showLegalModal === 'terms' ? (
                <>
                  <p>1. Seluruh produk digital yang dijual ditujukan untuk penggunaan wajar sesuai paket yang dipilih.</p>
                  <p>2. Pelanggan wajib menjaga kerahasiaan kredensial akun yang diberikan oleh admin.</p>
                  <p>3. Garansi berlaku selama masa aktif paket yang dibeli dengan ketentuan tidak mengubah email/password jika dilarang pada instruksi.</p>
                  <p>4. Pembayaran yang sah hanya melalui kode QRIS resmi yang tertera pada website/invoice kami.</p>
                </>
              ) : (
                <>
                  <p>1. RAFIF RXFIF STORE.ID menjamin kerahasiaan data pembeli seperti nama, email, dan nomor WhatsApp.</p>
                  <p>2. Data kontak hanya digunakan untuk keperluan pengiriman akun dan notifikasi pesanan.</p>
                  <p>3. Kami tidak membagikan atau menjual data pelanggan kepada pihak ketiga mana pun.</p>
                </>
              )}
            </div>
            <button
              onClick={() => setShowLegalModal(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Key } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    settings,
    products,
    openProductModal,
    openTrackingModal
  } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickOrder = () => {
    const bestSeller = products.find(p => p.isBestSeller) || products[0];
    if (bestSeller) {
      openProductModal(bestSeller);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-lg shadow-black/40 py-3.5' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center space-x-3 group">
            {/* Monogram RX */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-[1.5px] shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <div className="w-full h-full bg-[#090b11] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-200 to-blue-400">
                  {settings.brandMonogram}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
                {settings.storeName}
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                Digital Store
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#products" className="hover:text-white transition-colors">
              Produk
            </a>
            <a href="#how-to-order" className="hover:text-white transition-colors">
              Cara Order
            </a>

            {/* Tombol Navbar Khusus: Pesanan (Ambil Email & Password) */}
            <button
              onClick={openTrackingModal}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-200 hover:text-white transition-all flex items-center space-x-1.5 text-xs font-bold shadow-glow-sm group"
              title="Cek Pesanan & Terima Email / Password Akun"
            >
              <Key className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Pesanan (Ambil Akun)</span>
              <span className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                Email & Password
              </span>
            </button>

            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Kontak
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={openTrackingModal}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-all"
              title="Cek Pesanan & Terima Email / Password Akun"
            >
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span>Terima Akun</span>
            </button>

            <button
              onClick={handleQuickOrder}
              className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-90"></div>
              <div className="relative px-5 py-2.5 rounded-[11px] bg-[#0c0e17] group-hover:bg-opacity-80 transition-all duration-200 flex items-center space-x-2 text-white">
                <ShoppingCart className="w-4 h-4 text-purple-400 group-hover:animate-bounce" />
                <span>Pesan Sekarang</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Tombol Pesanan Mobile */}
            <button
              onClick={openTrackingModal}
              className="px-2.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
              title="Pesanan (Terima Email & Password)"
            >
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">Pesanan</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-nav border-t border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            {/* Tombol Pesanan Unggulan di Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTrackingModal();
              }}
              className="w-full text-left p-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-purple-950/70 via-[#101424] to-emerald-950/40 border border-purple-500/40 flex items-center justify-between shadow-glow-sm"
            >
              <div className="flex items-center space-x-2.5">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Pesanan (Ambil Akun)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                Email & Password
              </span>
            </button>

            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              Home
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              Produk
            </a>
            <a
              href="#how-to-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              Cara Order
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
            >
              Kontak
            </a>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleQuickOrder();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold text-white flex items-center justify-center space-x-2 shadow-glow-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Pesan Sekarang</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

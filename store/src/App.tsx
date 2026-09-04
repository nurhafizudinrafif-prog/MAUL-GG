import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustFeatures } from './components/TrustFeatures';
import { ProductSection } from './components/ProductSection';
import { HowToOrder } from './components/HowToOrder';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PromoBanner } from './components/PromoBanner';
import { TestimonialSection } from './components/TestimonialSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PaymentModal } from './components/PaymentModal';
import { SuccessModal } from './components/SuccessModal';
import { TrackingModal } from './components/TrackingModal';
import { LiveSalesNotification } from './components/LiveSalesNotification';
import { useStore } from './context/StoreContext';
import { MessageCircle } from 'lucide-react';

export const App: React.FC = () => {
  const { settings } = useStore();

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="relative min-h-screen bg-[#07080b] text-white selection:bg-purple-600 selection:text-white font-sans overflow-x-hidden">
      {/* Global Ambient Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] -left-32 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] animate-pulse-glow"></div>
        <div className="absolute top-[55%] -right-32 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px] animate-float-slow"></div>
        <div className="absolute top-[85%] left-1/4 w-[450px] h-[450px] bg-cyan-900/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Top Navbar */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="relative z-10">
        <Hero />
        <TrustFeatures />
        <ProductSection />
        <HowToOrder />
        <WhyChooseUs />
        <PromoBanner />
        <TestimonialSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProductDetailModal />
      <CheckoutModal />
      <PaymentModal />
      <SuccessModal />
      <TrackingModal />

      {/* Live Sales Notification Toast */}
      <LiveSalesNotification />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${cleanWaNumber}?text=Halo%20${encodeURIComponent(settings.storeName)},%20saya%20ingin%20tanya%20seputar%20layanan%20digital`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp CS"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-950/60 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">
          Chat CS
        </span>
      </a>
    </div>
  );
};
export default App;

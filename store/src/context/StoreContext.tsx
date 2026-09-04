import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, PaymentMethod, Testimonial, StoreSettings, OrderStatus, AccountCredentials } from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  INITIAL_PAYMENT_METHODS,
  INITIAL_TESTIMONIALS
} from '../data/initialData';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  settings: StoreSettings;
  paymentMethods: PaymentMethod[];
  testimonials: Testimonial[];
  isAdminLoggedIn: boolean;
  isAdminView: boolean;
  activeProductModal: Product | null;
  checkoutItem: { product: Product; quantity: number } | null;
  currentPaymentOrder: Order | null;
  currentSuccessOrder: Order | null;
  isTrackingModalOpen: boolean;

  // Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (orderData: {
    productId: string;
    productName: string;
    package: string;
    price: number;
    quantity: number;
    totalPrice: number;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes?: string;
    paymentMethodId: string;
    paymentMethodName: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  fulfillOrderWithCredentials: (orderId: string, credentials: AccountCredentials) => string;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  updatePaymentMethod: (id: string, method: Partial<PaymentMethod>) => void;
  togglePaymentMethod: (id: string) => void;
  loginAdmin: (passwordOrPin: string, username?: string) => boolean;
  logoutAdmin: () => void;
  setIsAdminView: (view: boolean) => void;
  navigateTo: (path: string) => void;

  // Modal handlers
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  startCheckout: (product: Product, quantity: number) => void;
  closeCheckout: () => void;
  startPayment: (order: Order) => void;
  closePayment: () => void;
  finishPayment: (order: Order) => void;
  closeSuccessModal: () => void;
  openTrackingModal: () => void;
  closeTrackingModal: () => void;
  searchOrder: (query: string) => Order | null;

  // WhatsApp generator
  generateWhatsAppOrderUrl: (product: Product, quantity?: number, customerName?: string, customerPhone?: string) => string;
  generateWhatsAppConfirmationUrl: (order: Order) => string;
  generateWhatsAppAccountDeliveryUrl: (order: Order, credentials: AccountCredentials) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or use defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rxfif_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rxfif_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('rxfif_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        whatsappNumber: '6289516219050',
        whatsappDisplayName: '+62 895-1621-9050',
        adminUsername: parsed.adminUsername || 'admin',
        adminPin: parsed.adminPin || 'admin123'
      };
    }
    return INITIAL_SETTINGS;
  });

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem('rxfif_payments');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 1 || parsed[0]?.qrCodeUrl !== '/qris.jpg') {
        return INITIAL_PAYMENT_METHODS;
      }
      return parsed;
    }
    return INITIAL_PAYMENT_METHODS;
  });

  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Clean Storefront State (Admin disabled on store)
  const isAdminLoggedIn = false;
  const isAdminView = false;
  const setIsAdminView = (_view: boolean) => {};
  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
  };

  // Modals
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<{ product: Product; quantity: number } | null>(null);
  const [currentPaymentOrder, setCurrentPaymentOrder] = useState<Order | null>(null);
  const [currentSuccessOrder, setCurrentSuccessOrder] = useState<Order | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState<boolean>(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('rxfif_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rxfif_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rxfif_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('rxfif_payments', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  useEffect(() => {
    localStorage.setItem('rxfif_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    setProducts(prev => [...prev, { ...newProd, id }]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const createOrder = (orderData: {
    productId: string;
    productName: string;
    package: string;
    price: number;
    quantity: number;
    totalPrice: number;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes?: string;
    paymentMethodId: string;
    paymentMethodName: string;
  }): Order => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: `#RXFIF-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
    if (currentSuccessOrder && currentSuccessOrder.id === orderId) {
      setCurrentSuccessOrder(prev => (prev ? { ...prev, status } : null));
    }
  };

  const fulfillOrderWithCredentials = (orderId: string, credentials: AccountCredentials): string => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return '';

    const updatedOrder: Order = {
      ...targetOrder,
      status: 'completed',
      credentials: {
        ...credentials,
        sentAt: new Date().toISOString()
      }
    };

    setOrders(prev => prev.map(o => (o.id === orderId ? updatedOrder : o)));
    return generateWhatsAppAccountDeliveryUrl(updatedOrder, credentials);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updatePaymentMethod = (id: string, updated: Partial<PaymentMethod>) => {
    setPaymentMethods(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));
  };

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(m => (m.id === id ? { ...m, isActive: !m.isActive } : m)));
  };

  const loginAdmin = (_passwordOrPin: string, _username?: string): boolean => false;
  const logoutAdmin = () => {};

  // Modal Open/Close Controls
  const openProductModal = (product: Product) => {
    setActiveProductModal(product);
  };

  const closeProductModal = () => {
    setActiveProductModal(null);
  };

  const startCheckout = (product: Product, quantity: number) => {
    setActiveProductModal(null);
    setCheckoutItem({ product, quantity });
  };

  const closeCheckout = () => {
    setCheckoutItem(null);
  };

  const startPayment = (order: Order) => {
    setCheckoutItem(null);
    setCurrentPaymentOrder(order);
  };

  const closePayment = () => {
    setCurrentPaymentOrder(null);
  };

  const finishPayment = (order: Order) => {
    updateOrderStatus(order.id, 'paid');
    setCurrentPaymentOrder(null);
    setCurrentSuccessOrder({ ...order, status: 'paid' });
  };

  const closeSuccessModal = () => {
    setCurrentSuccessOrder(null);
  };

  const openTrackingModal = () => {
    setIsTrackingModalOpen(true);
  };

  const closeTrackingModal = () => {
    setIsTrackingModalOpen(false);
  };

  const searchOrder = (query: string): Order | null => {
    const clean = query.trim().toLowerCase().replace('#', '');
    const found = orders.find(
      o =>
        o.id.toLowerCase().includes(clean) ||
        o.customerPhone.replace(/[^0-9]/g, '').includes(clean) ||
        o.customerEmail.toLowerCase().includes(clean)
    );
    return found || null;
  };

  // WhatsApp helpers
  const generateWhatsAppOrderUrl = (
    product: Product,
    quantity: number = 1,
    customerName: string = '',
    customerPhone: string = ''
  ): string => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(product.price * quantity);

    const message = `Halo ${settings.storeName}, saya ingin melakukan order.

Produk: ${product.name}
Paket: ${product.package}${quantity > 1 ? ` (Jumlah: ${quantity}x)` : ''}
Harga: ${formattedPrice}
Nama: ${customerName || '[nama pelanggan]'}
Nomor WhatsApp: ${customerPhone || '[nomor pelanggan]'}`;

    const encoded = encodeURIComponent(message);
    const cleanWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanWa}?text=${encoded}`;
  };

  const generateWhatsAppConfirmationUrl = (order: Order): string => {
    const formattedTotal = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(order.totalPrice);

    const message = `Halo ${settings.storeName}, saya telah menyelesaikan pembayaran via QRIS!

Nomor Pesanan: ${order.id}
Produk: ${order.productName} (${order.package})
Jumlah: ${order.quantity}x
Total: ${formattedTotal}
Metode: ${order.paymentMethodName}
Nama: ${order.customerName}
Nomor WhatsApp: ${order.customerPhone}
${order.notes ? `Catatan: ${order.notes}` : ''}

Mohon diproses untuk pengiriman/aktivasi akun. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const cleanWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanWa}?text=${encoded}`;
  };

  const generateWhatsAppAccountDeliveryUrl = (order: Order, credentials: AccountCredentials): string => {
    const message = `Halo Kak ${order.customerName}! 👋
Pesanan kamu di ${settings.storeName} telah selesai diproses! 🎉

📋 Rincian Pesanan:
- No. Pesanan: ${order.id}
- Produk: ${order.productName} (${order.package})

🔐 DETAIL AKUN DIGITAL KAMU:
📧 Email / User: ${credentials.emailOrUser}
🔑 Password: ${credentials.passwordOrKey}
📅 Masa Aktif: ${credentials.durationInfo || order.package}
${credentials.notes ? `📌 Panduan / Catatan: ${credentials.notes}` : ''}

⚠️ Catatan Penting:
- Dilarang mengubah email/password profil agar garansi tetap aktif.
- Simpan data akun ini dengan baik.

Jika ada kendala saat login atau pemakaian, silakan balas chat ini ya kak. Selamat berkarya & terima kasih telah berbelanja di ${settings.storeName}! ✨`;

    const encoded = encodeURIComponent(message);
    const cleanCustomerWa = order.customerPhone.replace(/[^0-9]/g, '');
    const validWa = cleanCustomerWa.startsWith('0') ? '62' + cleanCustomerWa.slice(1) : cleanCustomerWa;
    return `https://wa.me/${validWa}?text=${encoded}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        settings,
        paymentMethods,
        testimonials,
        isAdminLoggedIn,
        isAdminView,
        activeProductModal,
        checkoutItem,
        currentPaymentOrder,
        currentSuccessOrder,
        isTrackingModalOpen,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        fulfillOrderWithCredentials,
        updateSettings,
        updatePaymentMethod,
        togglePaymentMethod,
        loginAdmin,
        logoutAdmin,
        setIsAdminView,
        navigateTo,
        openProductModal,
        closeProductModal,
        startCheckout,
        closeCheckout,
        startPayment,
        closePayment,
        finishPayment,
        closeSuccessModal,
        openTrackingModal,
        closeTrackingModal,
        searchOrder,
        generateWhatsAppOrderUrl,
        generateWhatsAppConfirmationUrl,
        generateWhatsAppAccountDeliveryUrl
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

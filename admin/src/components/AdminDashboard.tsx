import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Lock,
  Phone,
  QrCode,
  Tag,
  Flame,
  ArrowLeft,
  Send,
  Key,
  Copy,
  MessageSquare,
  User,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, Order, PaymentMethod, OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    settings,
    paymentMethods,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    setIsAdminView,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    fulfillOrderWithCredentials,
    updateSettings,
    updatePaymentMethod,
    togglePaymentMethod
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Account Fulfillment Modal state
  const [fulfillingOrder, setFulfillingOrder] = useState<Order | null>(null);
  const [credForm, setCredForm] = useState({
    emailOrUser: '',
    passwordOrKey: '',
    durationInfo: '',
    notes: 'Login di aplikasi. Dilarang mengganti profil atau password akun. Garansi aktif selama masa paket.'
  });
  const [copiedCredMsg, setCopiedCredMsg] = useState(false);

  // Product Form Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [prodForm, setProdForm] = useState({
    name: '',
    package: '',
    price: 0,
    originalPrice: 0,
    duration: '',
    type: 'Digital',
    status: 'available' as 'available' | 'out_of_stock',
    category: 'Video Editing',
    isBestSeller: false,
    isPromo: false,
    description: '',
    featuresText: 'Masa aktif sesuai paket\nFitur premium sesuai paket\nProses cepat & aman\nCustomer support'
  });

  // Settings Form state
  const [settingsForm, setSettingsForm] = useState({
    storeName: settings.storeName,
    whatsappNumber: settings.whatsappNumber,
    whatsappDisplayName: settings.whatsappDisplayName,
    adminUsername: settings.adminUsername || 'admin',
    adminPin: settings.adminPin,
    promoTitle: settings.promoTitle,
    promoSubtitle: settings.promoSubtitle,
    isPromoActive: settings.isPromoActive
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Filter Orders
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(loginPassword, loginUsername)) {
      setLoginError(false);
      setLoginPassword('');
    } else {
      setLoginError(true);
    }
  };

  const handleQuickFillDashboard = () => {
    setLoginUsername('admin');
    setLoginPassword('admin123');
    setLoginError(false);
  };

  const handleOpenFulfill = (ord: Order) => {
    setFulfillingOrder(ord);
    setCredForm({
      emailOrUser: ord.credentials?.emailOrUser || '',
      passwordOrKey: ord.credentials?.passwordOrKey || '',
      durationInfo: ord.credentials?.durationInfo || ord.package,
      notes:
        ord.credentials?.notes ||
        'Login di aplikasi resmi. Dilarang mengganti email/password profil agar garansi tetap aktif.'
    });
    setCopiedCredMsg(false);
  };

  const handleSubmitFulfill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fulfillingOrder) return;
    const waUrl = fulfillOrderWithCredentials(fulfillingOrder.id, credForm);
    setFulfillingOrder(null);
    if (waUrl) {
      window.open(waUrl, '_blank');
    }
  };

  const handleCopyCredentialsMessage = () => {
    if (!fulfillingOrder) return;
    const text = `Halo Kak ${fulfillingOrder.customerName}! 👋
Pesanan kamu di ${settings.storeName} telah selesai diproses! 🎉

No. Pesanan: ${fulfillingOrder.id}
Layanan: ${fulfillingOrder.productName} (${fulfillingOrder.package})

🔐 DETAIL AKUN DIGITAL KAMU:
📧 Email/User: ${credForm.emailOrUser}
🔑 Password: ${credForm.passwordOrKey}
📅 Masa Aktif: ${credForm.durationInfo}
📌 Catatan/Panduan: ${credForm.notes}

⚠️ Catatan: Dilarang mengganti profil/password agar garansi tetap aktif. Terima kasih!`;
    navigator.clipboard.writeText(text);
    setCopiedCredMsg(true);
    setTimeout(() => setCopiedCredMsg(false), 2500);
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      package: '1 Bulan',
      price: 25000,
      originalPrice: 35000,
      duration: '1 Bulan',
      type: 'Digital',
      status: 'available',
      category: 'General Digital',
      isBestSeller: false,
      isPromo: false,
      description: '',
      featuresText: 'Masa aktif sesuai paket\nFitur premium\nProses cepat\nCustomer support'
    });
    setIsAddingProduct(true);
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      package: prod.package,
      price: prod.price,
      originalPrice: prod.originalPrice || 0,
      duration: prod.duration,
      type: prod.type,
      status: prod.status,
      category: prod.category,
      isBestSeller: !!prod.isBestSeller,
      isPromo: !!prod.isPromo,
      description: prod.description || '',
      featuresText: prod.features.join('\n')
    });
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const features = prodForm.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: prodForm.name,
        package: prodForm.package,
        price: Number(prodForm.price),
        originalPrice: Number(prodForm.originalPrice),
        duration: prodForm.duration,
        type: prodForm.type,
        status: prodForm.status,
        category: prodForm.category,
        isBestSeller: prodForm.isBestSeller,
        isPromo: prodForm.isPromo,
        description: prodForm.description,
        features
      });
    } else {
      addProduct({
        name: prodForm.name,
        package: prodForm.package,
        price: Number(prodForm.price),
        originalPrice: Number(prodForm.originalPrice),
        duration: prodForm.duration,
        type: prodForm.type,
        status: prodForm.status,
        category: prodForm.category,
        isBestSeller: prodForm.isBestSeller,
        isPromo: prodForm.isPromo,
        description: prodForm.description,
        features
      });
    }

    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // If not logged in, show Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center p-4">
        <div className="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsAdminView(false)}
              className="text-xs text-gray-400 hover:text-white flex items-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Toko</span>
            </button>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold uppercase tracking-wider border border-purple-500/30">
              Admin Area
            </span>
          </div>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-[1px] shadow-glow-md mx-auto">
              <div className="w-full h-full bg-[#0b0e17] rounded-[15px] flex items-center justify-center text-purple-400">
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-display">Dashboard Admin</h2>
            <p className="text-xs text-gray-400">
              Silakan masukkan kredensial admin untuk mengelola pesanan & produk toko.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center leading-relaxed animate-fadeIn">
                Username atau Password/PIN salah. Coba periksa kembali.
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Username Admin</span>
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={e => {
                  setLoginUsername(e.target.value);
                  setLoginError(false);
                }}
                placeholder="admin"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-[#0c0e17] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Password / PIN Admin</span>
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={e => {
                    setLoginPassword(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Ketik password admin..."
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-[#0c0e17] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Auto-fill button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleQuickFillDashboard}
                className="w-full py-2 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Isi Akun Default (admin / admin123)</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-glow-sm transition-all"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders
    .filter(o => o.status === 'completed' || o.status === 'paid')
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="min-h-screen bg-[#07080b] text-gray-200">
      {/* Admin Topbar */}
      <header className="glass-nav border-b border-white/10 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAdminView(false)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Kembali ke Halaman Toko"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              RX
            </div>
            <div>
              <h1 className="text-sm font-bold text-white font-display">{settings.storeName}</h1>
              <span className="text-[10px] text-purple-400 font-medium">Control Panel</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#0d101a] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'orders' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Pesanan ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'products' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Katalog Produk ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'settings' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Pengaturan Toko
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={logoutAdmin}
          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Total Pendapatan</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{formatRupiah(totalRevenue)}</div>
            <span className="text-[10px] text-emerald-400">Dari pesanan terverifikasi</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Total Pesanan</span>
              <Package className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{orders.length}</div>
            <span className="text-[10px] text-gray-400">Semua riwayat transaksi</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Pesanan Tertunda</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-300">{pendingOrdersCount}</div>
            <span className="text-[10px] text-amber-400">Menunggu konfirmasi admin</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>WhatsApp Toko</span>
              <Phone className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-base font-bold text-white truncate">{settings.whatsappDisplayName}</div>
            <span className="text-[10px] text-cyan-400">Aktif menerima pesanan</span>
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Daftar Pesanan Masuk</h2>
                <p className="text-xs text-gray-400">Kelola status dan pengiriman akun ke pelanggan</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#0e121d] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table Container */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#0b0e17] text-gray-400 uppercase text-[10px] font-semibold border-b border-white/5">
                    <tr>
                      <th className="px-5 py-3.5">ID Order</th>
                      <th className="px-5 py-3.5">Produk & Paket</th>
                      <th className="px-5 py-3.5">Pelanggan</th>
                      <th className="px-5 py-3.5">Total & Metode</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                          Belum ada pesanan pada filter ini.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(ord => (
                        <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-white whitespace-nowrap">
                            {ord.id}
                            <div className="text-[10px] text-gray-500 font-sans">
                              {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-white">{ord.productName}</div>
                            <div className="text-[11px] text-purple-300">
                              {ord.package} ({ord.quantity}x)
                            </div>
                            {ord.notes && (
                              <div className="text-[10px] text-gray-400 italic max-w-xs truncate">
                                Catatan: {ord.notes}
                              </div>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-medium text-white">{ord.customerName}</div>
                            <a
                              href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-emerald-400 hover:underline flex items-center space-x-1"
                            >
                              <span>{ord.customerPhone}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                            {ord.customerEmail && (
                              <div className="text-[10px] text-gray-400">{ord.customerEmail}</div>
                            )}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="font-bold text-white">{formatRupiah(ord.totalPrice)}</div>
                            <div className="text-[10px] text-gray-400">{ord.paymentMethodName}</div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                ord.status === 'completed'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : ord.status === 'paid'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : ord.status === 'processing'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : ord.status === 'cancelled'
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              onClick={() => handleOpenFulfill(ord)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center space-x-1.5 transition-all ${
                                ord.credentials
                                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-sm'
                              }`}
                            >
                              <Key className="w-3.5 h-3.5" />
                              <span>{ord.credentials ? 'Akun Terkirim ✓' : 'Kirim Akun'}</span>
                            </button>

                            <select
                              value={ord.status}
                              onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="px-2.5 py-1.5 rounded-lg bg-[#0e121d] border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Katalog Layanan Digital</h2>
                <p className="text-xs text-gray-400">Atur harga, status ketersediaan, dan paket produk</p>
              </div>
              <button
                onClick={openAddProduct}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-glow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map(prod => (
                <div
                  key={prod.id}
                  className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">
                          {prod.category}
                        </span>
                        <h3 className="text-lg font-bold text-white font-display">{prod.name}</h3>
                        <span className="text-xs text-purple-300">Paket {prod.package}</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          prod.status === 'available'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {prod.status === 'available' ? 'Available' : 'Habis'}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-baseline space-x-2">
                      <span className="text-xl font-extrabold text-white">{formatRupiah(prod.price)}</span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatRupiah(prod.originalPrice)}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-1 text-xs text-gray-400">
                      {prod.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="truncate">
                          • {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {prod.isBestSeller && (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          BEST SELLER
                        </span>
                      )}
                      {prod.isPromo && (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                          PROMO
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditProduct(prod)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus ${prod.name}?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Store & WhatsApp Config */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
                <div className="border-b border-white/5 pb-3">
                  <h3 className="text-lg font-bold text-white font-display">Pengaturan Toko & CS WhatsApp</h3>
                  <p className="text-xs text-gray-400">
                    Konfigurasi nomor kontak dan judul toko yang digunakan untuk menerima order.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  {settingsSaved && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Pengaturan berhasil disimpan!</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Nama Toko</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={e => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">
                        Nomor WhatsApp (Format wa.me: 628...)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.whatsappNumber}
                        onChange={e =>
                          setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Label Tampilan WhatsApp</label>
                      <input
                        type="text"
                        value={settingsForm.whatsappDisplayName}
                        onChange={e =>
                          setSettingsForm({ ...settingsForm, whatsappDisplayName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Username Admin</label>
                      <input
                        type="text"
                        value={settingsForm.adminUsername}
                        onChange={e => setSettingsForm({ ...settingsForm, adminUsername: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Password / PIN Admin</label>
                      <input
                        type="text"
                        value={settingsForm.adminPin}
                        onChange={e => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Banner Promo</h4>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="promoActive"
                        checked={settingsForm.isPromoActive}
                        onChange={e =>
                          setSettingsForm({ ...settingsForm, isPromoActive: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-purple-600 focus:ring-0"
                      />
                      <label htmlFor="promoActive" className="text-xs text-gray-300 cursor-pointer">
                        Aktifkan Banner Special Promo di Homepage
                      </label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Judul Promo</label>
                      <input
                        type="text"
                        value={settingsForm.promoTitle}
                        onChange={e => setSettingsForm({ ...settingsForm, promoTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                  >
                    Simpan Perubahan Toko
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Payment Accounts Management */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Metode Pembayaran</h3>
                  <p className="text-xs text-gray-400">Aktifkan atau edit rekening pembayaran</p>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map(method => (
                    <div
                      key={method.id}
                      className="p-3.5 rounded-xl bg-[#0c0e17] border border-white/5 flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white">{method.name}</span>
                          <span className="text-[10px] text-gray-400">({method.type})</span>
                        </div>
                        <div className="text-xs font-mono text-purple-300">{method.accountNumber}</div>
                        <div className="text-[10px] text-gray-400">a.n. {method.accountName}</div>
                      </div>

                      <button
                        onClick={() => togglePaymentMethod(method.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                          method.isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/5 text-gray-500'
                        }`}
                      >
                        {method.isActive ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Add / Edit Product */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative my-8">
            <button
              onClick={() => setIsAddingProduct(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-display mb-4">
              {editingProduct ? 'Edit Layanan Digital' : 'Tambah Layanan Baru'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300">Nama Produk</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
                    placeholder="Contoh: CapCut Premium"
                    className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-300">Paket / Durasi</label>
                  <input
                    type="text"
                    required
                    value={prodForm.package}
                    onChange={e =>
                      setProdForm({ ...prodForm, package: e.target.value, duration: e.target.value })
                    }
                    placeholder="Contoh: 1 Bulan"
                    className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300">Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={e => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-300">Harga Coret (Rp)</label>
                  <input
                    type="number"
                    value={prodForm.originalPrice}
                    onChange={e => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300">Kategori</label>
                  <input
                    type="text"
                    value={prodForm.category}
                    onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-300">Status Stok</label>
                  <select
                    value={prodForm.status}
                    onChange={e =>
                      setProdForm({ ...prodForm, status: e.target.value as 'available' | 'out_of_stock' })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs"
                  >
                    <option value="available">Tersedia (Available)</option>
                    <option value="out_of_stock">Stok Habis</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-1">
                <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isBestSeller}
                    onChange={e => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                    className="rounded text-purple-600"
                  />
                  <span>Tandai Best Seller</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isPromo}
                    onChange={e => setProdForm({ ...prodForm, isPromo: e.target.checked })}
                    className="rounded text-purple-600"
                  />
                  <span>Tampilkan di Promo Banner</span>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-300">Fitur (1 baris per fitur)</label>
                <textarea
                  rows={3}
                  value={prodForm.featuresText}
                  onChange={e => setProdForm({ ...prodForm, featuresText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs resize-none"
                ></textarea>
              </div>

              <div className="flex space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-glow-sm"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Kirim Akun ke Pembeli */}
      {fulfillingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl relative my-8">
            <button
              onClick={() => setFulfillingOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-5">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase">
                <Key className="w-3 h-3" />
                <span>Pengiriman Akun Digital</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Kirim Akun ke Pembeli
              </h3>
              <p className="text-xs text-gray-400">
                Data ini akan otomatis disimpan ke sistem dan dikirimkan langsung ke WhatsApp pembeli.
              </p>
            </div>

            {/* Target Order Summary */}
            <div className="p-3.5 rounded-xl bg-[#090c15] border border-white/5 space-y-1.5 text-xs text-gray-300 mb-5">
              <div className="flex justify-between">
                <span className="text-gray-400">No. Pesanan:</span>
                <span className="font-mono font-bold text-white">{fulfillingOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Produk:</span>
                <span className="font-semibold text-purple-300">
                  {fulfillingOrder.productName} ({fulfillingOrder.package})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nama Pembeli:</span>
                <span className="text-white">{fulfillingOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">No. WhatsApp:</span>
                <span className="text-emerald-400 font-mono">{fulfillingOrder.customerPhone}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitFulfill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Email / Username Akun *</label>
                <input
                  type="text"
                  required
                  value={credForm.emailOrUser}
                  onChange={e => setCredForm({ ...credForm, emailOrUser: e.target.value })}
                  placeholder="Contoh: capcutpro.buyer@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Password / Link Aktivasi *</label>
                <input
                  type="text"
                  required
                  value={credForm.passwordOrKey}
                  onChange={e => setCredForm({ ...credForm, passwordOrKey: e.target.value })}
                  placeholder="Contoh: RxStore2026!"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Masa Aktif Akun</label>
                <input
                  type="text"
                  value={credForm.durationInfo}
                  onChange={e => setCredForm({ ...credForm, durationInfo: e.target.value })}
                  placeholder="Contoh: 1 Bulan (Aktif s.d. 3 Oktober 2026)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Catatan & Panduan Login</label>
                <textarea
                  rows={2}
                  value={credForm.notes}
                  onChange={e => setCredForm({ ...credForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0d101b] border border-white/10 text-white text-xs resize-none focus:outline-none focus:border-purple-500"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke WhatsApp Pembeli (Otomatis Selesai)</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCredentialsMessage}
                    className="w-1/2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/5 flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    {copiedCredMsg ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Format Teks</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillingOrder(null)}
                    className="w-1/2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import { Product, PaymentMethod, Testimonial, StoreSettings, Order } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'RAFIF RXFIF STORE.ID',
  brandMonogram: 'RX',
  tagline: 'Premium Digital Experience, Simple & Affordable.',
  whatsappNumber: '6289516219050',
  whatsappDisplayName: '+62 895-1621-9050',
  adminUsername: 'admin',
  adminPin: 'admin123',
  promoTitle: 'Special Digital Deals',
  promoSubtitle: 'Penawaran terbatas untuk aplikasi video editing premium terfavorit content creator.',
  promoDiscountText: 'Diskon Spesial',
  promoEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
  isPromoActive: true
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'capcut-7d',
    name: 'CapCut Premium',
    package: '7 Hari',
    price: 10000,
    originalPrice: 15000,
    isBestSeller: false,
    isPromo: true,
    duration: '7 Hari',
    type: 'Digital',
    status: 'available',
    category: 'Video Editing',
    description: 'Akses fitur premium CapCut tanpa watermark dengan render kualitas ultra HD untuk editing mobile dan desktop.',
    features: [
      'Masa aktif 7 hari',
      'Fitur premium sesuai paket',
      'Proses cepat & praktis',
      'Customer support responsif'
    ],
    iconName: 'Film'
  },
  {
    id: 'capcut-1m',
    name: 'CapCut Premium',
    package: '1 Bulan',
    price: 35000,
    originalPrice: 45000,
    isBestSeller: true,
    isPromo: false,
    duration: '1 Bulan',
    type: 'Digital',
    status: 'available',
    category: 'Video Editing',
    description: 'Pilihan paling hemat untuk content creator & video editor aktif. Nikmati seluruh efek, filter, dan template pro tanpa batasan selama 30 hari penuh.',
    features: [
      'Masa aktif 1 bulan penuh',
      'Fitur premium sesuai paket',
      'Proses cepat & aktivasi mudah',
      'Customer support prioritas'
    ],
    iconName: 'Flame'
  },
  {
    id: 'youtube-1m',
    name: 'YouTube Premium',
    package: '1 Bulan',
    price: 10000,
    originalPrice: 20000,
    isBestSeller: false,
    isPromo: false,
    duration: '1 Bulan',
    type: 'Digital',
    status: 'available',
    category: 'Streaming & Music',
    description: 'Nikmati streaming video tanpa jeda iklan, pemutaran di latar belakang saat multitasking, dan akses YouTube Music sesuai paket.',
    features: [
      'Masa aktif 1 bulan',
      'Pengalaman menonton lebih nyaman bebas jeda',
      'YouTube Music sesuai paket',
      'Customer support responsif'
    ],
    iconName: 'PlayCircle'
  }
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS (Semua Bank & E-Wallet)',
    type: 'qris',
    accountNumber: 'NMID: ID1026574607879',
    accountName: 'RNH STORE, DIGITAL & KREATIF',
    logo: 'Scan QRIS',
    qrCodeUrl: '/qris.jpg',
    instructions: [
      'Buka aplikasi m-Banking (BCA, Mandiri, BRI, BNI, dll.) atau E-Wallet (DANA, GoPay, OVO, ShopeePay).',
      'Pilih menu Scan / QRIS pada aplikasi Anda.',
      'Arahkan kamera ke QR Code di layar atau unduh QRIS untuk diunggah dari galeri HP.',
      'Pastikan nama merchant: RNH STORE, DIGITAL & KREATIF.',
      'Masukkan nominal sesuai Total Tagihan Tepat.',
      'Setelah pembayaran berhasil, klik tombol "Saya Sudah Bayar" untuk verifikasi.'
    ],
    isActive: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Dimas Wicaksono',
    role: 'Content Creator TikTok',
    rating: 5,
    review: 'Langganan CapCut Premium di sini prosesnya super cepet, hitungan menit akun langsung aktif dan bisa dipake edit video tanpa watermark. CS-nya juga ramah banget.',
    productUsed: 'CapCut Premium 1 Bulan',
    date: 'Kemarin'
  },
  {
    id: 't-2',
    name: 'Anisa Maharani',
    role: 'Mahasiswi & Freelancer',
    rating: 5,
    review: 'Harganya bersahabat banget di kantong mahasiswa. YouTube Premium lancar jaya no iklan, dengerin musik sambil ngerjain skripsi jadi jauh lebih produktif.',
    productUsed: 'YouTube Premium 1 Bulan',
    date: '3 hari lalu'
  },
  {
    id: 't-3',
    name: 'Rian Pratama',
    role: 'Video Editor Reels',
    rating: 5,
    review: 'Awalnya coba paket 7 hari buat ngejar deadline event, ternyata stabil banget tanpa kendala. Sekarang langsung langganan bulanan. Recommended seller!',
    productUsed: 'CapCut Premium 7 Hari',
    date: '1 minggu lalu'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#RXFIF-739281',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    productId: 'capcut-1m',
    productName: 'CapCut Premium',
    package: '1 Bulan',
    price: 35000,
    quantity: 1,
    totalPrice: 35000,
    customerName: 'Bima Satria',
    customerPhone: '081298765432',
    customerEmail: 'bima.satria@gmail.com',
    notes: 'Email akun: bimaeditor@gmail.com',
    paymentMethodId: 'qris',
    paymentMethodName: 'QRIS',
    status: 'completed'
  },
  {
    id: '#RXFIF-948123',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    productId: 'youtube-1m',
    productName: 'YouTube Premium',
    package: '1 Bulan',
    price: 10000,
    quantity: 2,
    totalPrice: 20000,
    customerName: 'Siti Rahmawati',
    customerPhone: '085712348899',
    customerEmail: 'siti.rahma@yahoo.com',
    paymentMethodId: 'dana',
    paymentMethodName: 'DANA',
    status: 'processing'
  }
];

export const FAQ_LIST = [
  {
    question: 'Bagaimana cara membeli produk?',
    answer: 'Cukup pilih layanan digital yang Anda inginkan pada katalog, sesuaikan durasi paket, klik "Beli Sekarang", isi formulir checkout singkat, lalu selesaikan pembayaran dengan scan kode QRIS kami (bisa dari semua m-Banking & E-Wallet). Setelah pembayaran, akun/akses dapat langsung diambil lewat tombol menu "Pesanan" di navigasi atas atau dipandu via CS WhatsApp kami.'
  },
  {
    question: 'Berapa lama proses pesanan?',
    answer: 'Proses pesanan berlangsung sangat cepat, umumnya hanya membutuhkan waktu 5–15 menit setelah bukti pembayaran terkonfirmasi oleh sistem atau admin kami pada jam operasional toko.'
  },
  {
    question: 'Bagaimana jika mengalami kendala?',
    answer: 'Jika mengalami kendala pada saat checkout, pembayaran, maupun saat menggunakan akun, Anda dapat langsung menghubungi Customer Support kami melalui WhatsApp dengan menyertakan Nomor Pesanan (#RXFIF-XXXXXX). Tim kami siap membantu hingga kendala terselesaikan.'
  },
  {
    question: 'Apakah tersedia garansi?',
    answer: 'Tentu. Seluruh produk digital kami didukung garansi fungsional sesuai masa aktif paket yang Anda beli (misal: garansi 7 hari untuk paket 7 Hari, garansi 30 hari untuk paket 1 Bulan) sesuai syarat dan ketentuan pemakaian wajar.'
  }
];

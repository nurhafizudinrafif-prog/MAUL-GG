# RAFIF RXFIF STORE.ID — Official Repository

Repositori ini memuat 2 aplikasi terpisah:
1. **`store/`** — Website Resmi Pembeli (Katalog, Checkout, Pembayaran QRIS, Lacak Pesanan, CS WhatsApp).
2. **`admin/`** — Panel Khusus Admin (Manajemen Produk, Pantau Pesanan, Pengiriman Akun Pelanggan, Pengaturan Toko).

---

## 🚀 Menjalankan Secara Lokal (Windows)

- **Website Pembeli:** Klik ganda `JALANKAN_STORE.bat` (berjalan di `http://localhost:3000`).
- **Panel Admin:** Klik ganda `JALANKAN_ADMIN.bat` (berjalan di `http://localhost:3001`).

---

## 🌐 Panduan Deploy ke Vercel (2 Domain Terpisah)

### 1. Website Pembeli (Storefront)
- Buat / Buka Project di Vercel, pilih repositori ini.
- Buka **Settings > General > Root Directory**, klik **Edit** dan pilih folder **`store`**.
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Domain hasil deploy: misalnya `rafif-store.vercel.app`

### 2. Panel Admin (Admin Panel)
- Di Vercel, klik tombol **Add New... > Project** dan pilih repositori yang sama.
- Buka pengaturan **Root Directory**, klik **Edit** dan pilih folder **`admin`**.
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Domain hasil deploy: misalnya `admin-rafif.vercel.app`

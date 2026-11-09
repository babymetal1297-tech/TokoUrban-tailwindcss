# Toko Urban — Modern Tailwind CSS v4

Website katalog dan toko produk sepatu dan tas kasual modern **Toko Urban**, telah dimigrasikan sepenuhnya menggunakan **Tailwind CSS v4.3 (CSS-first)** dan JavaScript vanilla interaktif.

---

## 🚀 Fitur Utama

- **Tailwind CSS v4 Native:**
  - Menggunakan konfigurasi CSS-first (`src/input.css` dengan `@import "tailwindcss";` dan `@theme`).
  - Tanpa memerlukan file `tailwind.config.js`.
  - Terintegrasi langsung dengan `@tailwindcss/cli`.
- **Dua Tema Warna:** Mendukung Dark Theme (default) dan Light Theme secara instan dengan toggle switch di navbar.
- **Top Ad Slideshow:** Slider banner promo otomatis dengan transisi halus, kontrol navigasi, dan indikator dots.
- **Katalog & Filter Interaktif:** Saringan produk (*Sepatu*, *Tas*, *Semua*) tanpa reload halaman.
- **Wishlist & Drawer Favorit:** Simpan produk favorit menggunakan penyimpanan browser (`localStorage`).
- **Halaman Detail Produk:**
  - `detail-produk.html`: 5 varian sepatu dengan pemilih ukuran (39–42) dan aksi pemesanan.
  - `detail-tas.html`: 5 varian tas dengan pemilih warna dan spesifikasi lengkap.
- **Widget FAQ Melayang:** Tombol bantuan di pojok kanan bawah dengan popup accordion responsif.
- **Navigasi Mobile Responsif:** Menu hamburger dengan animasi silang (X) yang elegan.

---

## 📁 Struktur Folder

```text
TokoUrban-tailwindcss/
├── dist/
│   └── output.css           # File CSS output terkompilasi & terminifikasi
├── image/                   # Aset gambar produk & logo SVG
├── src/
│   └── input.css            # File input CSS Tailwind v4 & tema custom
├── detail-produk.html       # Halaman detail produk sepatu
├── detail-tas.html          # Halaman detail produk tas
├── index.html               # Halaman utama landing page & katalog
├── package.json             # Konfigurasi npm & script build
├── script.js                # Interaktivitas JavaScript vanilla
└── style.css                # File CSS lama (arsip referensi)
```

---

## 🛠️ Panduan Penggunaan & Perintah

### 1. Instalasi Kebutuhan (jika di-clone ke perangkat baru)
```bash
npm install
```

### 2. Mode Pengembangan (Watch Mode)
Perintah ini akan memantau setiap perubahan pada file HTML/CSS dan meng-compile ulang CSS secara otomatis:
```bash
npm run dev
```

### 3. Build untuk Produksi
Menghasilkan file `dist/output.css` dengan minifikasi optimal:
```bash
npm run build
```

---

## 📄 Lisensi
Hak Cipta &copy; 2026 Toko Urban. All rights reserved.


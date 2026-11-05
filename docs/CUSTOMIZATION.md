# Panduan mengubah portfolio

## Profil dan kontak

Edit `assets/js/config.js`: nama, judul tab, email, tautan GitHub/LinkedIn, foto, nama proyek, preview, logo/nama klien, teknologi, dan pengaturan contoh proyek. Nilai ini digunakan untuk tombol kontak, salin email, navbar, dan kredit footer. Kosongkan `project.clientName` atau `project.clientLogo` jika tidak ingin menampilkan klien.

Edit juga `index.html` untuk metadata awal, nama sebelum JavaScript dimuat, favicon, alamat pada `noscript`, dan kredit fallback. Simpan semua file sebagai UTF-8.

## Konten dua bahasa

`assets/js/content.js` memisahkan teks dari perilaku aplikasi:

- `copy.en` dan `copy.id`: menu dan teks halaman. Entri `slides` berformat `[kalimat pembuka, judul, ...isi]`. Urutan mengikuti `ids` di app.js; perbarui navigasi jika mengubahnya.
- `serviceGroups`: `[judul, keterangan kebutuhan, daftar layanan]`.
- `processSteps`: `[judul, penjelasan, hasil]`. Jika menambah langkah, tambahkan juga ilustrasi `processArt` di icons.js dan label pemilih di app.js.
- `heroText`: baris tetap, awalan, akhiran, serta kata yang diketik. Ruang kata terpanjang dicadangkan agar judul stabil. Pilih kata pendek dengan tata bahasa yang tetap benar di setiap variasi.
- `galleryImages`: `[path gambar, caption Inggris, caption Indonesia]`. Path relatif terhadap index.html, bukan lokasi file JavaScript.
- `projectSamples`: contoh layout yang disembunyikan dari website publik.

Label kecil seperti tombol kontak/galeri masih berada dekat renderer di app.js. Cari `lang === "id"` atau `isId` dan ubah kedua bahasa. Komentar kode menjelaskan batas komponen dan alasan perilaku yang tidak langsung terlihat.

Konten repository ini dipercaya dan dirender sebagai HTML. Jangan memasukkan input pengguna, respons API, atau HTML pihak lain tanpa escaping/sanitasi.

## Foto dan proyek

Gunakan foto sendiri sebagai cutout berwarna dengan transparansi; CSS menangani grayscale dan hover. Lihat `assets/images/README.md` untuk dimensi dan catatan aset.

Perbarui path dan alt text di config.js/content.js; dimensi dan markup ada di project-view.js. Logo PT MBB dan klaim penggunaan Bicless khusus untuk portfolio ini; ganti atau kosongkan data klien pada fork Anda. Jangan menyalin klaim penggunaan produk orang lain.

Untuk menambah proyek, ikuti [PROJECTS.md](PROJECTS.md). Jangan mengaktifkan contoh Mobile/Automation/AI sebagai klaim proyek nyata. Setiap proyek asli harus memiliki screenshot dan galeri yang sesuai.

## Tampilan dan animasi

- `assets/css/site.css`: komponen, carousel, breakpoint, dan animasi. Edit aturan yang relevan sebelum menambah penimpa baru.
- `assets/css/fonts.css`: tiga bobot IBM Plex Mono yang digunakan. Sertakan OFL jika mendistribusikan ulang font.
- Pertahankan kontras, fokus keyboard, dan reduced motion.
- Jangan memaksa teks panjang dengan terus mengecilkan font. Ringkas isi atau ubah pembagian panel, lalu uji layar kecil.

## Publikasi

Jalankan dari root dengan `python -m http.server 8080`. Push source beserta seluruh aset aktif, lalu aktifkan GitHub Pages dari publishing branch dan folder root. Path relatif mendukung repository di subfolder.

Jangan push `.cache/`: folder tersebut dapat berisi sesi login, screenshot mentah, dan tools sementara. Tidak ada kunci API yang dibutuhkan portfolio ini. Ketentuan aset terpisah dari lisensi kode dijelaskan dalam [ASSETS.md](../ASSETS.md).

RASHAWEAR ADMIN STUDIO — DEMO UPDATE

ISI
- index.html: website toko RashaWear
- admin.html: panel admin responsif untuk HP/laptop
- admin.css, admin.js: tampilan dan fungsi admin
- site-admin-content.js: menerapkan perubahan tulisan website
- script.js, style.css, images/: tampilan toko dan aset

FITUR ADMIN
- Tambah, edit, dan hapus produk
- Upload/ganti foto produk dari galeri atau kamera HP
- Edit nama, harga, harga lama, kategori, dan label produk
- Edit deskripsi produk; deskripsi tampil pada kartu produk dan detail produk di website
- Atur stok produk
- Atur ukuran, pisahkan dengan koma (contoh: S, M, L, XL atau All Size)
- Atur warna, pisahkan dengan koma (contoh: Milo:#b89a7a, Black:#1c1c1c, Cream:#efe6d8)
- Pelanggan dapat memilih warna dan ukuran sebelum menambahkan produk ke keranjang
- Edit tulisan utama website melalui tab "Tulisan website"
- Ekspor/impor cadangan produk dan teks

CARA MENCOBA
1. Ekstrak ZIP ke satu folder.
2. Buka admin.html untuk mengelola produk dan teks.
3. Tambah atau edit produk, lalu isi deskripsi, stok, ukuran, dan warna.
4. Pilih foto baru jika ingin mengganti foto. Foto otomatis dikecilkan agar lebih ringan.
5. Buka index.html di browser yang sama untuk melihat perubahan.
6. Gunakan tab "Pindah perangkat" untuk ekspor/impor cadangan JSON.

BATASAN PENTING
Ini prototipe frontend. Data disimpan di localStorage browser, bukan di server.
- Perubahan hanya terlihat di browser/perangkat yang menyimpan data tersebut.
- Pelanggan dari perangkat lain tidak otomatis melihat perubahan.
- Ekspor/impor cadangan dapat digunakan untuk memindahkan data secara manual.
- Stok ditampilkan pada website dan produk stok habis tidak dapat ditambahkan ke keranjang, tetapi stok belum otomatis berkurang setelah pesanan.
- Jangan mempublikasikan admin.html tanpa autentikasi; halaman demo ini belum memiliki login admin.
- Untuk operasional sungguhan, sambungkan ke backend online (misalnya Supabase: database, autentikasi, dan storage foto), kemudian deploy website agar perubahan admin tersinkron untuk semua pengunjung.

CATATAN
Untuk pengujian paling konsisten, jalankan folder ini melalui web server statis atau hosting HTTPS. Browser tertentu membatasi beberapa fitur saat file dibuka langsung dari file://.

PEMBARUAN VARIAN PRODUK
- Di admin, tekan Edit produk lalu bagian “Warna, stok & foto per varian”.
- Setiap warna memiliki kode warna, jumlah stok, dan galeri foto sendiri.
- Pada input foto warna, pilih beberapa foto sekaligus dari galeri HP. Foto dapat dihapus satu per satu dengan tombol ×.
- Total stok produk dihitung dari penjumlahan stok semua warna.
- Di halaman toko, kartu produk menampilkan galeri foto. Saat pelanggan memilih warna, foto warna tersebut ditampilkan dan dapat digeser dengan tombol kiri/kanan di panel pilihan varian.
- Tab Tulisan website sekarang mencakup judul/deskripsi koleksi, capsule, testimoni, Instagram, checkout, dan beberapa teks footer.

CATATAN PENTING
Versi ini tetap demo berbasis localStorage browser. Foto yang banyak dapat memenuhi batas penyimpanan browser; foto akan dikompres otomatis. Data tidak otomatis tersinkron antarperangkat atau ke pengunjung lain. Untuk toko publik, perlu backend/database dan penyimpanan foto online. Stok per warna ditampilkan dan dicek saat memilih varian, tetapi belum ada sistem order/checkout yang mengurangi stok secara otomatis.
- Bagian “Tulisan website” juga memiliki penggantian foto hero utama, foto detail hero, foto capsule, dan 3 foto Instagram. Foto tersebut dikompres dan dipakai di halaman toko.
- Editor teks mencakup beberapa judul/deskripsi bagian utama dan teks footer. Beberapa elemen statis lain (misalnya teks testimoni satu per satu dan URL marketplace) masih perlu pengembangan lanjutan bila ingin semuanya dapat diedit dari dashboard.

STRUKTUR BARU (web & admin dipisah folder)
- / (root)  : website toko (index.html, style.css, script.js, site-admin-content.js, images/)
- /admin/   : panel admin (index.html, admin.css, admin.js)
Buka admin di: alamat-website/admin/

# ABYS CONTROL — Local Android-friendly UI MVP

Dashboard demonstrasi dengan UI gelap dan ikon SVG inline.

## Fitur MVP
- Lock panel demo dengan PIN 4–8 digit (hanya `sessionStorage`, bukan keamanan sistem).
- Dialog pengaturan PIN.
- Pratinjau kamera lokal setelah pengguna menekan tombol dan memberi izin browser.
- Responsif untuk layar HP.

## Batasan
Ini adalah prototipe UI web lokal, bukan RAT dan belum menjadi APK Android. Tidak ada server, koneksi remote, pengumpulan data, atau kontrol tersembunyi. Lock HP di sini hanya mengunci panel demo, bukan seluruh perangkat. Lock aplikasi lain tidak tersedia dari halaman web biasa.

## Menjalankan
Kamera browser umumnya membutuhkan `localhost` atau HTTPS. Untuk mencoba dari komputer:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser. Untuk Android/Termux, jalankan server dari folder project dan buka alamat localhost di browser HP.

## Upload ke GitHub
1. Buat repository baru bernama `abys-control`.
2. Ekstrak ZIP ini.
3. Upload `index.html`, `style.css`, `app.js`, dan `README.md` ke repository.
4. Untuk menampilkan versi web, aktifkan GitHub Pages dari Settings → Pages.

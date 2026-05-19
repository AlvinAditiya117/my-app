# Tabel Perbandingan Metode Rendering Next.js

## Tugas Individu 2 – Perbandingan CSR, SSR, SSG

| Aspek            | CSR (Client Side Rendering)                          | SSR (Server Side Rendering)                        | SSG (Static Site Generation)                        |
|------------------|------------------------------------------------------|----------------------------------------------------|-----------------------------------------------------|
| **Loading**      | Ada loading state saat data di-fetch di browser      | Tidak ada loading, data sudah siap saat halaman tiba | Tidak ada loading, halaman sudah jadi saat build    |
| **Build Required** | Tidak perlu build ulang                            | Tidak perlu build ulang                            | Perlu build ulang jika data berubah                 |
| **SEO**          | Buruk – konten tidak tersedia saat crawling          | Baik – konten sudah ada di HTML saat dikirim server | Baik – konten sudah ada di HTML statis              |
| **Perubahan Data** | Langsung terlihat tanpa build ulang               | Langsung terlihat tanpa build ulang                | Tidak terlihat sampai build ulang dijalankan        |

---

## Penjelasan Singkat

### CSR (Client Side Rendering)
- Data di-fetch **setelah** halaman di-render di browser menggunakan `useSWR` atau `fetch`
- Ada jeda loading sebelum data muncul
- Cocok untuk halaman yang tidak butuh SEO dan datanya sering berubah
- Implementasi: `useRouter` + `useSWR` di `[produk].tsx`

### SSR (Server Side Rendering)
- Data di-fetch **di server** setiap kali ada request menggunakan `getServerSideProps`
- Tidak ada loading state karena data sudah tersedia sebelum halaman dikirim ke browser
- Cocok untuk halaman yang butuh SEO dan datanya sering berubah
- Implementasi: `getServerSideProps` di `[produk].tsx`

### SSG (Static Site Generation)
- Halaman di-generate **saat build time** menggunakan `getStaticPaths` + `getStaticProps`
- Tidak ada loading, tidak ada fetch saat runtime
- Cocok untuk halaman yang jarang berubah dan butuh performa tinggi
- Implementasi: `getStaticPaths` + `getStaticProps` di `[produk].tsx`

---

## Perbandingan SSG vs ISR

| Aspek          | SSG                        | ISR                          |
|----------------|----------------------------|------------------------------|
| **Update Data**    | Harus build ulang          | Otomatis / Trigger           |
| **Cache**          | Static permanen            | Static + Refresh             |
| **Cocok untuk**    | Konten tetap               | Konten semi-dinamis          |

---

## Penjelasan Singkat

### SSG (Static Site Generation)
- Halaman di-generate **saat build time**
- Data tidak akan berubah sampai dilakukan `npm run build` ulang
- Cocok untuk konten yang jarang atau tidak pernah berubah
- Implementasi: `getStaticProps` tanpa `revalidate` di `static.tsx`

### ISR (Incremental Static Regeneration)
- Halaman tetap static, namun dapat diperbarui setelah waktu tertentu (`revalidate`)
- Tidak perlu rebuild aplikasi — cache diperbarui di background
- Bisa juga di-trigger secara manual via endpoint On-Demand Revalidation
- Cocok untuk konten semi-dinamis yang berubah sesekali
- Implementasi: `getStaticProps` dengan `revalidate: 10` di `static.tsx`

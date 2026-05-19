import { useSession } from "next-auth/react";

const HalamanEditor = () => {
  const { data }: any = useSession();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Halaman Editor</h1>
      <p>
        Selamat datang, <strong>{data?.user?.fullname}</strong>!
      </p>
      <p>
        Anda login sebagai <strong>{data?.user?.role}</strong>. Halaman ini
        hanya dapat diakses oleh user dengan role <em>editor</em> atau{" "}
        <em>admin</em>.
      </p>
      <div
        style={{
          marginTop: "24px",
          padding: "20px",
          background: "#f0fdf4",
          borderRadius: "8px",
          border: "1px solid #86efac",
        }}
      >
        <h2>Fitur Editor</h2>
        <ul>
          <li>Membuat dan mengedit konten artikel</li>
          <li>Mengelola kategori konten</li>
          <li>Mempublikasikan atau menyimpan draft</li>
        </ul>
      </div>
    </div>
  );
};

export default HalamanEditor;

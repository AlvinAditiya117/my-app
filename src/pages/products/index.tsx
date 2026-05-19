import { useRouter } from "next/router";

const ProductsPage = () => {
  const { push } = useRouter();

  return (
    <div style={{ padding: "20px" }}>
      <h1 data-testid="products-title">Products Page</h1>
      <p data-testid="products-desc">Ini adalah halaman Products yang diproteksi middleware.</p>
      <button data-testid="back-btn" onClick={() => push("/")}>Kembali ke Home</button>
    </div>
  );
};

export default ProductsPage;

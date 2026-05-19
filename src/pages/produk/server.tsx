import { GetServerSideProps } from "next";
import TampilanProduk from "@/views/produk";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "../../../utils/db/servicefirebase";

type Props = {
  products: ProductType[];
};

const ProdukServerPage = ({ products }: Props) => {
  return (
    <div>
      <h1 style={{ padding: "1rem 2rem", fontSize: "1.5rem", fontWeight: "bold" }}>
        Halaman Produk Server
      </h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await retrieveProducts("products");
    return {
      props: {
        products: data ?? [],
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};

export default ProdukServerPage;

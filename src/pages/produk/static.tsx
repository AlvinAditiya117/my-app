import { GetStaticProps } from "next";
import TampilanProduk from "@/views/produk";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "../../../utils/db/servicefirebase";

type Props = {
  products: ProductType[];
};

const ProdukSSGPage = ({ products }: Props) => {
  return (
    <div>
      <h1 style={{ padding: "1rem 2rem", fontSize: "1.5rem", fontWeight: "bold" }}>
        Halaman Produk (SSG)
      </h1>
      <TampilanProduk products={products} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await retrieveProducts("products");
    return {
      props: {
        products,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
      revalidate: 10,
    };
  }
};

export default ProdukSSGPage;

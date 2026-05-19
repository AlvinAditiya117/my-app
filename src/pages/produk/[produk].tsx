import { GetStaticPaths, GetStaticProps } from "next";
import DetailProduct from "@/views/DetailProduct";
import { retrieveProducts, retrieveProductById } from "../../../utils/db/servicefirebase";

// CSR - dinonaktifkan
// import { useRouter } from "next/router";
// export default function ProdukDetailPage() {
//   const router = useRouter();
//   const { produk } = router.query;
//   return <DetailProduct id={produk as string} />;
// }

// SSR - dinonaktifkan
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { produk } = context.params!;
//   try {
//     const data = await retrieveProductById("products", produk as string);
//     return { props: { product: data ?? null } };
//   } catch (error) {
//     return { props: { product: null } };
//   }
// };

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  size?: string;
};

type Props = {
  product: ProductType | null;
};

export default function ProdukDetailPage({ product }: Props) {
  return <DetailProduct product={product ?? undefined} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await retrieveProducts("products");
    const paths = products.map((product: any) => ({
      params: { produk: product.id },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { produk } = context.params!;

  try {
    const data = await retrieveProductById("products", produk as string);
    return {
      props: {
        product: data ?? null,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
};

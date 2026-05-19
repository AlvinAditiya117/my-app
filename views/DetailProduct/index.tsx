import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";
import styles from "./detailProduct.module.scss";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  size?: string;
};

type Props = {
  id?: string;
  product?: ProductType | null;
};

const DetailProduct = ({ id, product: productSSR }: Props) => {
  const router = useRouter();
  const produkId = id ?? (router.query.produk as string);

  const { data, isLoading } = useSWR(
    !productSSR && produkId ? `/api/produk/${produkId}` : null,
    fetcher
  );

  const product: ProductType | null = productSSR ?? data?.data ?? null;

  if (!productSSR && isLoading) {
    return <div className={styles.detail__loading}>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.detail__error}>Produk tidak ditemukan.</div>;
  }

  return (
    <div className={styles.detail}>
      <p className={styles.detail__back} onClick={() => router.back()}>
        ← Kembali
      </p>
      <h2 className={styles.detail__title}>Detail Produk</h2>
      <div className={styles.detail__card}>
        <div className={styles.detail__image}>
          {/* <img src={product.image} alt={product.name} /> */}
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.detail__info}>
          <h1 className={styles.detail__name}>{product.name}</h1>
          <p className={styles.detail__category}>{product.category}</p>
          <p className={styles.detail__price}>
            Rp {product.price?.toLocaleString()}
          </p>
          {product.size && (
            <p className={styles.detail__size}>Ukuran: {product.size}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

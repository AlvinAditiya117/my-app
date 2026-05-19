import { useRouter } from "next/router";

const halamanCategory = () => {
  const { query } = useRouter();
  const slug = query.slug as string[];

  return (
    <div>
      <h1>Halaman Category</h1>
      <p>Kategori: {slug ? slug[0] : "Semua Kategori"}</p>
      <ul>
        {slug &&
          slug.map((segment, index) => (
            <li key={index}>
              [{index}] {segment}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default halamanCategory;

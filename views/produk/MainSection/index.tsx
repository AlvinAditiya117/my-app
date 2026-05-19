type Produk = {
  id: string;
  nama: string;
  harga: number;
  ukuran: string;
  warna: string;
};

type Props = {
  data: Produk[];
};

const MainSection = ({ data = [] }: Props) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daftar Produk</h2>
      <div className="grid grid-cols-1 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-bold text-gray-800">{item.nama}</h3>
            <p className="text-gray-600">Harga: Rp {item.harga.toLocaleString("id-ID")}</p>
            <p className="text-gray-600">Ukuran: {item.ukuran}</p>
            <p className="text-gray-600">Warna: {item.warna}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;

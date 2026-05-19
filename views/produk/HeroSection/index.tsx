import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-blue-600 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Teks */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Produk Unggulan Kami</h1>
          <p className="text-lg text-blue-100 leading-relaxed">
            Temukan koleksi produk terbaik pilihan kami. Kualitas terjamin,
            harga terjangkau, dan pengiriman cepat ke seluruh Indonesia.
          </p>
        </div>

        {/* Gambar Ilustrasi */}
        <div className="flex-1 flex justify-center">
          <Image
            src="https://illustrations.popsy.co/amber/shopping-cart.svg"
            alt="Ilustrasi Produk"
            width={320}
            height={320}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

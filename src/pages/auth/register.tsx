import dynamic from "next/dynamic";

// Dynamic import untuk lazy loading komponen TampilanRegister
const TampilanRegister = dynamic(() => import("@/views/auth/Register"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const halamanRegister = () => {
  return (
    <TampilanRegister />
  );
};

export default halamanRegister;

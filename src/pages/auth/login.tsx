import dynamic from "next/dynamic";

// Dynamic import untuk lazy loading komponen TampilanLogin
const TampilanLogin = dynamic(() => import("@/views/auth/Login"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const halamanLogin = () => {
  return (
    <>
      <TampilanLogin />
    </>
  );
};

export default halamanLogin;

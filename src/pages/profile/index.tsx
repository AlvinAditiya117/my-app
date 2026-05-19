import { useSession } from "next-auth/react";

const HalamanProfile = () => {
  const { data }: any = useSession();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Halaman Profile</h1>
      <br />
      <p><strong>Nama:</strong> {data?.user?.fullname}</p>
      <p><strong>Email:</strong> {data?.user?.email}</p>
      <p><strong>Role:</strong> {data?.user?.role}</p>
    </div>
  );
};

export default HalamanProfile;

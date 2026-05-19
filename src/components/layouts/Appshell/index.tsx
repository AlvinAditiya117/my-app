import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { Roboto } from "next/font/google";

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

type AppShellProps = {
  children: React.ReactNode;
  noNavbar?: boolean;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const AppShell = (props: AppShellProps) => {
  const { children, noNavbar } = props;
  const { pathname } = useRouter();

  const hideNavbar = noNavbar || disableNavbar.includes(pathname);

  return (
    <main data-testid="appshell" className={roboto.className}>
      {!hideNavbar && <Navbar />}
      {children}
    </main>
  );
};

export default AppShell;

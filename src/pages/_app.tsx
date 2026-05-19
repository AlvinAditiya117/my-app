import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppShell from '@/components/layouts/Appshell'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const noNavbar = (Component as any).noNavbar ?? false;
  return (
    <SessionProvider session={session}>
      <AppShell noNavbar={noNavbar}>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
}

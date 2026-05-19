import Head from 'next/head'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>
      <h1>Praktikum Next.js Pages Router</h1> <br />
      <p>Mahasiswa D4 Pengembangan Web</p>
      <br />
      {session && (
        <div>
          <p>Session: {JSON.stringify(session)}</p>
        </div>
      )}
    </div>
  )
}

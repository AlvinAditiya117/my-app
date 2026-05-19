import { useRouter } from 'next/router'

export default function BlogDetailPage() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <h1>Blog Detail</h1>
      <p>Slug: <strong>{slug}</strong></p>
    </div>
  )
}

import { render, screen } from "@testing-library/react"
import ProductsPage from "@/pages/products"

// Mock Next Router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/products",
      pathname: "/products",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    }
  },
}))

describe("Products Page", () => {
  it("renders products page correctly", () => {
    // Snapshot test
    const page = render(<ProductsPage />)
    expect(page).toMatchSnapshot()
  })

  it("menampilkan judul halaman dengan benar", () => {
    render(<ProductsPage />)
    // getByTestId test
    expect(screen.getByTestId("products-title").textContent).toBe("Products Page")
  })

  it("menampilkan deskripsi halaman dengan benar", () => {
    render(<ProductsPage />)
    // toBe test
    expect(screen.getByTestId("products-desc").textContent).toBe(
      "Ini adalah halaman Products yang diproteksi middleware."
    )
  })

  it("menampilkan tombol kembali ke home", () => {
    render(<ProductsPage />)
    expect(screen.getByTestId("back-btn").textContent).toBe("Kembali ke Home")
  })
})

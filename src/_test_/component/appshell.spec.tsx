import { render, screen } from "@testing-library/react"
import AppShell from "@/components/layouts/Appshell"

// Mock Next Router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/auth/login",
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

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Mock next/font/google
jest.mock("next/font/google", () => ({
  Roboto: () => ({
    className: "roboto-mock",
  }),
}))

describe("AppShell Component", () => {
  it("renders appshell dengan children dengan benar", () => {
    // Snapshot test
    const page = render(
      <AppShell>
        <p data-testid="child-content">Konten Anak</p>
      </AppShell>
    )
    expect(page).toMatchSnapshot()
  })

  it("merender elemen appshell dengan testid", () => {
    render(
      <AppShell>
        <p>Test</p>
      </AppShell>
    )
    // getByTestId test
    expect(screen.getByTestId("appshell")).toBeTruthy()
  })

  it("menyembunyikan navbar pada halaman login", () => {
    render(
      <AppShell>
        <p data-testid="child-content">Konten</p>
      </AppShell>
    )
    // toBe test - pathname /auth/login → navbar disembunyikan
    expect(screen.getByTestId("child-content").textContent).toBe("Konten")
  })
})

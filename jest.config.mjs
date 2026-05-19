import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/pages/about/**/*.{ts,tsx}',
    'src/pages/products/**/*.{ts,tsx}',
    'src/pages/produk/index.tsx',
    'src/components/layouts/Appshell/**/*.{ts,tsx}',
    '!**/*.d.ts',
  ],
}

export default createJestConfig(config)

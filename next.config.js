/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    // NEXT_PUBLIC_API_MOCKING: "disabled",
    NEXT_PUBLIC_API_MOCKING: "enabled",
  },
}

module.exports = nextConfig

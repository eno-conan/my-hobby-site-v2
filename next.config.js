/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
};

module.exports = nextConfig;

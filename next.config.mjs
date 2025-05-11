/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Указываем, где находятся страницы
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  experimental: {
    // Указываем корневой каталог для страниц
    appDir: false,
    pagesDir: './client/src/pages'
  },
  output: 'standalone',
  // Указываем, что Next.js отвечает только за эти пути
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // Локальный прокси для API
      }
    ]
  }
};

export default nextConfig; 
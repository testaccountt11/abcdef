/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Удалите swcMinify
  // Удалите experimental блок с appDir и pagesDir
  output: 'standalone',
  // Указываем, что Next.js отвечает только за эти пути
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*'
      }
    ]
  }
};

export default nextConfig; 
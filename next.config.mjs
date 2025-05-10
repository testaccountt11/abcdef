/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Указываем где находятся исходники
  distDir: 'dist',
  
  // Конфигурация изображений
  images: {
    domains: ['hhcdn.ru', 'via.placeholder.com'],
  },
  
  // Заголовки
  async headers() {
    return [
      {
        source: '/api/headhunter-internships',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig 
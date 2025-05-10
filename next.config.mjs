/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Удаляем неподдерживаемую опцию dir
  distDir: 'dist',
  
  // Конфигурация изображений
  images: {
    domains: ['hhcdn.ru', 'via.placeholder.com'],
  },
  
  // Настройка алиасов
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/client/src',
      '@shared': '/shared',
      '@components': '/client/src/components',
      '@hooks': '/client/src/hooks',
      '@contexts': '/client/src/contexts',
      '@ui': '/client/src/components/ui'
    };
    return config;
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
      {
        source: '/api/hh-vacancies',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      }
    ]
  },
}

export default nextConfig 
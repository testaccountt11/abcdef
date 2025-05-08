module.exports = {
  images: {
    domains: ['hhcdn.ru', 'via.placeholder.com'],
  },
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
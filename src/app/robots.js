export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/login',
          '/public/?products/*',
        ],
      },
    ],
    sitemap: 'https://www.servicesplus.in/sitemap.xml',
  };
}


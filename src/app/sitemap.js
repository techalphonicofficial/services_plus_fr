import { getAllServices } from '../content/services';
import { getAllBlogs } from '../content/blogs';

export default async function sitemap() {
  const baseUrl = 'https://www.servicesplus.in';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/payment',
    '/notification',
    '/policy/privacy-policy',
    '/policy/terms-and-condition',
    '/user-login',
    '/user-register',
    '/service-by-categories/startup',
    '/service-by-categories/trademark',
    '/service-by-categories/taxes',
    '/service-by-categories/compliance',
    '/service-by-categories/certification-licensing',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // All 119 Service routes
  const serviceRoutes = getAllServices().map(service => ({
    url: `${baseUrl}/service/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // All 93 Blog routes
  const blogRoutes = getAllBlogs().map(blog => ({
    url: `${baseUrl}/blog-detail/${blog.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}


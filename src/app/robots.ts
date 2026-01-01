import { MetadataRoute } from 'next';
import { getSiteUrl, getSiteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  const disallowedPaths = ['/api/'];
  
  // Only disallow /admin if it's enabled (if disabled, it doesn't exist anyway)
  if (config.admin.enabled) {
    disallowedPaths.push('/admin');
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: getSiteUrl('/sitemap.xml'),
  };
}




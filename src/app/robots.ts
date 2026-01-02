import { MetadataRoute } from 'next';
import { getSiteUrl, getSiteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  const disallowedPaths = ['/api/'];
  
 
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




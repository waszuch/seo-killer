import { SiteConfig } from '@/types/config';
import siteConfigJson from '../../site.config.json';

export function getSiteConfig(): SiteConfig {
  return siteConfigJson as SiteConfig;
}

export function replaceTemplateVars(
  template: string,
  vars: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

export function getSiteUrl(path: string = ''): string {
  const config = getSiteConfig();
  const protocol = config.domain.includes('localhost') ? 'http://' : 'https://';
  const url = `${protocol}${config.domain}${path}`;
  return url;
}

export function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomAnchorForDomain(domain: string): string | null {
  const config = getSiteConfig();
  const domainConfig = config.externalLinks.allowedDomains.find(
    (d) => d.domain === domain
  );
  
  if (!domainConfig || domainConfig.anchors.length === 0) {
    return null;
  }
  
  return getRandomItem(domainConfig.anchors) || null;
}



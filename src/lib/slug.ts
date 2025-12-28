export function generateSlug(text: string): string {
  const polishMap: Record<string, string> = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n',
    'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z'
  };

  let slug = text.toLowerCase();
  
  for (const [polish, latin] of Object.entries(polishMap)) {
    slug = slug.replace(new RegExp(polish, 'g'), latin);
  }
  
  slug = slug
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return slug;
}

export function generateUniqueSlug(title: string, existingSlugs: string[]): string {
  let slug = generateSlug(title);
  let counter = 1;
  const originalSlug = slug;
  
  while (existingSlugs.includes(slug)) {
    slug = `${originalSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}





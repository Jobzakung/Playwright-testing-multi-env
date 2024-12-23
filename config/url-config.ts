export const URLS = {
  URL_Register: '',
  TMN: '/tmn'
} as const;

export const CHANNELS = {
  LINE: 'line',
  TMN: 'tmn'
} as const;

export function getFullUrl(path: string, lang: string, options?: { 
  channel?: string;
  tmnToken?: string; 
}) {
  // กำหนด base URL
  const baseUrl = 'https://example.com';
  
  // สร้าง URL object
  const url = new URL(baseUrl);
  
  // เพิ่ม path (ถ้ามี)
  if (path) {
    url.pathname = path;
  }
  
  // เพิ่ม query parameters
  if (options?.channel) {
    url.searchParams.append('channel', options.channel);
  }
  
  url.searchParams.append('lang', lang);
  
  if (options?.tmnToken) {
    url.searchParams.append('tmn-token', options.tmnToken);
  }
  
  return url.toString();
}
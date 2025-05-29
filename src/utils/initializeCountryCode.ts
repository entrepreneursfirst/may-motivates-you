// utils/initializeCountryCode.ts
import Cookies from 'js-cookie';
import { getUserCountryCode } from '@/utils/db/user';

export async function initializeCountryCode(userId: string | null, countryCodes: any[]) {
  const sessionCode = Cookies.get('country_code');
  if (sessionCode) return sessionCode;

  if (userId) {
    try {
      const userCountry = await getUserCountryCode(userId);
      if (userCountry) {
        Cookies.set('country_code', userCountry);
        return userCountry;
      }
    } catch (e) {
      console.error('Failed DB country fetch', e);
    }
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const ipCode = data?.country_calling_code;
    if (ipCode) {
      Cookies.set('country_code', ipCode);
      return ipCode;
    }
  } catch (e) {
    console.warn('IP fallback failed', e);
  }

  return null;
}
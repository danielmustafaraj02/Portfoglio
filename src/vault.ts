import { contact as sealedContact, iterations, salt, type Sealed } from 'virtual:vault';
import type { Lang } from './profile';

export type Unlocked = { email: string; phone: string; cv: Record<Lang, string> };

const SESSION_KEY = 'unlock-code';

const bytes = (base64: string) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));

function open(key: CryptoKey, sealed: Sealed) {
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(sealed.iv) }, key, bytes(sealed.data));
}

/** Resolves with the contact details and CV download links if the code is right, or null if it is wrong. */
export async function unlock(code: string): Promise<Unlocked | null> {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: bytes(salt), iterations, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );
  let contact: Omit<Unlocked, 'cv'>;
  try {
    contact = JSON.parse(new TextDecoder().decode(await open(key, sealedContact)));
  } catch {
    return null; // AES-GCM authenticates, so decryption fails only with the wrong key, i.e. the wrong code
  }
  const { cv } = await import('virtual:vault-cv');
  const [en, it] = await Promise.all([open(key, cv.en), open(key, cv.it)]);
  const url = (pdf: ArrayBuffer) => URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
  try { sessionStorage.setItem(SESSION_KEY, code); } catch { /* not remembered; the visitor types it again next time */ }
  return { ...contact, cv: { en: url(en), it: url(it) } };
}

/** Unlocks again with the code entered earlier in this tab, so a reload doesn't lock the page. */
export function restore(): Promise<Unlocked | null> {
  let code: string | null = null;
  try { code = sessionStorage.getItem(SESSION_KEY); } catch { /* storage unavailable: stay locked */ }
  return code ? unlock(code) : Promise.resolve(null);
}

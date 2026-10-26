// Generated at build time by the vault plugin in vite.config.ts.
declare module 'virtual:vault' {
  export type Sealed = { iv: string; data: string };
  export const salt: string;
  export const iterations: number;
  export const contact: Sealed;
}

declare module 'virtual:vault-cv' {
  export const cv: Record<'en' | 'it', import('virtual:vault').Sealed>;
}

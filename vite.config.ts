import { Buffer } from 'node:buffer'
import { createCipheriv, pbkdf2Sync, randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { privateContact } from './src/profile'

// The code visitors type to see the email, phone and CV. The deployed site never contains it:
// the build encrypts that data with a key derived from the code, and the page checks a code by trying to decrypt.
const UNLOCK_CODE = '0101'
const ITERATIONS = 250_000
const CV_FILES = {
  en: fileURLToPath(new URL('./cv/CV-Daniel-Mustafaraj.pdf', import.meta.url)),
  it: fileURLToPath(new URL('./cv/CV-Daniel-Mustafaraj-IT.pdf', import.meta.url)),
}

/** Serves `virtual:vault` (contact details) and `virtual:vault-cv` (the PDFs, fetched only after unlocking) as AES-GCM ciphertext. */
function vault(): Plugin {
  const salt = randomBytes(16)
  const key = pbkdf2Sync(UNLOCK_CODE, salt, ITERATIONS, 32, 'sha256')
  const seal = (plain: Buffer) => {
    const iv = randomBytes(12)
    const cipher = createCipheriv('aes-256-gcm', key, iv)
    // Web Crypto expects the auth tag appended to the ciphertext.
    const data = Buffer.concat([cipher.update(plain), cipher.final(), cipher.getAuthTag()])
    return { iv: iv.toString('base64'), data: data.toString('base64') }
  }

  return {
    name: 'vault',
    resolveId(id) {
      if (id === 'virtual:vault' || id === 'virtual:vault-cv') return '\0' + id
    },
    load(id) {
      if (id === '\0virtual:vault') {
        const contact = seal(Buffer.from(JSON.stringify(privateContact)))
        return `export const salt = ${JSON.stringify(salt.toString('base64'))};\n`
          + `export const iterations = ${ITERATIONS};\n`
          + `export const contact = ${JSON.stringify(contact)};\n`
      }
      if (id === '\0virtual:vault-cv') {
        Object.values(CV_FILES).forEach(file => this.addWatchFile(file))
        const cv = { en: seal(readFileSync(CV_FILES.en)), it: seal(readFileSync(CV_FILES.it)) }
        return `export const cv = ${JSON.stringify(cv)};\n`
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vault()],
})

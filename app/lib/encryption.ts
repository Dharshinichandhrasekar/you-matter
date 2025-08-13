// lib/encryption.ts
// Device-key fallback via exporting JWK to localStorage.
// AES-GCM 256-bit, returns base64 ciphertext and base64 iv.

const KEY_STORAGE = "youmatter_device_key_jwk";

async function generateAesKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

async function exportKeyToJwk(key: CryptoKey) {
  return await crypto.subtle.exportKey("jwk", key);
}

async function importKeyFromJwk(jwk: JsonWebKey) {
  return await crypto.subtle.importKey("jwk", jwk, { name: "AES-GCM" }, true, [
    "encrypt",
    "decrypt",
  ]);
}

async function getOrCreateDeviceKey(): Promise<CryptoKey> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    throw new Error('Encryption is only available in browser environment');
  }
  
  const stored = localStorage.getItem(KEY_STORAGE);
  if (stored) {
    try {
      const jwk = JSON.parse(stored);
      return importKeyFromJwk(jwk);
    } catch (e) {
      console.warn("Failed to import stored key, regenerating", e);
    }
  }
  const key = await generateAesKey();
  const jwk = await exportKeyToJwk(key);
  localStorage.setItem(KEY_STORAGE, JSON.stringify(jwk));
  return key;
}

function bufToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuf(base64: string) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encryptText(plain: string) {
  if (typeof window === 'undefined') {
    throw new Error('Encryption is only available in browser environment');
  }
  
  const key = await getOrCreateDeviceKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit iv for AES-GCM
  const enc = new TextEncoder();
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plain)
  );

  return {
    ciphertext: bufToBase64(ct),
    iv: bufToBase64(iv.buffer),
    alg: "AES-GCM-256",
  };
}

export async function decryptText(ciphertextB64: string, ivB64: string) {
  if (typeof window === 'undefined') {
    throw new Error('Decryption is only available in browser environment');
  }
  
  try {
    const key = await getOrCreateDeviceKey();
    const iv = new Uint8Array(base64ToBuf(ivB64));
    const ct = base64ToBuf(ciphertextB64);
    const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    const dec = new TextDecoder();
    return dec.decode(plainBuf);
  } catch (e) {
    console.error("Decryption failed", e);
    throw e;
  }
}

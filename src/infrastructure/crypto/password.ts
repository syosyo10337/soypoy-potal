import { scryptAsync } from "@noble/hashes/scrypt.js";
import { bytesToHex, randomBytes } from "@noble/hashes/utils.js";
import { nanoid } from "nanoid";

/**
 * Scrypt configuration for password hashing
 * These parameters provide strong security while maintaining reasonable performance
 */
export const SCRYPT_CONFIG = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
};

/**
 * Hash a password using scrypt algorithm
 * @param password - Plain text password to hash
 * @returns Hashed password in format: "salt:hash"
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = bytesToHex(randomBytes(16));
  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: SCRYPT_CONFIG.N,
    p: SCRYPT_CONFIG.p,
    r: SCRYPT_CONFIG.r,
    dkLen: SCRYPT_CONFIG.dkLen,
    maxmem: 128 * SCRYPT_CONFIG.N * SCRYPT_CONFIG.r * 2,
  });
  return `${salt}:${bytesToHex(key)}`;
}

/**
 * Verify a password against a stored hash
 * @param password - Plain text password to verify
 * @param storedHash - Stored hash in format: "salt:hash"
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const key = await scryptAsync(password.normalize("NFKC"), salt, {
    N: SCRYPT_CONFIG.N,
    p: SCRYPT_CONFIG.p,
    r: SCRYPT_CONFIG.r,
    dkLen: SCRYPT_CONFIG.dkLen,
    maxmem: 128 * SCRYPT_CONFIG.N * SCRYPT_CONFIG.r * 2,
  });

  return bytesToHex(key) === hash;
}

/**
 * Generate a temporary password for password reset
 * Format: Word-Year-RandomString (e.g., "Soypoy-2024-a1b2c3")
 * @returns Generated temporary password
 */
export function generateTempPassword(): string {
  const words = ["Soypoy", "Admin", "Reset"];
  const word = words[Math.floor(Math.random() * words.length)];
  const year = new Date().getFullYear();
  const random = nanoid(6);
  return `${word}-${year}-${random}`;
}

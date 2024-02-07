import { createCipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { createDecipheriv } from "crypto";

export const encrypt = async (data) => {
  const iv = randomBytes(16);
  const password = process.env["ENCRYPTION_KEY"];

// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
  const key = (await promisify(scrypt)(password, "salt", 32)) as Buffer;
  const cipher = createCipheriv("aes-256-ctr", key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);
  return encryptedText.toString('base64');
};

export const decrypt = async (data) => {
  const iv = randomBytes(16);
  const password = process.env["ENCRYPTION_KEY"];
  const key = (await promisify(scrypt)(password, "salt", 32)) as Buffer;
  const decipher = createDecipheriv("aes-256-ctr", key, iv);
  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(data, 'base64')),
    decipher.final()
  ]);
  return decryptedText.toString()
};
import * as process from "process";
import { createCipheriv, randomBytes, createDecipheriv } from 'node:crypto';
require("dotenv").config();

export const encryptData = (data) => {
  const iv = randomBytes(16); // Generate a random IV (Initialization Vector)
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(process.env["ENCRYPTION_KEY"]), iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted; // Prepend the IV to the encrypted data
};

export const decryptData = (encryptedData) => {
  const iv = Buffer.from(encryptedData.slice(0, 32), "hex"); // Extract IV from the encrypted data
  const encryptedText = encryptedData.slice(32); // Get the actual encrypted text
  const decipher = createDecipheriv("aes-256-cbc", Buffer.from(process.env["ENCRYPTION_KEY"]), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
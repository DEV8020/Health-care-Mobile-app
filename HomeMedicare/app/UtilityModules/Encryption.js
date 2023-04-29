import CryptoJS from "crypto-js";

import Aes from "react-native-aes-crypto";

// const generateKey = (password, salt, cost, length) =>
//   Aes.pbkdf2(password, salt, cost, length);

function encryptData(data, key, iv) {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return encrypted.toString();
}

function decryptData(encryptedData, key, iv) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
const EncryptionUtilityModule = { encryptData, decryptData };
export default EncryptionUtilityModule;

//   // Encrypt
//   var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();
//   //log encrypted data
//   console.log('Encrypt Data -')
//   console.log(ciphertext);
// var CryptoJS = require("crypto-js");
//   // Decrypt
//   var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
//   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

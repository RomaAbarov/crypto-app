import { cryptoAssets, cryptoData } from "./data.js";

export function fakeFetchCryptoData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cryptoData), 1500);
  });
}

export function fakeFetchCryptoAssets() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cryptoAssets), 1500);
  });
}

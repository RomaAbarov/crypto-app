import { createContext, useState, useEffect } from "react";
import { fakeFetchCryptoAssets, fakeFetchCryptoData } from "../api.js";
import { calcPercentDiff } from "../utils.js";

export const ContextCrypto = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function ContextCryptoProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      let coin = result.find((el) => el.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: calcPercentDiff(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function fakeFetchQuery() {
      setLoading(true);
      let { result } = await fakeFetchCryptoData();
      let assets = await fakeFetchCryptoAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    fakeFetchQuery();
  }, []);

  function updateAsset(array, newAsset) {
    let indexDublicateID = array.findIndex((obj) => obj.id === newAsset.id);
    if (indexDublicateID !== -1) {
      array[indexDublicateID] = {
        ...newAsset,
        amount: array[indexDublicateID].amount + newAsset.amount,
      };
    } else {
      array.push(newAsset);
    }
    return array;
  }

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets(updateAsset(prev, newAsset), crypto));
  }

  return (
    <ContextCrypto.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </ContextCrypto.Provider>
  );
}

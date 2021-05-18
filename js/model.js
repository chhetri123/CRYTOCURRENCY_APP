import Zabo from 'zabo-sdk-js';
import { LIMIT_API_DATA_CALL } from './config.js';
let currency;

const zaboInit = async () => {
  try {
    const zabo = await Zabo.init({
      clientId:
        'P3tfNcM9evWUnVvrKZQGqurhB6yFJMGTBM6lyC2JyKz77OZvS28U8roEzuzWDCpP',
      env: 'sandbox',
    });
    return zabo;
  } catch (err) {
    throw err;
  }
};

export const fetchAPICurrency = async () => {
  try {
    const zabo = await zaboInit();
    currency = await zabo.currencies.getList({ limit: LIMIT_API_DATA_CALL });
    const { data } = await currency;
    if (!data) throw new Error('Not Fetch Data');
    return data;
  } catch (err) {
    throw err;
  }
};

export const showExchangeRate = async (data) => {
  try {
    const zabo = await zaboInit();
    const tickers = data.ticker;
    const curr = await zabo.currencies.getExchangeRates({ tickers });
    return curr.rate;
  } catch (err) {
    throw err;
  }
};
export const loadMore = async () => {
  try {
    currency = await currency.next();
    const { data } = await currency;
    if (!data) throw new Error('Not Fetch Data');
    return data;
  } catch (err) {
    throw err;
  }
};

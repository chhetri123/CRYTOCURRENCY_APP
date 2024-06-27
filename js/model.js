import { API_KEY } from "./config.js";
const corsProxy = "https://cors-anywhere.herokuapp.com/";
const APIURL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

const fetchCrypto = async (limit = 10, start = 1) => {
  console.log(limit, start);
  try {
    const response = await fetch(
      `${corsProxy}${APIURL}?limit=${limit}&start=${start}`,
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const fetchAPICurrency = async () => {
  try {
    const data = await fetchCrypto();
    if (!data) throw new Error("Not Fetch Data");
    return data;
  } catch (err) {
    throw err;
  }
};

export const loadMore = async (limit, start) => {
  try {
    const additionalData = await fetchCrypto(limit, start);
    if (!additionalData) throw new Error("Not Fetch Data");
    return additionalData;
  } catch (err) {
    throw err;
  }
};

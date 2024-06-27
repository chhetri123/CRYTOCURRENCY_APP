import { API_KEY } from "./config.js";

export class Model {
  constructor() {
    this.corsProxy = "https://cors-anywhere.herokuapp.com/";
    this.APIURL =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    this.headers = { "X-CMC_PRO_API_KEY": API_KEY };
  }

  async fetchCrypto(limit = 10, start = 1) {
    const url = `${this.corsProxy}${this.APIURL}?limit=${limit}&start=${start}`;
    const response = await fetch(url, { method: "GET", headers: this.headers });
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  }

  async fetchAPICurrency() {
    return this.fetchCrypto();
  }

  async loadMore(limit, start) {
    return this.fetchCrypto(limit, start);
  }
}

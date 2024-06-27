import { Model } from "./model.js";
import { View } from "./view.js";

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.init();
  }

  async fetchAndRenderCurrency() {
    try {
      const data = await this.model.fetchAPICurrency();
      this.view.renderCurrency(data);
    } catch (err) {
      this.view.showError(err.message);
    }
  }

  init() {
    this.fetchAndRenderCurrency();
    this.view.addLoadMoreHandler(this.handleLoadMore.bind(this));
  }

  async handleLoadMore(limit, start) {
    try {
      const data = await this.model.loadMore(limit, start);
      this.view.renderCurrency(data);
    } catch (err) {
      this.view.showError(err.message);
    }
  }
}

// Create an instance of the Controller class
new Controller();

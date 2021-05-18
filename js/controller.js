import { fetchAPICurrency, showExchangeRate, loadMore } from './model.js';
import { view } from './view.js';

const controllFetchedCurr = async () => {
  try {
    const data = await fetchAPICurrency();
    view.renderCurrency(data, showExchangeRate);
  } catch (err) {
    view.error(err.message);
  }
};
controllFetchedCurr();
const loadMoreCurr = async () => {
  const data = await loadMore();
  view.renderCurrency(data, showExchangeRate);
};

const init = () => {
  view.addEventHandler(loadMoreCurr);
};
init();

import { fetchAPICurrency, loadMore } from "./model.js";
import { view } from "./view.js";

const controllFetchedCurr = async () => {
  try {
    const data = await fetchAPICurrency();
    view.renderCurrency(data);
  } catch (err) {
    view.error(err.message);
  }
};

const loadMoreCurr = async (limit, start) => {
  const data = await loadMore(limit, start);
  view.renderCurrency(data);
};

const init = () => {
  controllFetchedCurr();
  view.addEventHandler(loadMoreCurr);
};
init();

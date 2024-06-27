import { TIMEOUT_ERROR, INITIAL_LIMIT } from "./config.js";

export class View {
  constructor() {
    this.table = document.querySelector(".table");
    this.loader1 = document.querySelector(".loader1");
    this.errorElement = document.querySelector(".Error");
    this.loader3 = document.querySelector(".loader3");
    this.loadMoreButton = document.querySelector(".button-2");
    this.limit = INITIAL_LIMIT;
    this.start = 1;
  }

  renderCurrency(data) {
    this.hideLoaders();
    this.table.style.opacity = 1;

    const fragment = document.createDocumentFragment();
    data.data.forEach(this.createTableRow.bind(this, fragment));

    this.table.appendChild(fragment);
    this.loadMoreButton.style.display = "inline-block";
  }

  createTableRow(fragment, data) {
    const tbody = document.createElement("tbody");
    tbody.innerHTML = `
      <tr>
        <td>${data.symbol}</td>
        <td>${data.name}</td>
        <td>${data.tags[0] || ""}</td>
        <td>
          <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${
            data.id
          }.png" alt="${data.name} logo" />
        </td>
        <td>$ ${(+data.quote.USD.price).toFixed(2)}</td>
      </tr>
    `;
    fragment.appendChild(tbody);
  }

  hideLoaders() {
    this.loader1.style.display = "none";
    this.loader3.style.display = "none";
  }

  showError(message = "Something went wrong") {
    this.errorElement.style.cssText = "opacity: 1; transform: translateY(0);";
    this.errorElement.textContent = message;
    setTimeout(() => {
      this.errorElement.style.cssText =
        "opacity: 0; transform: translateY(-300px);";
    }, TIMEOUT_ERROR * 1000);
  }

  addLoadMoreHandler(handler) {
    this.loadMoreButton.addEventListener("click", () => {
      this.loadMoreButton.style.display = "none";
      this.loader3.style.display = "inline-block";
      this.start += this.limit;
      this.limit *= 2;
      handler(this.limit, this.start);
    });
  }
}

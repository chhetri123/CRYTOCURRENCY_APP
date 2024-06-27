import { TIMEOUT_ERROR, INITAL_LIMIT } from "./config.js";
const table = document.querySelector(".table");
const loader1 = document.querySelector(".loader1");
const error = document.querySelector(".Error");
const loader3 = document.querySelector(".loader3");
const loadMore = document.querySelector(".button-2");

let limit = INITAL_LIMIT;
let start = 1;
export const view = {
  async renderCurrency(data) {
    try {
      loader3.style.display = "none";
      loader1.style.display = "none";
      table.style.opacity = 1;
      console.log(data);
      data.data.forEach((data) => {
        const tbody = document.createElement("tbody");
        tbody.innerHTML = `<tr>
            <td>${data.symbol}</td>
            <td>${data.name}</td>
            <td>${data.tags[0]}</td>
            <td>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${
                data.id
              }.png" alt="${data.name} logo"  />
            </td>
            <td>
            $ ${(+data.quote.USD.price).toFixed(2)}
          </td>
          </tr>`;

        table.appendChild(tbody);
        loadMore.style.display = "inline-block";
      });
    } catch (err) {
      this.error(err.message);
    }
  },
  error(message = "Something went wrong") {
    error.style.opacity = 1;
    error.style.transform = "translateY(0)";
    error.innerText = message;
    setTimeout(() => {
      error.style.opacity = 0;
      error.style.transform = "translateY(-300px)";
    }, TIMEOUT_ERROR * 1000);
  },

  addEventHandler(handler) {
    loadMore.addEventListener("click", async () => {
      loadMore.style.display = "none";
      loader3.style.display = "inline-block";
      start = limit + start;
      limit += limit;
      handler(limit, start);
    });
  },
};

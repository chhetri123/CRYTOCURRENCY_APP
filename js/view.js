import { TIMEOUT_ERROR } from './config.js';
const table = document.querySelector('.table');
const loader1 = document.querySelector('.loader1');
const error = document.querySelector('.Error');
const loader3 = document.querySelector('.loader3');
const loadMore = document.querySelector('.button-2');
export const view = {
  async renderCurrency(data, showExchangeRate) {
    try {
      loader3.style.display = 'none';
      loader1.style.display = 'none';
      table.style.opacity = 1;
      data.forEach((data) => {
        const tbody = document.createElement('tbody');
        tbody.innerHTML = `<tr>
            <td>${data.ticker}</td>
            <td>${data.name}</td>
            <td>${data.type}</td>
            <td>
              <img
                src="${data.logo}"
              />
            </td>
            <td class="showExchange">
            <div class="loader2"></div>
            <button>View</button></td>
          </tr>`;

        table.appendChild(tbody);
        loadMore.style.display = 'inline-block';
        tbody.addEventListener('click', async function (e) {
          const btn = e.target.closest('button');
          const button = btn.parentNode;
          if (!btn) return;
          btn.remove();

          button.querySelector('.loader2').style.display = 'inline-block';
          button.innerText = await showExchangeRate(data);
          button.querySelector('.loader2').style.display = 'none';
        });
      });
    } catch (err) {
      this.err(err.message);
    }
  },
  error(message = 'Something went wrong') {
    error.style.opacity = 1;
    error.style.transform = 'translateY(0)';
    error.innerText = message;
    setTimeout(() => {
      error.style.opacity = 0;
      error.style.transform = 'translateY(-300px)';
    }, TIMEOUT_ERROR * 1000);
  },
  addEventHandler(handler) {
    loadMore.addEventListener('click', async () => {
      loadMore.style.display = 'none';
      loader3.style.display = 'inline-block';
      handler();
    });
  },
};

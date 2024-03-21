const BASE_URL = `https://api.coinpaprika.com/v1`;
const OHLCV_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinList() {
  return await fetch(`https://api.upbit.com/v1/market/all`).then((response) =>
    response.json()
  );
}

export function fetchCoinDaysAgo(coinId: string) {
  const options = { method: "GET", headers: { accept: "application/json" } };

  return fetch(
    `https://api.upbit.com/v1/trades/ticks?market=${coinId}&count=1&daysAgo=7' `,
    options
  ).then((response) => response.json());
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(`${OHLCV_URL}?coinId=${coinId}`).then((response) =>
    response.json()
  );
}

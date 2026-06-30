const coinData = {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 56234.12,
    market_cap: 1100000000000,
    // price_change_percentage_24h: 2.3,
    ath: 73000,
    ath_date: "2024-03-14T00:00:00Z",
};

// const {name, current_price: preis, price_change_percentage_24h: aenderung24h = 0} = coinData;
// console.log(name, preis, aenderung24h);

const {name, ...rest} = coinData;
console.log(name,rest)
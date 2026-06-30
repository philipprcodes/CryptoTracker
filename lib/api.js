function buildUrl(coins, currencies) {
    const params = new URLSearchParams({
        ids: coins.join(","),
        vs_currencies: currencies.join(","),
        include_24hr_change: "true",
    });
    return `https://api.coingecko.com/api/v3/simple/price?${params}`;
}

function buildMarketURL(coins, currency) {
    const params = new URLSearchParams({
        vs_currency: currency,
        ids: coins.join(","),
        price_change_percentage: "24h",
    });
    return `https://api.coingecko.com/api/v3/coins/markets?${params}`;
}

export async function fetchPrices(coins, currencies) {
    const url = buildUrl(coins, currencies);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API antwortete mit Status ${response.status}`);
    }
    return response.json();
}

export async function fetchMarkets(coins, currency) {
    const url = buildMarketURL(coins, currency);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API antwortete mit Status ${response.status}`);
    }
    return response.json();
}

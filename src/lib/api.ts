import type {Coin, Currency} from "./types.js";
import {isCoin} from "./guards.js";

function buildUrl(coins: string[], currencies: Currency[]): string {
    const params = new URLSearchParams({
        ids: coins.join(","),
        vs_currencies: currencies.join(","),
        include_24hr_change: "true",
    });
    return `https://api.coingecko.com/api/v3/simple/price?${params}`;
}

function buildMarketURL(coins: string[], currency: Currency): string {
    const params = new URLSearchParams({
        vs_currency: currency,
        ids: coins.join(","),
        price_change_percentage: "24h",
    });
    return `https://api.coingecko.com/api/v3/coins/markets?${params}`;
}

export async function fetchPrices(coins: string[], currencies: Currency[]) : Promise<Coin[]> {
    const url = buildUrl(coins, currencies);
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API antwortete mit Status ${response.status}`);
    }
    return response.json();
}

export async function fetchMarkets(coins: string[], currency: Currency) : Promise<Coin[]> {
    const url = buildMarketURL(coins, currency);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API antwortete mit Status ${response.status}`);
    }
    const data: unknown = await response.json();
    // Narrowing: unknown -> unknown[] -> Coin[]
    if (!Array.isArray(data) || !data.every(isCoin)){
        throw new Error("Could not find coin");
    }
    return data;
}


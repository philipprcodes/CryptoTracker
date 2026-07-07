import type {ApiResult, Coin, Currency, HistoricalPrice} from "./types.js";
import {isCoin, isPriceArray} from "./guards.js";

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

export async function fetchMarkets(coins: string[], currency: Currency = "eur") : Promise<ApiResult<Coin[]>> {
    const url = buildMarketURL(coins, currency);
    const response = await fetch(url);
    if (!response.ok) {
        return { ok: false, error: `API antwortete mit Status ${response.status}` };
    }
    const data: unknown = await response.json();
    // Narrowing: unknown -> unknown[] -> Coin[]
    if (!Array.isArray(data) || !data.every(isCoin)){
        throw new Error("Could not find coin");
    }
    return { ok: true, data};
}

export async function fetchHistory(coinId: string, days: number): Promise<ApiResult<HistoricalPrice[]>> {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`;
    const response = await fetch(url);

    if (!response.ok) {
        return { ok: false, error: `API Fehler ${response.status} für ${coinId}` };
    }

    const data: unknown = await response.json();

    if (!isPriceArray(data)) {
        return { ok: false, error: "Ungültige API Antwort" };
    }

    const prices: HistoricalPrice[] = data.prices.map(
        ([timestamp, price]) => ({ timestamp, price })
    );

    return { ok: true, data: prices };
}



export async function fetchAllHistories( coinIds: string[], days: number): Promise<ApiResult<Record<string, HistoricalPrice[]>>>{

    const results = await Promise.all(
        coinIds.map(coinId => fetchHistory(coinId, days))
    );
    const histories: Record<string, HistoricalPrice[]> = {};

    for (const [index, result] of results.entries()) {
        const coinId = coinIds[index];
        if (!coinId) continue;

        if (!result.ok) {
            return { ok: false, error: result.error };
        }

        histories[coinId] = result.data;
    }

    return { ok: true, data: histories };
}
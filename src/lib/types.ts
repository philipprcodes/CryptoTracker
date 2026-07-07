export interface Coin {
    readonly id: string;
    readonly symbol: string;
    readonly name: string;
    readonly current_price: number;
    readonly price_change_percentage_24h: number;
}

export interface HistoricalPrice {
    timestamp: number;
    price: number;
}

export type ApiResult<T> =
    { ok: true; data: T}
    | { ok: false; error: string };

export type Currency = "eur" | "usd";

export type SortOrder = "asc" | "desc";

export type SupportedCoin = "bitcoin" | "ethereum" | "solana" | "cardano" | "dogecoin";
export interface Coin {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
}

export type Currency = "eur" | "usd";

export type SortOrder = "asc" | "desc";
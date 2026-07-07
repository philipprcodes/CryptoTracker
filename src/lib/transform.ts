import type {Coin, HistoricalPrice, SortOrder} from "./types";

export function sortByChange(coins: Coin[], order: SortOrder = "desc") : Coin[] {
    return [...coins].sort((a, b) =>
        order === "desc"
            ? b.price_change_percentage_24h - a.price_change_percentage_24h
            : a.price_change_percentage_24h - b.price_change_percentage_24h
    );
}

export function averagePrice(history: HistoricalPrice[]): number {
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, entry) => acc + entry.price, 0);
    return sum / history.length;
}

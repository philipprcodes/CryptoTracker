import type {Coin, SortOrder} from "./types";

export function sortByChange(coins: Coin[], order: SortOrder = "desc") : Coin[] {
    return [...coins].sort((a, b) =>
        order === "desc"
            ? b.price_change_percentage_24h - a.price_change_percentage_24h
            : a.price_change_percentage_24h - b.price_change_percentage_24h
    );
}
export function sortByChange(coins, order = "desc") {
    return [...coins].sort((a, b) =>
        order === "desc"
            ? b.price_change_percentage_24h - a.price_change_percentage_24h
            : a.price_change_percentage_24h - b.price_change_percentage_24h
    );
}
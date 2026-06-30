export function formatCurrency(amount, currency) {
    const locales = { eur: "de-DE", usd: "en-US" };
    return new Intl.NumberFormat(locales[currency] || "en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(amount);
}

export function formatPercentage(value) {
    const percentageSign = value > 0 ? "+" : "";
    value = value.toFixed(2);
    const text = `${percentageSign}${value}%`;

    const green = "\x1b[32m";
    const red = "\x1b[31m";
    const reset = "\x1b[0m";
    const colour = value > 0 ? green : red;

    return `${colour}${text}${reset}`;
}

export function formatToUpercase(coin) {
    const formattedCoin = coin.charAt(0).toUpperCase() + coin.slice(1);
    return formattedCoin;
}
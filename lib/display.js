import {formatCurrency, formatPercentage, formatToUpercase} from "./format.js";

export function printCoin(coin) {
    const formattedCoin = coin.name;
    const formattedPrice = formatCurrency(coin.current_price, "eur");
    const formattedPercentageChange = formatPercentage(coin.price_change_percentage_24h);
    console.log(`${formattedCoin.padEnd(9)}: ${formattedPrice.padEnd(12)} ${formattedPercentageChange.padEnd(9)}`);
}
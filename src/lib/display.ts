import {formatCurrency, formatPercentage} from "./format";
import type {Coin, Currency} from "./types";

export function printCoin(coin: Coin, curr : Currency): void {
    const formattedCoin = coin.name;
    const formattedPrice = formatCurrency(coin.current_price, curr);
    const formattedPercentageChange = formatPercentage(coin.price_change_percentage_24h);
    console.log(`${formattedCoin.padEnd(9)}: ${formattedPrice.padStart(12)}   ${formattedPercentageChange.padStart(12)}`);
}
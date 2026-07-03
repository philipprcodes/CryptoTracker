import {formatCurrency, formatPercentage} from "./format";
import type {Coin, Currency} from "./types";
import type {Portfolio} from "../domain/portfolio";

export function printCoin(coin: Coin, curr : Currency): void {
    const formattedCoin = coin.name;
    const formattedPrice = formatCurrency(coin.current_price, curr);
    const formattedPercentageChange = formatPercentage(coin.price_change_percentage_24h);
    console.log(`${formattedCoin.padEnd(9)}: ${formattedPrice.padStart(12)}   ${formattedPercentageChange.padStart(12)}`);
}

export function printCoinInPortfolio(coin: Coin, amount: number, curr : Currency = "eur"): void {
    const formattedCoin = coin.name;
    const formattedAmount : string = amount.toString();
    const formattedPrice = formatCurrency(coin.current_price*amount, curr);
    console.log(`${formattedCoin.padEnd(9)}: ${formattedAmount.padStart(5)} Stück -> ${formattedPrice.padStart(12)}`);
}

export function printPortfolio(markets: Coin[], portfolio: Portfolio, curr : Currency = "eur"): void {
    portfolio.getHoldings().forEach((amount, coinId) => {
        const coin = markets.find(c => c.id === coinId);
        if (!coin) return;
    const formattedCoin = coin.name;
    const formattedAmount : string = amount.toString();
    const formattedPrice = formatCurrency(coin.current_price*amount, curr);
    console.log(`${formattedCoin.padEnd(9)}: ${formattedAmount.padStart(5)} Stück -> ${formattedPrice.padStart(12)}`);
    });
    console.log("====================================")
    console.log("Portfolio Gesamtwert: " + formatCurrency(portfolio.getValue(markets)).padStart(16));
}
import {fetchAllHistories, fetchMarkets, fetchPrices} from "./lib/api";
import {sortByChange} from "./lib/transform";
import {printCoin, printCoinAverage, printCoinInPortfolio, printPortfolio} from "./lib/display";
import type {ApiResult, Coin, Currency, SupportedCoin} from "./lib/types";
import {isApiError} from "./lib/guards";
import {emptyPortfolio, buy, sell, getValue, type Portfolio} from "./domain/portfolio";
import {formatCurrency} from "./lib/format";

const COINS : SupportedCoin[] = ["bitcoin", "ethereum", "solana", "cardano", "dogecoin"];
const curr : Currency = "eur";

async function main(): Promise<void> {
    const result = await fetchMarkets(COINS, curr);

    if (isApiError(result)) {
        console.error("Fehler: " + result.error);
        process.exit(1);
        return;
    }
    const markets: Coin[] = result.data;

    console.log("================================")
    console.log("Unsortiert:");
    markets.forEach(coin => printCoin(coin, curr));

    console.log("================================")
    const sortedByChange: Coin[] = sortByChange(markets, "desc");
    console.log("Sortiert nach 24h Aenderung:");
    sortedByChange.forEach(coin => printCoin(coin, curr));

    const topGainer = sortedByChange[0];
    const topLoser = sortedByChange[sortedByChange.length - 1];
    if (topGainer && topLoser) {
        console.log("================================")
        console.log("Top Gainer:");
        printCoin(topGainer, curr);
        console.log("Top Loser:");
        printCoin(topLoser, curr);
    }

    console.log("================================")
    console.log("Portfolio:");
    const history: Portfolio[] = [];
    let portfolio = emptyPortfolio;
    history.push(portfolio);
    portfolio = buy(portfolio, "bitcoin", 0.5);
    history.push(portfolio);
    portfolio = buy(portfolio,"ethereum", 2);
    history.push(portfolio);
    portfolio = buy(portfolio,"solana", 10);
    history.push(portfolio);
    portfolio = buy(portfolio,"cardano", 500);
    history.push(portfolio);
    portfolio = buy(portfolio,"dogecoin", 1000);
    history.push(portfolio);
    portfolio = sell(portfolio,"dogecoin", 700);
    history.push(portfolio);
    portfolio = sell(portfolio,"cardano", 200);
    history.push(portfolio);


    printPortfolio(markets,portfolio);
    const historiesResult = await fetchAllHistories(COINS, 7);
    if (!isApiError(historiesResult)) {
        console.log("================================");
        console.log("Durchschnittspreis letzte 7 Tage:");

        Object.entries(historiesResult.data).forEach(([coinId, history]) => {
            const coin = markets.find(c => c.id === coinId);
            if (!coin) return;
            printCoinAverage(coin, history, curr);
        });
    }
}
main();
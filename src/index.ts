import {fetchMarkets, fetchPrices} from "./lib/api";
import {sortByChange} from "./lib/transform";
import {printCoin, printCoinInPortfolio, printPortfolio} from "./lib/display";
import type {ApiResult, Coin, Currency, SupportedCoin} from "./lib/types";
import {isApiError} from "./lib/guards";
import {Portfolio} from "./domain/portfolio";
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
    const portfolio = new Portfolio();
    portfolio.buy("bitcoin", 0.5);
    portfolio.buy("ethereum", 2);
    portfolio.buy("solana", 10);
    portfolio.buy("cardano", 500);
    portfolio.buy("dogecoin", 1000);

    printPortfolio(markets,portfolio);
}
main();
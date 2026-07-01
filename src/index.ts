import {fetchMarkets, fetchPrices} from "./lib/api";
import {sortByChange} from "./lib/transform";
import {printCoin} from "./lib/display";
import type {Coin, Currency} from "./lib/types";

const COINS : string[] = ["bitcoin", "ethereum", "solana","ripple","dogecoin"];
const curr : Currency = "eur";

async function main(){
    try {
        const markets = await fetchMarkets(COINS,curr);
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
            printCoin(topGainer,curr);
            console.log("Top Loser:");
            printCoin(topLoser,curr);
        }

    }catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Fehler beim Abrufen der Preise:", error.message);
            process.exit(1);
        }
    }
}


main();
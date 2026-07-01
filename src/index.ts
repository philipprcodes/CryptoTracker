import {fetchMarkets, fetchPrices} from "./lib/api";
import {sortByChange} from "./lib/transform";
import {printCoin} from "./lib/display";
import type {Coin} from "./lib/types";

const COINS = ["bitcoin", "ethereum", "solana","ripple","dogecoin"];

async function main(){
    try {
        const markets = await fetchMarkets(COINS,"eur");
        console.log("================================")
        console.log("Unsortiert:");
        markets.forEach(printCoin);
        console.log("================================")
        const sortedByChange: Coin[] = sortByChange(markets, "desc");
        console.log("Sortiert nach 24h Aenderung:");
        sortedByChange.forEach(printCoin);

        const topGainer = sortedByChange[0];
        const topLoser = sortedByChange[sortedByChange.length - 1];
        if (topGainer && topLoser) {
            console.log("================================")
            console.log("Top Gainer:");
            printCoin(topGainer);
            console.log("Top Loser:");
            printCoin(topLoser);
        }

    }catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Fehler beim Abrufen der Preise:", error.message);
            process.exit(1);
        }
    }
}


main();
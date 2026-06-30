import {fetchMarkets, fetchPrices} from "./lib/api.js";
import {sortByChange} from "./lib/transform.js";
import {printCoin} from "./lib/display.js";

const COINS = ["bitcoin", "ethereum", "solana","ripple","dogecoin"];
const CURRENCIES = ["eur", "usd"];


async function main(){
    try {
        const markets = await fetchMarkets(COINS,"eur");
        console.log("==============================")
        console.log("Unsortiert:");
        markets.forEach(printCoin);
        console.log("==============================")
        const sortedByChange = sortByChange(markets, "desc");
        console.log("Sortiert nach 24h Aenderung:");
        sortedByChange.forEach(printCoin);

        const topGainer = sortedByChange[0];
        const topLoser = sortedByChange[sortedByChange.length - 1];
        console.log("==============================")
        console.log("Top Gainer:");
        printCoin(topGainer);
        console.log("Top Loser:");
        printCoin(topLoser);

    }catch(error){
        console.error("Fehler beim Abrufen der Preise:", error.message);
        process.exit(1);
        }
    }


main();
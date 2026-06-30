import {fetchMarkets, fetchPrices} from "./lib/api.js";
import {sortByChange} from "./lib/transform.js";
import {printCoin} from "./lib/display.js";

const COINS = ["bitcoin", "ethereum", "solana"];
const CURRENCIES = ["eur", "usd"];


async function main(){
    try {
        const markets = await fetchMarkets(COINS,"eur");
        console.log("Unsortiert:\n");
        markets.forEach(printCoin);

        const sortedByChange = sortByChange(markets, "desc");
        console.log("\nSortiert nach 24h Aenderung:\n");
        sortedByChange.forEach(printCoin);

    }catch(error){
        console.error("Fehler beim Abrufen der Preise:", error.message);
        process.exit(1);
        }
    }


main();
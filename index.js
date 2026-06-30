const URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur,usd";

async function main() {
    try{
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Fehler: " + response.statusText);
        }

        const data = await response.json();

        Object.entries(data).forEach(([name, prices]) => {
            const priceEUR = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(prices.eur);
            console.log(name + ": " + priceEUR);

            const priceUSD = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "USD",
            }).format(prices.usd);
            console.log(name + ": " + priceUSD);
        });

        // const priceEUR = new Intl.NumberFormat("de-DE", {
        //     style: "currency",
        //     currency: "EUR",
        // }).format(data.bitcoin.eur);
        // const priceUSD = new Intl.NumberFormat("de-DE", {
        //     style: "currency",
        //     currency: "USD",
        // }).format(data.bitcoin.usd)
        //
        // console.log("Bitcoin In EUR: " + priceEUR);
        // console.log("Bitcoin in USD: " + priceUSD);
    } catch (error) {
        console.log("Fehler: " + error.message);}
}

main();
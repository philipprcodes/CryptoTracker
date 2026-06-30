const coins =[
    { name: "Bitcoin", price: 56234.12, change24h: 2.3},
    { name: "Ethereum", price: 3120.50, change24h: -1.1},
    { name: "Solana", price: 145.30, change24h: 5.6},
    { name: "Cardano", price: 0.41, change24h: -0.5},
    { name: "Dogecoin", price: 0.12, change24h: 8.2},
]

// const names = coins.map(coin  => coin.name);
// console.log(names);
//
// const positives = coins.filter(coin => coin.change24h > 0);
// console.log(positives);
//
// const addUSD = coins.map(coin => ({...coin, priceUSD: (coin.price*1.08).toFixed(2)}));
// console.log(addUSD);
//
// const sum = coins.reduce((sum, coin) => sum + coin.price, 0);
// console.log(sum);
//
// const max = coins.reduce((max, coin) => coin.price > max.price ? coin : max );
// console.log(max);

const sorted = [...coins].sort((a, b) => b.change24h - a.change24h)
    .map(coin => coin.name+": "+coin.change24h+"%")
console.log(sorted);
console.log(coins);
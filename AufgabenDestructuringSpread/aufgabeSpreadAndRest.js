const defaults = { currency: "eur", language: "de", maxRetries:3};
const userConfig = { language: "en", maxRetries: 5 };

function merge(defaults, userConfig) {
    const newConfig = {...defaults, ...userConfig};
    return newConfig;
}

const config = merge(defaults, userConfig);
console.log(config);

function average(...zahlen){
    let sum = 0;
    for(let i=0; i<zahlen.length; i++){
        sum += zahlen[i];
    }
    return sum/zahlen.length;
}

const avg = average();
console.log(avg);
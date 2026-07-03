import type {Coin} from "../lib/types";

export class Portfolio{
    #holdings = new Map<string, number>();

    buy(coinID: string, amount: number): void{
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        const currentAmount = this.#holdings.get(coinID) ?? 0;
        this.#holdings.set (coinID, currentAmount + amount);
    }

    sell(coinID: string, amount: number): void{
        if (amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        const currentAmount = this.#holdings.get(coinID) ?? 0;
        if (amount > currentAmount) {
            throw new Error("Not enough " + coinID + " in current Portfolio");
        }
        this.#holdings.set (coinID, currentAmount - amount);
    }

    getHoldings(): ReadonlyMap<string, number>{
        return this.#holdings;
    }

    getAmount(coinID: string): number{
        return this.#holdings.get(coinID) ?? 0;
    }

    getValue(markets: Coin[]): number{
        let total = 0;
        this.#holdings.forEach((amount, coinId) => {
            const coin = markets.find(c => c.id === coinId);
            if (!coin) return;
            total += coin.current_price * amount;
        });
        return total;
    }
}
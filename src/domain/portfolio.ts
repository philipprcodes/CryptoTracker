import type {Coin} from "../lib/types";

export type Portfolio = Readonly<{
    holdings: Readonly<Record<string, number>>;
    }>;

export const emptyPortfolio: Portfolio = { holdings: {} };



export const buy = (portfolio: Portfolio, coinId: string, amount: number): Portfolio =>
{
    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }
    const currentAmount = portfolio.holdings[coinId] ?? 0;
    return {
        holdings: {...portfolio.holdings, [coinId]: currentAmount + amount},
    };
};




export const sell = (portfolio: Portfolio, coinId: string, amount: number): Portfolio =>
{
    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }
    const currentAmount = portfolio.holdings[coinId] ?? 0;
    if (amount > currentAmount) {
        throw new Error("Not enough " + coinId + " in current Portfolio");
    }
    return {
        holdings: {...portfolio.holdings, [coinId]: currentAmount - amount},
    };
};

export const getHoldings = (portfolio: Portfolio): Readonly<Record<string, number>> => {
    return portfolio.holdings;
}

export const getAmount = (portfolio: Portfolio, coinID: string): number => {
        return portfolio.holdings[coinID] ?? 0;
    }

export const getValue = (portfolio: Portfolio, markets: Coin[]): number => {
      return Object.entries(portfolio.holdings).reduce((total, [coinId, amount]) =>{
          const coin = markets.find(c=> c.id ===coinId);
          if (!coin) return total;
          return total + coin.current_price * amount;
      }, 0);
    };


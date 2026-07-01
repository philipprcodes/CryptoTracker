import type {Coin} from "./types.js";

export function isCoin(value: unknown): value is Coin {
    const v = value as any;
    return (
        typeof v === "object" &&
        v !== null &&
        // "id" in value &&
        // "symbol" in value &&
        // "name" in value &&
        // "current_price" in value &&
        // "price_change_percentage_24h" in value &&
        typeof v.id === "string" &&
        typeof v.symbol === "string" &&
        typeof v.name === "string" &&
        typeof v.current_price === "number" &&
        typeof v.price_change_percentage_24h === "number"
    );
}
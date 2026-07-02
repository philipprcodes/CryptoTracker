import type {Coin, ApiResult} from "./types.js";

export function isCoin(value: unknown): value is Coin {
    const v = value as Record<string, unknown>;
    return (
        typeof v === "object" &&
        v !== null &&
        typeof v.id === "string" &&
        typeof v.symbol === "string" &&
        typeof v.name === "string" &&
        typeof v.current_price === "number" &&
        typeof v.price_change_percentage_24h === "number"
    );
}

export function isApiError<T>(result: ApiResult<T>): result is { ok: false; error: string}
{return result.ok === false;
}
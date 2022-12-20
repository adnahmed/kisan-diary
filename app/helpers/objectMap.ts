export interface Dictionary<T> {
    [key: string]: T;
}

export default function objectMap<TValue, TResult>(
    obj: Dictionary<TValue>,
    valSelector: (val: TValue, obj: Dictionary<TValue>) => TResult,
    keySelector?: (key: string, obj: Dictionary<TValue>) => string,
    ctx?: Dictionary<TValue>
) {
    const ret = {} as Dictionary<TResult>;
    for (const key of Object.keys(obj)) {
        const retKey = keySelector
            ? keySelector.call(ctx || null, key, obj)
            : key;
        const retVal = valSelector.call(ctx || null, obj[key], obj);
        ret[retKey] = retVal;
    }
    return ret;
}
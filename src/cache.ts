import { RequestHandler } from "express";

type CacheEntry = {
    value: any,
    expiry: number
}

let cache = new Map<string, CacheEntry>();

export let cacheMiddleware: RequestHandler = (req, res, next) => {
    let cacheEntry = cache.get(req.originalUrl);
    if (!cacheEntry || cacheEntry.expiry < Date.now()) {
        let originalSend = res.send;
        res.send = function (body) {
            let resp = originalSend.call(this, body);
            cache.set(req.originalUrl, {expiry: Date.now() + 1000 * 100, value: body});
            return resp;
        };
    }
    else {
        res.send(cacheEntry.value);
        return;
    }
    next();
};

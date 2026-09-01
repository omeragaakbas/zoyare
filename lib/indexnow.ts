/**
 * IndexNow — push new and changed URLs to Bing, Yandex and Seznam instead of waiting
 * for a crawl. Google does not participate, but the Bing index is what ChatGPT and
 * Copilot search against, so it is worth the two files it costs.
 *
 * The key is public by design: it is verified by serving it at
 * https://zoyare.com/<key>.txt, which is what app/<key>.txt/route.ts does.
 */
export const INDEXNOW_KEY = "6eceec6bf9acdbabe662c81eb229d0f5";

export const INDEXNOW_HOST = "zoyare.com";

export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

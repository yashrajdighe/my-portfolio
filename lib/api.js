/**
 * Shared API utilities for fetching data from the portfolio API.
 *
 * Centralises the base URL, JSON fetcher (with build-time request
 * deduplication), and the columnar-to-object converter so that
 * `lib/resume.js` and `lib/blog.js` no longer duplicate this logic.
 */

export const API_BASE = "https://api.yashrajdighe.in";

// ---------------------------------------------------------------------------
// Build-time request cache
// ---------------------------------------------------------------------------
// During a static export build every page is rendered in the same process,
// but each render is independent.  A simple in-memory `Map<string, Promise>`
// ensures that the *same* URL is never fetched twice during the entire build,
// regardless of how many pages reference it.
// ---------------------------------------------------------------------------
const inflightRequests = new Map();

/**
 * Fetch JSON from the portfolio API.
 *
 * @param {string} url - Full URL to fetch.
 * @param {{ throwOnError?: boolean }} options
 *   - `throwOnError` (default `true`): throw on non-2xx responses.
 *     Set to `false` to return `null` instead (used by blog detail fetches).
 * @returns {Promise<any>}
 */
export const fetchJson = async (url, { throwOnError = true } = {}) => {
  // Return a cached in-flight / resolved promise when available.
  if (inflightRequests.has(url)) {
    return inflightRequests.get(url);
  }

  const promise = fetch(url).then((response) => {
    if (!response.ok) {
      if (throwOnError) {
        throw new Error(`Failed to fetch: ${url} (${response.status})`);
      }
      return null;
    }
    return response.json();
  });

  inflightRequests.set(url, promise);
  return promise;
};

/**
 * Convert a columnar JSON structure (`{ columns, data }`) into an array of
 * plain objects keyed by column name.  If the input is already an array
 * (legacy format) it is returned as-is so existing endpoints keep working.
 */
export const fromColumnar = (input) => {
  if (Array.isArray(input)) return input;
  if (input && Array.isArray(input.columns) && Array.isArray(input.data)) {
    return input.data.map((row) =>
      Object.fromEntries(input.columns.map((col, i) => [col, row[i]])),
    );
  }
  return input;
};

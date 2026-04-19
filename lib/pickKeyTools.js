const PRIORITY_KEYS = [
  "Cloud",
  "Platform",
  "IaC",
  "Containers",
  "CI/CD",
  "Observability",
];

/**
 * Pick tool names from stack: prefer named categories, then fill from stack order.
 * @param {Record<string, string[]>} stack
 * @param {number} max
 */
export function pickKeyTools(stack, max = 4) {
  const entries = Object.entries(stack ?? {});
  const tools = [];

  for (const key of PRIORITY_KEYS) {
    const match = entries.find(([k]) => k.toLowerCase() === key.toLowerCase());
    if (match?.[1]?.length) {
      const first = match[1][0];
      if (first && !tools.includes(first)) tools.push(first);
    }
    if (tools.length >= max) return tools.slice(0, max);
  }

  for (const [, list] of entries) {
    if (!Array.isArray(list)) continue;
    for (const t of list) {
      if (t && !tools.includes(t)) tools.push(t);
      if (tools.length >= max) return tools.slice(0, max);
    }
  }

  return tools.slice(0, max);
}

/**
 * Flatten stack values in stable order (category key order), cap at max.
 */
export function flattenStackTools(stack, max = 8) {
  const out = [];
  for (const [, list] of Object.entries(stack ?? {})) {
    if (!Array.isArray(list)) continue;
    for (const t of list) {
      if (t && !out.includes(t)) out.push(t);
      if (out.length >= max) return out;
    }
  }
  return out;
}

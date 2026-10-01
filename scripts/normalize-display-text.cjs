// Transport-escaped greater-than symbols are presentation text, not source data.
// Return a new projection so original source bytes and observations stay intact.
function normalizeDisplayText(value) {
  if (typeof value === 'string') return value.replace(/&amp;gt;|&gt;/g, '>');
  if (Array.isArray(value)) return value.map(normalizeDisplayText);
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeDisplayText(item)]));
  return value;
}
module.exports = normalizeDisplayText;

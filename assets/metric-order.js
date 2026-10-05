(() => {
  "use strict";
  const measured = (n) => typeof n === "number" && Number.isFinite(n);
  const known = (direction) =>
    direction === "higher_is_better" || direction === "lower_is_better";
  // Work on copies. Ties and unmeasured values retain their original source order.
  function order(
    rows,
    value,
    direction,
    { eligible = () => true, group } = {},
  ) {
    if (!known(direction)) return [...rows];
    if (group) {
      const groups = new Map();
      for (const row of rows) {
        const key = group(row);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(row);
      }
      return [...groups.values()].flatMap((members) =>
        order(members, value, direction, { eligible }),
      );
    }
    return rows
      .map((row, index) => {
        const n = value(row);
        return { row, index, n, hasValue: measured(n) && eligible(row) };
      })
      .sort((a, b) => {
        if (a.hasValue !== b.hasValue) return a.hasValue ? -1 : 1;
        if (!a.hasValue || a.n === b.n) return a.index - b.index;
        const ascending = a.n < b.n ? -1 : 1;
        return direction === "lower_is_better" ? ascending : -ascending;
      })
      .map(({ row }) => row);
  }
  function description(direction) {
    return known(direction)
      ? "Best to worst by the selected measurement (" +
          (direction === "lower_is_better" ? "lower" : "higher") +
          " is better); missing measurements follow reported values. Ties keep source order."
      : "Native source order retained; the preferred direction is not established.";
  }
  window.LAB_METRIC_ORDER = Object.freeze({
    measured,
    known,
    order,
    description,
  });
})();

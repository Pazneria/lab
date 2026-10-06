// Host metadata groups requested models; it does not assert serving-backend identity.
export const comparisonKey = pair => pair.map(entry => entry.id).sort().join('::');

export function randomComparison(prompts, entries, previousKey) {
  const choose = options => options[Math.floor(Math.random() * options.length)];
  const options = prompts.map(prompt => {
    const models = new Map();
    for (const entry of entries) {
      if (entry.promptId !== prompt.id || !entry.comparisonModel ||
          (entry.availability !== undefined && entry.availability !== 'ready')) continue;
      if (!models.has(entry.comparisonModel)) models.set(entry.comparisonModel, []);
      models.get(entry.comparisonModel).push(entry);
    }
    const groups = [...models.values()], modelPairs = [];
    for (let a = 0; a < groups.length; a++) for (let b = a + 1; b < groups.length; b++) {
      modelPairs.push(groups[a].flatMap(left => groups[b].map(right => [left, right])));
    }
    return {promptId: prompt.id, modelPairs};
  }).filter(prompt => prompt.modelPairs.length);

  // Exclude the previous unordered entry pair globally when any alternative exists.
  const alternatives = options.map(prompt => ({
    promptId: prompt.promptId,
    modelPairs: prompt.modelPairs.map(pairs => pairs.filter(pair => comparisonKey(pair) !== previousKey)).filter(pairs => pairs.length)
  })).filter(prompt => prompt.modelPairs.length);
  const eligible = alternatives.length ? alternatives : options;
  if (!eligible.length) return null;

  // Prompt first, then two distinct models, then their entries and left/right order.
  const prompt = choose(eligible), pair = choose(choose(prompt.modelPairs));
  return {promptId: prompt.promptId, entries: Math.random() < .5 ? pair : [pair[1], pair[0]]};
}

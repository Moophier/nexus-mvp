export function extractFragments(body: string, maxFragments = 3): string[] {
  if (!body) return [];

  // 1. Normalize and split into sentences
  const sentences = body
    .replace(/\\r\\n/g, '\\n')
    .split(/[。！？\n]+/)
    .map(s => s.trim())
    .filter(s => s.length >= 8 && s.length <= 100);

  // 2. Define high-value keywords
  const keywords = /值得|学到|关键|核心|重要|领悟|原来|建议|发现|启发/;

  // 3. Score sentences
  const scored = sentences.map(s => {
    let score = 1;
    
    // Keyword match
    if (keywords.test(s)) score += 2;
    
    // Optimal length (20-60 chars)
    if (s.length >= 20 && s.length <= 60) score += 1.5;
    
    // Start with a key indicator
    if (/我认为|我发现|重点是/.test(s)) score += 1;

    return { text: s, score };
  });

  // 4. Sort and slice
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxFragments)
    .map(s => s.text);
}

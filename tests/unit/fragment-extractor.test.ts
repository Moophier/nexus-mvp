import { describe, it, expect } from 'vitest';
import { extractFragments } from '../../src/lib/fragment-extractor';

describe('fragment-extractor', () => {
  it('should extract fragments based on keywords and length', () => {
    const body = '这是一个测试。这篇文章非常值得推荐！特别是关于 Serverless 的部分，让我领悟到了很多关键点。我觉得学习很重要。最后一段话太长了所以应该被过滤掉虽然它包含很多内容但超过了一百个字符所以它不应该被提取出来作为碎片。';
    const fragments = extractFragments(body);
    
    expect(fragments).toContain('这篇文章非常值得推荐');
    expect(fragments).toContain('特别是关于 Serverless 的部分，让我领悟到了很多关键点');
    expect(fragments.length).toBeLessThanOrEqual(3);
  });

  it('should return empty array for empty input', () => {
    expect(extractFragments('')).toEqual([]);
  });

  it('should filter out sentences that are too short or too long', () => {
    const body = '太短。' + 'a'.repeat(110) + '。';
    expect(extractFragments(body)).toEqual([]);
  });
});

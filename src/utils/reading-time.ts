/**
 * Estimate reading time for a block of text.
 * Uses 200 wpm for English and mixed Thai/English content.
 * Thai script characters are counted as words at a slightly lower rate.
 */
export function getReadingTime(text: string): number {
  // Strip markdown syntax for a cleaner word count
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')   // fenced code blocks
    .replace(/`[^`]+`/g, '')          // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')  // images
    .replace(/\[.*?\]\(.*?\)/g, '')   // links
    .replace(/#{1,6}\s/g, '')         // headings
    .replace(/[*_~>]/g, '')           // emphasis, blockquotes
    .trim();

  // Count Thai character clusters as ~0.5 "words" each
  const thaiClusters = (cleaned.match(/[\u0E00-\u0E7F]+/g) || []).length;
  const latinWords = (cleaned.replace(/[\u0E00-\u0E7F]+/g, '').match(/\S+/g) || []).length;

  const effectiveWords = latinWords + thaiClusters * 0.5;
  const minutes = Math.ceil(effectiveWords / 200);
  return Math.max(1, minutes);
}

export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}

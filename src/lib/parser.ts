
export function parseBlogContent(htmlString: string): string {
    let cleaned = htmlString.replace(/<img[^>]*>/gi, '');
    const textOnly = cleaned.replace(/<[^>]*>/g, ' ');

    const normalized = textOnly
      .replace(/\s+/g, ' ')
      .trim();
  
    const words = normalized.split(' ').filter(word => word.length > 0);
    return words.join(' ');
}

export function estimateReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
  
    if (wordCount === 0) return '0s';
  
    const wordsPerMinute = 120;
    const totalSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);
  
    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    } else {
      const minutes = Math.ceil(totalSeconds / 60);
      return `${minutes}m`;
    }
  }

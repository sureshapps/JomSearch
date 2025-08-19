import type { SearchResult } from '@/components/SearchResults';

const GOOGLE_API_KEY = 'AIzaSyB7fvvRL3wcFOsWIqV-b0C1iMYsJsQBKSA';
const SEARCH_ENGINE_ID = 'f381ff32950a84cbe';

export async function searchGoogle(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Search API error');
    }

    if (!data.items || data.items.length === 0) {
      return [];
    }

    return data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
    }));
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}
import { SearchResultItem } from './SearchResultItem';
import { Loader2 } from 'lucide-react';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error?: string;
  searchQuery?: string;
}

export function SearchResults({ results, isLoading, error, searchQuery }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Searching the web...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-destructive font-medium mb-2">Search Error</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0 && searchQuery) {
    return (
      <div className="text-center py-16">
        <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-lg font-medium mb-2">No results found</p>
          <p className="text-muted-foreground">
            Try different keywords or check your spelling
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {searchQuery && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            About {results.length} results for "{searchQuery}"
          </p>
        </div>
      )}
      <div className="space-y-6">
        {results.map((result, index) => (
          <SearchResultItem key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
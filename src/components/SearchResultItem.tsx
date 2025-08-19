import { ExternalLink } from 'lucide-react';
import type { SearchResult } from './SearchResults';

interface SearchResultItemProps {
  result: SearchResult;
}

export function SearchResultItem({ result }: SearchResultItemProps) {
  return (
    <div className="group bg-search-card hover:bg-search-card-hover border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-search-hover hover:scale-[1.01] cursor-pointer">
      <a
        href={result.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-accent font-medium truncate">
                {result.displayLink}
              </p>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            
            <h3 className="text-xl font-semibold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-200">
              {result.title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {result.snippet}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
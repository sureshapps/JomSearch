import { useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { SearchResults, type SearchResult } from '@/components/SearchResults';
import { searchGoogle } from '@/services/searchService';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/search-hero.jpg';

const Index = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError('');
    setSearchQuery(query);
    
    try {
      const searchResults = await searchGoogle(query);
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast({
          title: "No results found",
          description: "Try different keywords or check your spelling",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search';
      setError(errorMessage);
      setResults([]);
      toast({
        title: "Search failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasSearched = searchQuery || results.length > 0 || error;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-search-gradient">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
          <h1 className="text-6xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
  JomSearch
</h1>
            <p className="text-l md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
           Search Beyond Limits
            </p>
          </div>
          
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="container mx-auto px-4 py-12">
          <SearchResults
            results={results}
            isLoading={isLoading}
            error={error}
            searchQuery={searchQuery}
          />
        </div>
      )}

      {/* Welcome Section - only show when no search has been made */}
      {!hasSearched && (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-card rounded-xl p-6 shadow-search hover:shadow-search-hover transition-all duration-300 hover:scale-105">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">Get instant search results with our optimized search engine</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-search hover:shadow-search-hover transition-all duration-300 hover:scale-105">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Accurate Results</h3>
                <p className="text-muted-foreground">Find exactly what you're looking for with relevant results</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-search hover:shadow-search-hover transition-all duration-300 hover:scale-105">
                <div className="bg-secondary/60 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Clean Interface</h3>
                <p className="text-muted-foreground">Enjoy a beautiful, distraction-free search experience</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

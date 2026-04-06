import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { CategoryTabs } from "./components/CategoryTabs";
import { HeroArticle } from "./components/HeroArticle";
import { NewsCard } from "./components/NewsCard";
import { useNews } from "./hooks/useNews";
import { RefreshCw } from "lucide-react";
import type { Category } from "./types/news";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState<Category>("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input by 500ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { articles, loading, error, lastUpdated, refresh } = useNews(
    category,
    debouncedQuery
  );

  const heroArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {debouncedQuery ? `Results for "${debouncedQuery}"` : "Today's News"}
              </h1>
              {lastUpdated && (
                <p className="text-xs text-zinc-400 mt-1">
                  Updated {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <button
                onClick={refresh}
                className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="Refresh"
              >
                <RefreshCw size={16} className="text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Category Tabs — hide when searching */}
          {!debouncedQuery && (
            <CategoryTabs active={category} onChange={setCategory} />
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-700 rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-24">
              <p className="text-zinc-500 dark:text-zinc-400">{error}</p>
              <button
                onClick={refresh}
                className="mt-4 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-medium hover:opacity-80 transition"
              >
                Try again
              </button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && articles.length > 0 && (
            <>
              {/* Hero */}
              {heroArticle && <HeroArticle article={heroArticle} />}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {gridArticles.map((article, i) => (
                  <NewsCard key={i} article={article} />
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-24">
              <p className="text-zinc-400">No articles found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
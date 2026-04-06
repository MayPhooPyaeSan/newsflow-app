import { useState, useEffect, useCallback } from "react";
import { fetchTopHeadlines, searchNews } from "../services/newsApi";
import type { Article, Category } from "../types/news";

export const useNews = (category: Category, searchQuery: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

 const loadNews = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const data = searchQuery
      ? await searchNews(searchQuery)
      : await fetchTopHeadlines(category);
    const clean = data.articles.filter(
      (a) => a.title !== "[Removed]" && a.urlToImage
    );
    setArticles(clean);
    setLastUpdated(new Date());
  } catch (err) {
    console.error(err);
    setError("Failed to load news. Please try again.");
  } finally {
    setLoading(false);
  }
}, [category, searchQuery]);

  // Initial load + auto-refresh every 5 mins
  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadNews]);

  return { articles, loading, error, lastUpdated, refresh: loadNews };
};
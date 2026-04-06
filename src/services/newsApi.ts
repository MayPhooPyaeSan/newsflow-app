import axios from "axios";
import type { Category, NewsResponse } from "../types/news";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const fetchWithProxy = async (url: string) => {
  const proxies = [
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://thingproxy.freeboard.io/fetch/${url}`,
  ];

  for (const proxy of proxies) {
    try {
      const { data } = await axios.get(proxy, { timeout: 8000 });
      return data;
    } catch {
      continue;
    }
  }
  throw new Error("All proxies failed");
};

const CATEGORY_QUERIES: Record<Category, string> = {
  general: "world news",
  technology: "technology",
  business: "business",
  sports: "sports",
  science: "science",
  health: "health",
  entertainment: "entertainment",
};

export const fetchTopHeadlines = async (
  category: Category = "general",
  pageSize: number = 20
): Promise<NewsResponse> => {
  if (category === "general") {
    const url = `${BASE_URL}/top-headlines?country=us&pageSize=${pageSize}&apiKey=${API_KEY}`;
    return fetchWithProxy(url);
  }
  const q = CATEGORY_QUERIES[category];
  const url = `${BASE_URL}/everything?q=${q}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  return fetchWithProxy(url);
};

export const searchNews = async (
  query: string,
  pageSize: number = 20
): Promise<NewsResponse> => {
  const url = `${BASE_URL}/everything?q=${query}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  return fetchWithProxy(url);
};
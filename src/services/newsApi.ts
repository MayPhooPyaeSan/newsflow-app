import axios from "axios";
import type { Category, NewsResponse } from "../types/news";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";
const PROXY = "https://api.allorigins.win/raw?url=";

const CATEGORY_QUERIES: Record<Category, string> = {
  general: "",
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
  // Use top-headlines for general, everything+query for others
  if (category === "general") {
    const url = `${BASE_URL}/top-headlines?country=us&pageSize=${pageSize}&apiKey=${API_KEY}`;
    const { data } = await axios.get(PROXY + encodeURIComponent(url));
    return data;
  } else {
    const q = CATEGORY_QUERIES[category];
    const url = `${BASE_URL}/everything?q=${q}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
    const { data } = await axios.get(PROXY + encodeURIComponent(url));
    return data;
  }
};

export const searchNews = async (
  query: string,
  pageSize: number = 20
): Promise<NewsResponse> => {
  const url = `${BASE_URL}/everything?q=${query}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
  const { data } = await axios.get(PROXY + encodeURIComponent(url));
  return data;
};
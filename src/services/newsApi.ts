import axios from "axios";
import type { Category, NewsResponse } from "../types/news";

// Uses local proxy in dev, Vercel function in production
const BASE =
  import.meta.env.DEV ? "http://localhost:3000/api/news" : "/api/news";

export const fetchTopHeadlines = async (
  category: Category = "general",
  pageSize: number = 20
): Promise<NewsResponse> => {
  const { data } = await axios.get(BASE, {
    params: { type: "headlines", category, pageSize },
  });
  return data;
};

export const searchNews = async (
  query: string,
  pageSize: number = 20
): Promise<NewsResponse> => {
  const { data } = await axios.get(BASE, {
    params: { type: "search", query, pageSize },
  });
  return data;
};
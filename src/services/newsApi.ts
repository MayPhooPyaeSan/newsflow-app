import axios from "axios";
import type { Category, NewsResponse } from "../types/news";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";
const PROXY = "https://api.allorigins.win/raw?url=";

export const fetchTopHeadlines = async (
  category: Category = "general",
  pageSize: number = 20
): Promise<NewsResponse> => {
  const url = `${BASE_URL}/top-headlines?category=${category}&pageSize=${pageSize}&country=us&apiKey=${API_KEY}`;
  const { data } = await axios.get(PROXY + encodeURIComponent(url));
  return data;
};

export const searchNews = async (
  query: string,
  pageSize: number = 20
): Promise<NewsResponse> => {
  const url = `${BASE_URL}/everything?q=${query}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;
  const { data } = await axios.get(PROXY + encodeURIComponent(url));
  return data;
};
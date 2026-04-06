import axios from "axios";

export default async function handler(req: any, res: any) {
  const { type, category, query, pageSize } = req.query;
  const API_KEY = process.env.VITE_NEWS_API_KEY;
  const BASE_URL = "https://newsapi.org/v2";

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    let url = "";
    if (type === "search" && query) {
      url = `${BASE_URL}/everything?q=${query}&pageSize=${pageSize || 20}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
    } else {
      url = `${BASE_URL}/top-headlines?country=us&category=${category || "general"}&pageSize=${pageSize || 20}&apiKey=${API_KEY}`;
    }
    const { data } = await axios.get(url);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
}
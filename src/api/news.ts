import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const API_KEY = process.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type, category, query, pageSize } = req.query;

  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    let endpoint = "";
    let params: Record<string, string | number> = {
      apiKey: API_KEY!,
      pageSize: Number(pageSize) || 20,
      language: "en",
    };

    if (type === "search" && query) {
      endpoint = `${BASE_URL}/everything`;
      params.q = query as string;
      params.sortBy = "publishedAt";
    } else {
      endpoint = `${BASE_URL}/top-headlines`;
      params.category = (category as string) || "general";
    }

    const { data } = await axios.get(endpoint, { params });
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
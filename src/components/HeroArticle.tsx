import { ExternalLink } from "lucide-react";
import type { Article } from "../types/news";

interface HeroArticleProps {
  article: Article;
}

export const HeroArticle = ({ article }: HeroArticleProps) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full rounded-2xl overflow-hidden h-[420px]"
    >
      <img
        src={article.urlToImage!}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">
          {article.source.name}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white leading-tight line-clamp-3">
          {article.title}
        </h2>
        {article.description && (
          <p className="mt-2 text-sm text-zinc-300 line-clamp-2">
            {article.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-white transition-colors">
          <ExternalLink size={12} />
          <span>Read full story</span>
        </div>
      </div>
    </a>
  );
};
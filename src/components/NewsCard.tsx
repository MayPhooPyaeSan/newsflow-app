import { ExternalLink } from "lucide-react";
import type { Article } from "../types/news";

interface NewsCardProps {
  article: Article;
}

const timeAgo = (dateStr: string) => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
};

export const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-md transition-shadow"
    >
      {article.urlToImage && (
        <div className="overflow-hidden h-44">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-medium text-zinc-500 dark:text-zinc-400">
            {article.source.name}
          </span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug line-clamp-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {article.description}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">
          <ExternalLink size={11} />
          <span>Read more</span>
        </div>
      </div>
    </a>
  );
};
import { Moon, Sun, Newspaper } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="text-zinc-900 dark:text-white" size={22} />
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            NewsFlow
          </span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {darkMode ? (
            <Sun size={18} className="text-zinc-400" />
          ) : (
            <Moon size={18} className="text-zinc-600" />
          )}
        </button>
      </div>
    </nav>
  );
};
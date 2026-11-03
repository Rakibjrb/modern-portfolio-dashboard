import { Search, ArrowUpDown, Filter } from "lucide-react";
import { type ProjectCategory } from "../types";
import { useEffect, useState } from "react";

interface ProjectFilterBarProps {
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  "",
  "MERN",
  "Frontend",
  "Backend",
  "Automation",
];

export function ProjectFilterBar({
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}: ProjectFilterBarProps) {
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchText);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title or tech stack (e.g. React, Go)..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Controls & Toggle Group */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category Dropdown */}
        <div className="relative flex items-center">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="appearance-none rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 transition-colors hover:border-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat.toLowerCase()}
                className="bg-slate-900 text-slate-200"
              >
                {cat === ""
                  ? "All Categories"
                  : cat === "MERN"
                    ? "Full Stack"
                    : cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex items-center">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="appearance-none rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 pl-9 pr-8 text-xs font-medium text-slate-200 transition-colors hover:border-slate-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="latest" className="bg-slate-900 text-slate-200">
              Sort by: Latest
            </option>
            <option value="order" className="bg-slate-900 text-slate-200">
              Sort by: Custom Order
            </option>
            <option value="title-asc" className="bg-slate-900 text-slate-200">
              Sort by: Title A-Z
            </option>
            <option value="title-desc" className="bg-slate-900 text-slate-200">
              Sort by: Title Z-A
            </option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}

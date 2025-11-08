"use client";

import { cn } from "@/lib/utils";
import type { AppCategory } from "@/data/apps";

interface CategoryTabsProps {
  categories: AppCategory[];
  active: AppCategory;
  onSelect: (category: AppCategory) => void;
}

export function CategoryTabs({
  categories,
  active,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="flex w-full snap-x snap-mandatory overflow-x-auto pb-2">
      <div className="flex items-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500",
              active === category
                ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                : "border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:text-emerald-600"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}


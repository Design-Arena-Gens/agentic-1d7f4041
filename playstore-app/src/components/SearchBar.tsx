"use client";

import type { ChangeEvent } from "react";
import { useCallback } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <label className="group relative block w-full">
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-zinc-400 group-focus-within:text-emerald-600">
        ⌕
      </span>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search apps & games"
        className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-10 pr-20 text-sm font-medium text-zinc-700 outline-none transition hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 flex items-center rounded-full px-3 text-xs font-semibold text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600"
        >
          Clear
        </button>
      )}
    </label>
  );
}

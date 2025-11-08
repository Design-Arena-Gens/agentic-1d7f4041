"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { CollectionRow } from "@/components/CollectionRow";
import { SearchBar } from "@/components/SearchBar";
import {
  apps,
  categories,
  featuredCollections,
  type AppCategory,
} from "@/data/apps";

const primaryNav = [
  { label: "For you", href: "/" },
  { label: "Apps", href: "#apps" },
  { label: "Games", href: "#games" },
  { label: "Offers", href: "#offers" },
  { label: "Kids", href: "#kids" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<AppCategory>("For you");
  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    return apps
      .filter((app) => {
        const matchesCategory =
          activeCategory === "For you"
            ? true
            : app.category === activeCategory ||
              (activeCategory === "Top charts" && app.category !== "Top charts");
        const matchesQuery = app.name.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [activeCategory, query]);

  const highlighted = useMemo(() => {
    return apps
      .filter((app) => app.tags.includes("Editors' choice"))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-semibold text-white shadow-lg">
            ▶︎
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">
              Playstore experiences
            </h1>
            <p className="text-sm text-zinc-500">
              Curated apps, adaptive collections, and seamless installs.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-3">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-transparent bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-emerald-300 hover:bg-white hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur md:grid-cols-[2fr,1fr] md:items-center">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Discover
          </span>
          <h2 className="text-3xl font-semibold text-zinc-900">
            Find your next daily essential
          </h2>
          <p className="text-sm text-zinc-500">
            Explore seamless productivity, immersive entertainment, and
            hand-picked wellness apps tailored to your routine.
          </p>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <section className="space-y-6 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredApps.slice(0, 12).map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
        {filteredApps.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-zinc-800">
              No apps match your search.
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              Try a different keyword or browse another category.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-6 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Editors&apos; spotlight
            </h2>
            <p className="text-sm text-zinc-500">
              Ultra-polished apps you can install with confidence.
            </p>
          </div>
          <Link
            href="#"
            className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlighted.map((app) => (
            <AppCard key={app.id} app={app} compact />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {featuredCollections.map((collection) => {
          const collectionApps = collection.appIds
            .map((id) => apps.find((app) => app.id === id))
            .filter((app): app is (typeof apps)[number] => Boolean(app));

          return (
            <CollectionRow
              key={collection.id}
              title={collection.title}
              tagline={collection.tagline}
              apps={collectionApps}
            />
          );
        })}
      </section>
    </div>
  );
}

import Link from "next/link";
import type { PlayApp } from "@/data/apps";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: PlayApp;
  compact?: boolean;
}

export function AppCard({ app, compact }: AppCardProps) {
  return (
    <Link
      href={`/app/${app.slug}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
        compact ? "min-h-[240px]" : "min-h-[280px]"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-semibold text-white shadow-md transition group-hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${app.accent}, ${app.accentDark})`,
          }}
        >
          {app.name
            .split(" ")
            .map((segment) => segment.charAt(0))
            .slice(0, 2)
            .join("")}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <h3 className="line-clamp-1 text-lg font-semibold text-zinc-900">
              {app.name}
            </h3>
            {app.tags.includes("Editors' choice") && (
              <span className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-0.5 text-xs font-medium text-white">
                Editors&apos; Choice
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500">{app.developer}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
        <span className="flex items-center gap-1 font-medium text-zinc-800">
          ★ {app.rating.toFixed(1)}
          <span className="text-xs text-zinc-400">
            ({formatNumber(app.ratingsCount)})
          </span>
        </span>
        <span className="h-1 w-1 rounded-full bg-zinc-300" />
        <span>{app.installs} installs</span>
        <span className="h-1 w-1 rounded-full bg-zinc-300" />
        <span>{app.price === "Free" ? "Free" : `In-app purchases (${app.price})`}</span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-zinc-500">
        {app.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 transition group-hover:bg-zinc-900 group-hover:text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }
  return value.toString();
}


import Link from "next/link";
import type { PlayApp } from "@/data/apps";

interface CollectionRowProps {
  title: string;
  tagline: string;
  apps: PlayApp[];
}

export function CollectionRow({ title, tagline, apps }: CollectionRowProps) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-6 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
          <p className="text-sm text-zinc-500">{tagline}</p>
        </div>
        <Link
          href="#"
          className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
        >
          See all
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {apps.map((app) => (
          <Link
            key={app.id}
            href={`/app/${app.slug}`}
            className="group relative flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-lg"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-white shadow-md"
              style={{
                background: `linear-gradient(135deg, ${app.accent}, ${app.accentDark})`,
              }}
            >
              {app.name.charAt(0)}
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-semibold text-zinc-900">
                {app.name}
              </span>
              <span className="text-xs text-zinc-500">{app.developer}</span>
              <span className="mt-1 text-xs text-zinc-400">
                ★ {app.rating.toFixed(1)} · {app.installs}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


import Link from "next/link";
import { notFound } from "next/navigation";
import { apps } from "@/data/apps";

interface AppPageProps {
  params: { slug: string };
}

export default function AppPage({ params }: AppPageProps) {
  const { slug } = params;
  const app = apps.find((item) => item.slug === slug);

  if (!app) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
      >
        ← Back to Play
      </Link>

      <header className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm md:flex-row md:items-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-semibold text-white shadow-lg md:h-28 md:w-28"
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
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-semibold text-zinc-900">{app.name}</h1>
          <p className="text-sm text-zinc-500">{app.developer}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
            <span className="flex items-center gap-1 font-medium text-zinc-900">
              ★ {app.rating.toFixed(1)}
              <span className="text-xs text-zinc-400">
                ({formatNumber(app.ratingsCount)})
              </span>
            </span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{app.installs} installs</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{app.price === "Free" ? "Free" : `In-app purchases (${app.price})`}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{app.category}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600">
            Install
          </button>
          <span className="text-center text-xs text-zinc-400">
            Offers in-app purchases
          </span>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <article className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">About this app</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            {app.description}
          </p>
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              What&apos;s new
            </h3>
            <p className="mt-2 text-sm text-zinc-600">{app.whatsNew}</p>
            <p className="mt-4 text-xs text-zinc-400">
              Updated on {app.updatedAt}
            </p>
          </div>
        </article>

        <aside className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">App info</h2>
          <dl className="space-y-3 text-sm text-zinc-600">
            <div className="flex justify-between">
              <dt>Download size</dt>
              <dd className="font-medium text-zinc-900">{app.size}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Content rating</dt>
              <dd className="font-medium text-zinc-900">{app.contentRating}</dd>
            </div>
            <div className="flex justify-between">
              <dt>In-app purchases</dt>
              <dd className="font-medium text-zinc-900">
                {app.inAppPurchases}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Category</dt>
              <dd className="font-medium text-zinc-900">{app.category}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Preview</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="relative h-64 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at top left, ${app.accentLight}, transparent 70%), radial-gradient(circle at bottom right, ${app.accentDark}, transparent 65%)`,
                }}
              />
              <div className="relative flex h-full flex-col justify-between p-6 text-zinc-800">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                    Preview {index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{app.name}</h3>
                </div>
                <p className="text-sm text-zinc-600">
                  Immersive snapshot highlighting {app.tags[index % app.tags.length] ?? "core features"}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
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

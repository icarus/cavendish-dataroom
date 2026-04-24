import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VideoPlayer } from "./video-player";

const COMPANIES: Record<string, { avatar: string; url?: string; bg: string }> = {
  toku: { avatar: "/avatars/toku.png", url: "https://toku.cl", bg: "#1a1a2e" },
  bemmbo: { avatar: "/avatars/bemmbo.webp", url: "https://bemmbo.com", bg: "#4f46e5" },
  fintoc: { avatar: "/avatars/fintoc.png", url: "https://fintoc.com", bg: "#0f172a" },
  horizon: { avatar: "/avatars/horizon-ai.png", url: "https://horizon.ai", bg: "#1e293b" },
  grupalia: { avatar: "/avatars/grupalia.png", url: "https://grupalia.com", bg: "#7c3aed" },
  shinkansen: { avatar: "/avatars/shinkansen.png", url: "https://shinkansen.finance", bg: "#0ea5e9" },
};

export function Co({ name, label }: { name: string; label?: string }) {
  const co = COMPANIES[name];
  const displayName = label ?? name.charAt(0).toUpperCase() + name.slice(1);
  if (!co) return <span className="font-sans font-medium text-black">{displayName}</span>;

  const inner = (
    <span className="inline-flex items-center gap-1.5 align-baseline">
      <span
        className="inline-flex items-center justify-center shrink-0 size-5 overflow-hidden"
        style={{ backgroundColor: co.bg }}
      >
        <Image src={co.avatar} alt={displayName} width={20} height={20} className="object-cover size-5" />
      </span>
      <span className="font-sans font-medium text-black underline decoration-black/20 underline-offset-2">{displayName}</span>
    </span>
  );

  if (co.url) {
    return (
      <a href={co.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
        {inner}
      </a>
    );
  }

  return inner;
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 border border-[#FFEC40] bg-[#FFEC40]/10 p-5 my-6">
      {children}
    </div>
  );
}

export function Hl({ children }: { children: React.ReactNode }) {
  return <span className="bg-[#FFEC40] uppercase font-mono text-black px-0.5 align-baseline">{children}</span>;
}

export function Section({
  id,
  badge,
  title,
  children,
  borderBottom = true,
}: {
  id: string;
  badge: string;
  title: string;
  children: React.ReactNode;
  borderBottom?: boolean;
}) {
  return (
    <section id={id} className={`py-16 ${borderBottom ? "border-b border-black/10" : ""}`}>
      <Badge variant="solid" className="mb-4">{badge}</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
      {children}
    </h3>
  );
}

export function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
      {children}
    </h4>
  );
}

export function Figure({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className ?? "my-8"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full border border-black/10" />
      {caption && (
        <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function VideoFigure({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  return <VideoPlayer src={src} caption={caption} />;
}

export function FigureGrid({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: number;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3 mt-4`}>
      {children}
    </div>
  );
}

export function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6">
      <span className="inline-flex items-start justify-center bg-[#FFEC40] text-black font-mono font-medium text-sm w-6 h-fit shrink-0 mt-0.5">
        {n}
      </span>
      <div className="mt-0.5">
        <h4 className="font-sans font-medium text-base text-black mb-3">{title}</h4>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

export function StepList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-20">{children}</div>;
}

export function TimelineStep({
  n,
  title,
  last = false,
  badge: badgeText,
  children,
}: {
  n: number;
  title: string;
  last?: boolean;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6 pb-8">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
          <span className="font-mono font-medium text-black text-sm">{n}</span>
        </div>
        {!last && <div className="w-px bg-black/10 flex-1 mt-2" />}
      </div>
      <div className="pb-4 flex-1">
        <h4 className="font-sans font-medium text-black/40 text-sm mb-3">
          {title}
          {badgeText && <Badge variant="solid" className="text-xs ml-1">{badgeText}</Badge>}
        </h4>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

export function StatGrid({
  items,
  cols,
}: {
  items: { label: string; value: string }[];
  cols?: number;
}) {
  const gridCols = cols ?? (items.length <= 3 ? 3 : items.length <= 4 ? 4 : 6);
  const colClass =
    gridCols === 3 ? "grid-cols-3" :
    gridCols === 4 ? "grid-cols-2 sm:grid-cols-4" :
    gridCols === 6 ? "grid-cols-3 sm:grid-cols-6" :
    `grid-cols-${gridCols}`;
  return (
    <div className={`grid ${colClass} gap-3`}>
      {items.map((item) => (
        <div key={item.label} className="border border-black/10 p-4 bg-black/5 text-center">
          <p className="font-mono font-medium text-black text-2xl mb-1">{item.value}</p>
          <p className="font-sans font-medium text-black/60 text-sm leading-snug">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function GenGrid({
  items,
}: {
  items: { gen: string; n: string }[];
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {items.map((g) => (
        <div key={g.gen} className="border border-black/10 p-3 bg-black/5 text-center">
          <p className="font-mono font-medium text-black text-xl mb-0.5">{g.n}</p>
          <p className="font-mono font-medium text-black text-xs uppercase tracking-wider">Gen {g.gen}</p>
        </div>
      ))}
    </div>
  );
}

export function EventGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((event) => (
        <div key={event} className="border border-black/10 px-4 py-2.5 bg-black/5">
          <span className="font-mono font-medium text-black/60 text-sm">{event}</span>
        </div>
      ))}
    </div>
  );
}

export function InfoCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/10 p-5 bg-black/5 mb-4">
      {title && <H4>{title}</H4>}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function TermGrid({
  items,
}: {
  items: { label: string; value: string; sub?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {items.map((t) => (
        <div key={t.label} className="border border-black/10 p-5 bg-black/5">
          <p className="font-mono font-medium text-black text-sm uppercase tracking-wider mb-0">{t.label}</p>
          <p className="font-mono font-medium  bg-[#FFEC40] text-black uppercase w-fit px-0.5 -mx-0.5 mt-4 text-sm">({t.value})</p>
          {t.sub && <p className="font-sans font-medium text-black/40 text-sm mt-1">{t.sub}</p>}
        </div>
      ))}
    </div>
  );
}

export function InvestmentType({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="space-y-3 -mt-10 mb-10">
      {items.map((item) => (
        <div key={item.title} className="flex gap-4 py-3 border-b border-black/10 last:border-0">
          <span className="bg-muted-foreground mt-2.5 shrink-0 aspect-square size-1" />
          <div>
            <span className="font-sans font-medium text-black/60 text-sm">{item.title}: </span>
            <span className="font-sans font-medium text-black/60 text-sm leading-relaxed">{item.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DataTable({
  headers,
  rows,
  highlightLast = false,
  fixed = false,
}: {
  headers: string[];
  rows: (string | number)[][];
  highlightLast?: boolean;
  fixed?: boolean;
}) {
  return (
    <div className="overflow-x-auto -mx-1 mb-4">
      <table className={`w-full border-collapse ${fixed ? "table-fixed" : ""}`}>
        {headers.length > 0 && (
          <thead>
            <tr className="border-b border-black/10">
              {headers.map((h) => (
                <th key={h} className="text-left font-mono px-1 font-medium text-black text-xs uppercase tracking-wider pb-3 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => {
            const isHighlight = highlightLast && ri === rows.length - 1;
            return (
              <tr key={ri} className={`border-b ${isHighlight ? "bg-neutral-200/80 *:!text-black" : "border-black/10"}`}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`font-mono uppercase px-1 font-medium text-black/60 text-sm py-2.5 pr-3 ${ci === headers.length - 1 ? "" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function FinancialTable({
  rows,
}: {
  rows: { label: string; value: string; bold?: boolean; sub?: boolean }[];
}) {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className={row.bold ? "bg-[#FFEC40]" : "border-b border-black/10"}>
              <td className={`font-sans font-medium text-sm py-3 pr-8 ${row.bold ? "text-black" : row.sub ? "text-black/40 pl-6" : "text-black/60"}`}>
                {row.label}
              </td>
              <td className={`font-mono font-medium text-sm py-3 text-right ${row.bold ? "text-black" : row.sub ? "text-black/40" : "text-black"}`}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RoundTypeCard({
  name,
  desc,
  children,
}: {
  name: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black/10 p-5 bg-black/5">
      <H4>{name}</H4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">{desc}</p>
      {children}
    </div>
  );
}

export function Collapsible({
  summary,
  children,
}: {
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border border-black/10 bg-black/5 [&>summary]:list-none [&>summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center gap-2 font-sans font-medium text-black text-sm px-5 py-3 cursor-pointer select-none hover:bg-black/5 transition-colors">
        <ChevronRight size={14} className="shrink-0 transition-transform group-open:rotate-90" />
        {summary}
      </summary>
      <div className="px-5 pb-5 pt-6 space-y-4 border-t border-black/10">
        {children}
      </div>
    </details>
  );
}

export function QuestionGroup({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <p className="font-mono font-medium text-black text-sm uppercase tracking-wider mb-2">{title}</p>
      <ul className="list-disc list-outside pl-5 space-y-2">
        {items.map((q) => (
          <li key={q} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{q}</li>
        ))}
      </ul>
    </div>
  );
}

export function DealSourceItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">
      <span className="text-black">{title}:</span> {body}
    </li>
  );
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className ?? "font-sans font-medium text-black/60 text-sm leading-relaxed"}>{children}</p>;
}

export function Spacer({ size = "mb-10" }: { size?: string }) {
  return <div className={size} />;
}

export const rabbitHoleComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-sans font-medium text-black mb-8"
      style={{ fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.2 }}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-sans font-medium text-black/40 mb-4"
      style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3" {...props} />
  ),
  p: (props) => (
    <p className="font-sans font-medium text-black/60 text-sm leading-relaxed" {...props} />
  ),
  ul: (props) => <ul className="list-disc list-outside pl-5 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal list-outside pl-5 space-y-2" {...props} />,
  li: (props) => <li className="font-sans font-medium text-black/60 text-sm leading-relaxed" {...props} />,
  strong: (props) => <span className="bg-[#FFEC40] text-black px-1" {...props} />,
  em: (props) => <span className="italic" {...props} />,
  blockquote: (props) => (
    <div className="border border-[#FFEC40] bg-[#FFEC40]/10 p-5 my-6 [&>p]:mb-0" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-black/10" {...props} />,
  th: (props) => (
    <th className="text-left font-mono font-medium text-black text-sm uppercase tracking-wider pb-3 pr-8" {...props} />
  ),
  td: (props) => <td className="font-sans font-medium text-black/60 text-sm py-3 pr-8" {...props} />,
};

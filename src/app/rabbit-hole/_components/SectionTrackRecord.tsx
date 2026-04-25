"use client";
import { useState } from "react";
import { Callout, Section } from "./mdx-components";

// ── Helpers ──────────────────────────────────────────────────────────────────

function HBar({
  label,
  value,
  max,
  sublabel = "",
  color = "#FFEC40",
}: {
  label: string;
  value: number;
  max: number;
  sublabel?: string;
  color?: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-4 py-3 border-b border-black/10 last:border-0">
      <div className="w-36 shrink-0">
        <p className="font-sans font-medium text-black/60 text-sm leading-snug">{label}</p>
        <p className="font-sans font-medium text-black/40 text-xs mt-0.5">{sublabel || "\u00A0"}</p>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-black/10 h-1.5">
          <div style={{ width: `${pct}%`, backgroundColor: color }} className="h-full" />
        </div>
        <span className="font-mono uppercase font-medium text-black/60 text-sm w-10 text-right shrink-0">{value}</span>
      </div>
    </div>
  );
}

function HBarMoney({
  label,
  value,
  max,
  count,
}: {
  label: string;
  value: number;
  max: number;
  count: number;
}) {
  const pct = Math.round((value / max) * 100);
  const fmt = value >= 1_000_000
    ? `$${(value / 1_000_000).toFixed(1)}M`
    : `$${(value / 1_000).toFixed(0)}k`;
  return (
    <div className="flex items-center gap-4 py-3 border-b border-black/10 last:border-0">
      <div className="w-36 shrink-0">
        <p className="font-sans font-medium text-black/60 text-sm leading-snug">{label}</p>
        <p className="font-sans font-medium text-black/40 text-xs mt-0.5">{count} LP{count !== 1 ? "s" : ""}</p>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-black/10 h-1.5">
          <div style={{ width: `${pct}%` }} className="h-full bg-[#FFEC40]" />
        </div>
        <span className="font-mono uppercase font-medium text-black/60 text-sm w-14 text-right shrink-0">{fmt}</span>
      </div>
    </div>
  );
}

function BatchChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  const n = data.length;
  const barW = 18;
  const colW = 44;
  const padL = 8, padR = 8, padT = 22, padB = 24;
  const chartH = 100;
  const totalW = padL + n * colW + padR;
  const totalH = padT + chartH + padB;

  const pts = data.map((d, i) => {
    const cx = padL + i * colW + colW / 2;
    const bh = Math.max(3, (d.value / max) * chartH);
    const by = padT + chartH - bh;
    return { cx, by, bh, label: d.label, value: d.value };
  });

  return (
    <svg viewBox={`0 0 ${totalW} ${totalH}`} className="w-full overflow-visible">
      {/* Bars */}
      {pts.map((p, i) => (
        <rect
          key={i}
          x={p.cx - barW / 2}
          y={p.by}
          width={barW}
          height={p.bh}
          fill="#FFEC40"
        />
      ))}
      {/* Count labels above bars */}
      {pts.map((p, i) => (
        <text
          key={i}
          x={p.cx}
          y={p.by - 7}
          textAnchor="middle"
          fontSize="9"
          fontFamily="ui-monospace,monospace"
          fontWeight="600"
          fill="#000000"
        >
          {p.value}
        </text>
      ))}
      {/* X-axis labels */}
      {pts.map((p, i) => (
        <text
          key={i}
          x={p.cx}
          y={padT + chartH + 16}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="ui-monospace,monospace"
          fontWeight="500"
          fill="#00000055"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}

interface BarSegment { label: string; value: number; color: string; textColor?: string }

function StackedBar({ rowLabel, segments }: { rowLabel: string; segments: BarSegment[] }) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const active = segments.filter((s) => s.value > 0);
  const total = active.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  return (
    <div className="mb-3">
      <div className="flex items-center gap-3">
        <span className="font-mono uppercase font-medium text-black/40 text-xs w-16 shrink-0">{rowLabel}</span>
        <div className="flex-1 flex h-6 gap-px">
          {active.map((seg) => {
            const pct = (seg.value / total) * 100;
            const isHov = hoveredLabel === seg.label;
            const rounded = Math.round(seg.value);
            return (
              <div
                key={seg.label}
                className="relative flex items-center justify-center"
                style={{ width: `${pct}%`, backgroundColor: seg.color, flexShrink: 0, overflow: "visible" }}
                onMouseEnter={() => setHoveredLabel(seg.label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                {/* Text clipped inside the bar */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                  {pct >= 9 && (
                    <span className="font-mono font-medium text-xs select-none"
                      style={{ color: seg.textColor ?? "rgba(0,0,0,0.5)" }}>
                      {rounded}
                    </span>
                  )}
                </div>
                {/* Tooltip */}
                {isHov && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                    <div className="bg-[#1C1C1C] text-[#FFEC40] font-mono font-medium text-xs px-2 py-1 rounded whitespace-nowrap">
                      {seg.label} · {rounded} · {Math.round(pct)}%
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <span className="font-mono uppercase font-medium text-black/40 text-xs w-8 text-right shrink-0">{Math.round(total)}</span>
      </div>
    </div>
  );
}

const GROWTH_SEGMENTS = (interesting: number, slowGrowth: number, stalled: number, closed: number, exited: number): BarSegment[] => [
  { label: "Interesting", value: interesting, color: "#FFEC40",             textColor: "rgba(0,0,0,0.7)" },
  { label: "Slow growth", value: slowGrowth,  color: "rgba(255,236,64,0.4)", textColor: "rgba(0,0,0,0.55)" },
  { label: "Stalled",     value: stalled,     color: "rgba(0,0,0,0.15)",     textColor: "rgba(0,0,0,0.55)" },
  { label: "Closed",      value: closed,      color: "rgba(0,0,0,0.06)",     textColor: "rgba(0,0,0,0.4)" },
  { label: "Exited",      value: exited,      color: "#F9BC12",             textColor: "rgba(0,0,0,0.7)" },
];

const STATUS_SEGMENTS = (active: number, closed: number, exited: number): BarSegment[] => [
  { label: "Active",  value: active,  color: "#FFEC40",         textColor: "rgba(0,0,0,0.7)" },
  { label: "Closed",  value: closed,  color: "rgba(0,0,0,0.15)", textColor: "rgba(0,0,0,0.55)" },
  { label: "Exited",  value: exited,  color: "#F9BC12",         textColor: "rgba(0,0,0,0.7)" },
];

function GrowthBar({
  interesting, slowGrowth, stalled, closed, exited, total, label,
}: {
  interesting: number; slowGrowth: number; stalled: number;
  closed: number; exited: number; total: number; label: string;
}) {
  return <StackedBar rowLabel={label} segments={GROWTH_SEGMENTS(interesting, slowGrowth, stalled, closed, exited)} />;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 p-4 bg-black/5">
      <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="font-sans font-medium text-black text-sm">{value}</p>
    </div>
  );
}

// ── LP Donut Charts ───────────────────────────────────────────────────────────

const LP_COLORS = ["#1C1C1C", "#555555", "#999999", "#CCCCCC", "#FFEC40"];
// Order: FFOO, HNWI, Founders, CORP, GP/VC — mapped by index

interface LpEntry { label: string; count: number; amount: number }

function buildSlices(values: number[], cx: number, cy: number, outerR: number, innerR: number, gap: number) {
  const total = values.reduce((s, v) => s + v, 0);
  let cursor = -Math.PI / 2;
  return values.map((v, i) => {
    const angle = (v / total) * (2 * Math.PI) - gap;
    const a1 = cursor, a2 = cursor + angle;
    cursor += angle + gap;
    const large = angle > Math.PI ? 1 : 0;
    // Outer arc points
    const ox1 = cx + outerR * Math.cos(a1), oy1 = cy + outerR * Math.sin(a1);
    const ox2 = cx + outerR * Math.cos(a2), oy2 = cy + outerR * Math.sin(a2);
    // Inner arc points
    const ix1 = cx + innerR * Math.cos(a1), iy1 = cy + innerR * Math.sin(a1);
    const ix2 = cx + innerR * Math.cos(a2), iy2 = cy + innerR * Math.sin(a2);
    // Label centroid (mid-radius, mid-angle)
    const mid = a1 + angle / 2;
    const lR = (outerR + innerR) / 2;
    const lx = cx + lR * Math.cos(mid), ly = cy + lR * Math.sin(mid);
    const path = `M ${ox1.toFixed(2)} ${oy1.toFixed(2)} A ${outerR} ${outerR} 0 ${large} 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)} L ${ix2.toFixed(2)} ${iy2.toFixed(2)} A ${innerR} ${innerR} 0 ${large} 0 ${ix1.toFixed(2)} ${iy1.toFixed(2)} Z`;
    return { path, lx, ly, angle, color: LP_COLORS[i] };
  });
}

function SingleDonut({
  title, values, labels, center,
}: {
  title: string; values: number[]; labels: string[]; center: string;
}) {
  const cx = 100, cy = 100, outerR = 88, innerR = 58;
  const slices = buildSlices(values, cx, cy, outerR, innerR, 0.025);
  const MIN_ANGLE = 0.25; // ~14° — only show label if slice is large enough

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider text-center">{title}</p>
      <svg viewBox="0 0 200 200" className="w-40 h-40">
        {slices.map((s, i) => (
          <g key={i}>
            <path d={s.path} fill={s.color} />
            {s.angle >= MIN_ANGLE && (
              <text
                x={s.lx}
                y={s.ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="9"
                fontFamily="ui-monospace,monospace"
                fontWeight="600"
                fill={s.color === "#FFEC40" || s.color === "#CCCCCC" ? "#00000099" : "#ffffffcc"}
              >
                {labels[i]}
              </text>
            )}
          </g>
        ))}
        {/* Center label */}
        <text x={cx} y={cy - 7} textAnchor="middle" fontSize="8" fontFamily="ui-monospace,monospace" fill="#00000055" fontWeight="500">TOTAL</text>
        <text x={cx} y={cy + 7} textAnchor="middle" fontSize="11" fontFamily="ui-monospace,monospace" fill="#000000" fontWeight="600">{center}</text>
      </svg>
    </div>
  );
}

function LpPieChart({ data }: { data: LpEntry[] }) {
  const fmtAmt = (v: number) =>
    v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${Math.round(v / 1_000)}K`;

  const totalCount = data.reduce((s, d) => s + d.count, 0);
  const totalAmount = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Two donuts side by side */}
      <div className="flex flex-row items-start justify-center gap-10">
        <SingleDonut
          title="Number of LPs"
          values={data.map((d) => d.count)}
          labels={data.map((d) => String(d.count))}
          center={String(totalCount)}
        />
        <SingleDonut
          title="Committed Amount"
          values={data.map((d) => d.amount)}
          labels={data.map((d) => fmtAmt(d.amount))}
          center={fmtAmt(totalAmount)}
        />
      </div>

      {/* Shared legend */}
      <div className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: LP_COLORS[i] }} />
            <span className="font-mono font-medium text-black/60 text-xs uppercase tracking-wider">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Fund Metrics Tabs ─────────────────────────────────────────────────────────

const FUND_DATA = [
  {
    id: "todo",
    label: "Todo",
    vintage: null,
    amount: "$12,493,814",
    startups: 115,
    aceleracion: 97,
    oportunidades: 18,
  },
  {
    id: "spv",
    label: "SPV",
    vintage: "2020",
    amount: "$211,600",
    startups: 5,
    aceleracion: 4,
    oportunidades: 1,
  },
  {
    id: "genesis",
    label: "Genesis",
    vintage: "2021",
    amount: "$535,000",
    startups: 11,
    aceleracion: 10,
    oportunidades: 1,
  },
  {
    id: "fund-i",
    label: "Fund I",
    vintage: "2022",
    amount: "$11,747,214",
    startups: 99,
    aceleracion: 83,
    oportunidades: 16,
  },
] as const;

function FundMetrics() {
  const [active, setActive] = useState<string>("todo");
  const [displayed, setDisplayed] = useState(FUND_DATA[0]);
  const [fading, setFading] = useState(false);

  const switchTo = (id: string) => {
    if (id === active) return;
    setFading(true);
    setTimeout(() => {
      setDisplayed(FUND_DATA.find((f) => f.id === id)!);
      setActive(id);
      setFading(false);
    }, 120);
  };

  return (
    <div className="mb-10">
      {/* Tabs */}
      <div className="flex gap-1 mb-4">
        {FUND_DATA.map((f) => (
          <button
            key={f.id}
            onClick={() => switchTo(f.id)}
            className={`flex items-baseline gap-1.5 px-3 py-1.5 rounded-full font-mono font-medium text-xs uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
              active === f.id
                ? "bg-[#474402] text-[#FFEC40]"
                : "bg-black/5 text-black/40 hover:text-black hover:bg-black/10"
            }`}
          >
            {f.label}
            {f.vintage && (
              <span className={`text-[10px] ${active === f.id ? "text-[#FFEC40]/60" : "text-black/30"}`}>
                · {f.vintage}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 transition-opacity duration-120"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {[
          { label: "Monto invertido", value: displayed.amount },
          { label: "Startups", value: String(displayed.startups) },
          { label: "Aceleración", value: String(displayed.aceleracion) },
          { label: "Oportunidades", value: String(displayed.oportunidades) },
        ].map((m) => (
          <div key={m.label} className="border border-black/10 p-4 bg-black/5 flex flex-col items-center text-center">
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-2">{m.label}</p>
            <p className="font-mono font-medium text-black text-xl">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Industry Treemap ──────────────────────────────────────────────────────────

const INDUSTRY_COLORS: Record<string, string> = {
  AI:                 "#4A9B9B",
  Fintech:            "#E8A830",
  SaaS:               "#D4763E",
  "E-commerce":       "#3B6EA8",
  Proptech:           "#7B5EA7",
  Regtech:            "#5B9E7A",
  Logistics:          "#4A7FB5",
  Healthtech:         "#9B9BC0",
  EdTech:             "#3D8A6E",
  "Creators Economy": "#6BAD5B",
  "Creators Econ.":   "#6BAD5B",
  HRTech:             "#2D7A5E",
  "Dev Tools":        "#6B5EA7",
  Foodtech:           "#4A9BC0",
  Insurtech:          "#3D5A8A",
  Crypto:             "#4A6EA8",
  PetCare:            "#C06BAD",
  Data:               "#3D8A3D",
  Climatech:          "#8AB44A",
  Web3:               "#8A4AB4",
  Travels:            "#C0524A",
  Otros:              "#888888",
};

interface TileInput { label: string; value: number }
interface Tile extends TileInput { x: number; y: number; w: number; h: number }

function layoutTreemap(items: TileInput[], x: number, y: number, w: number, h: number): Tile[] {
  const sorted = items.filter((d) => d.value > 0).sort((a, b) => b.value - a.value);
  if (sorted.length === 0) return [];
  if (sorted.length === 1) return [{ ...sorted[0], x, y, w, h }];
  const total = sorted.reduce((s, d) => s + d.value, 0);
  let cumSum = 0, splitIdx = sorted.length - 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    cumSum += sorted[i].value;
    if (cumSum / total >= 0.5) { splitIdx = i + 1; break; }
    splitIdx = i + 1;
  }
  const first = sorted.slice(0, splitIdx);
  const second = sorted.slice(splitIdx);
  const ratio = first.reduce((s, d) => s + d.value, 0) / total;
  if (w >= h) {
    const w1 = w * ratio;
    return [...layoutTreemap(first, x, y, w1, h), ...layoutTreemap(second, x + w1, y, w - w1, h)];
  } else {
    const h1 = h * ratio;
    return [...layoutTreemap(first, x, y, w, h1), ...layoutTreemap(second, x, y + h1, w, h - h1)];
  }
}

function IndustryTreemap({ data }: { data: TileInput[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const W = 460, H = 280, GAP = 2;
  const tiles = layoutTreemap(data, 0, 0, W, H);
  const MIN_LABEL_W = 36, MIN_LABEL_H = 24;

  const hTile = tiles.find((t) => t.label === hovered);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-sm" style={{ display: "block" }}>
        {tiles.map((t) => {
          const color = INDUSTRY_COLORS[t.label] ?? "#888888";
          const gx = t.x + GAP / 2, gy = t.y + GAP / 2;
          const gw = t.w - GAP, gh = t.h - GAP;
          const showLabel = gw >= MIN_LABEL_W && gh >= MIN_LABEL_H;
          const isHovered = hovered === t.label;
          return (
            <g key={t.label}
              onMouseEnter={() => setHovered(t.label)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "default" }}>
              <rect x={gx} y={gy} width={gw} height={gh} fill={color}
                opacity={hovered && !isHovered ? 0.55 : 1}
                style={{ transition: "opacity 120ms" }} />
              {showLabel && (
                <text
                  x={gx + gw / 2} y={gy + gh / 2}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={Math.min(12, Math.max(7, gw / 8))}
                  fontFamily="ui-sans-serif,sans-serif" fontWeight="500" fill="white"
                  style={{ pointerEvents: "none", userSelect: "none" }}>
                  {t.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip for hovered tile */}
      {hTile && (
        <div
          className="absolute pointer-events-none z-10 px-2 py-1 bg-[#1C1C1C] rounded font-mono font-medium text-[#FFEC40] text-xs uppercase tracking-wider whitespace-nowrap"
          style={{
            left: `${((hTile.x + hTile.w / 2) / 460) * 100}%`,
            top: `${((hTile.y + hTile.h / 2) / 280) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {hTile.label} · {hTile.value}
        </div>
      )}
    </div>
  );
}

function IndustryByBatchChart({
  industryByBatch,
  batchLabels,
}: {
  industryByBatch: Record<string, number[]>;
  batchLabels: string[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);

  const switchBatch = (i: number) => {
    if (i === activeIdx) return;
    setFading(true);
    setTimeout(() => { setDisplayIdx(i); setActiveIdx(i); setFading(false); }, 120);
  };

  const batchData: TileInput[] = Object.entries(industryByBatch)
    .map(([label, vals]) => ({ label, value: vals[displayIdx] }))
    .filter((d) => d.value > 0);

  return (
    <div>
      <div className="flex gap-1 mb-4 flex-wrap">
        {batchLabels.map((b, i) => (
          <button key={b} onClick={() => switchBatch(i)}
            className={`px-3 py-1.5 rounded-full font-mono font-medium text-xs uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
              activeIdx === i ? "bg-[#474402] text-[#FFEC40]" : "bg-black/5 text-black/40 hover:text-black hover:bg-black/10"
            }`}>
            {b}
          </button>
        ))}
      </div>
      <div style={{ opacity: fading ? 0 : 1, transition: "opacity 120ms" }}>
        {batchData.length > 0
          ? <IndustryTreemap data={batchData} />
          : <p className="font-mono text-black/30 text-xs uppercase tracking-wider py-6 text-center">Sin datos</p>
        }
      </div>
    </div>
  );
}

// ── ARR Grouped Bar Chart ─────────────────────────────────────────────────────

const ARR_QUARTER_COLORS = ["#CCCCCC", "#888888", "#444444", "#FFEC40"];

function ArrGroupedChart({
  ranges,
  quarters,
}: {
  ranges: { label: string; values: number[] }[];
  quarters: string[];
}) {
  const barW = 22, barGap = 4, groupGap = 28;
  const padL = 16, padR = 16, padT = 30, padB = 64;
  const chartH = 200;
  const groupW = quarters.length * barW + (quarters.length - 1) * barGap;
  const totalW = padL + ranges.length * (groupW + groupGap) - groupGap + padR;
  const totalH = padT + chartH + padB;
  const maxVal = Math.max(...ranges.flatMap((r) => r.values));

  const groups = ranges.map((range, gi) => {
    const gx = padL + gi * (groupW + groupGap);
    const bars = range.values.map((v, qi) => {
      const bx = gx + qi * (barW + barGap);
      const bh = maxVal > 0 ? Math.max(v > 0 ? 2 : 0, (v / maxVal) * chartH) : 0;
      const by = padT + chartH - bh;
      return { bx, by, bh, value: v, color: ARR_QUARTER_COLORS[qi] };
    });
    return { bars, labelX: gx + groupW / 2, label: range.label };
  });

  const shortLabel = (l: string) =>
    l.replace("$1 – $50k", "$1-50k")
     .replace("$51k – $100k", "$51-100k")
     .replace("$101k – $250k", "$101-250k")
     .replace("$251k – $500k", "$251-500k")
     .replace("$501k – $750k", "$501-750k")
     .replace("$751k – $1M", "$751k-1M")
     .replace("$1.1M – $1.5M", "$1.1-1.5M")
     .replace("$1.51M – $2M", "$1.5-2M")
     .replace("$2.1M – $5M", "$2.1-5M")
     .replace("$5M – $10M", "$5-10M");

  return (
    <div>
      <div className="relative">
        <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          style={{ width: totalW, height: totalH, display: "block", minWidth: totalW }}
          overflow="visible"
        >
          {groups.map((g, gi) => (
            <g key={gi}>
              {g.bars.map((b, qi) => (
                <g key={qi}>
                  {b.bh > 0 && (
                    <rect x={b.bx} y={b.by} width={barW} height={b.bh} fill={b.color} />
                  )}
                  {b.value > 0 && (
                    <text
                      x={b.bx + barW / 2} y={b.by - 6}
                      textAnchor="middle" fontSize="11"
                      fontFamily="ui-monospace,monospace" fontWeight="600" fill="#000000bb">
                      {b.value}
                    </text>
                  )}
                </g>
              ))}
              <text
                x={g.labelX}
                y={padT + chartH + 10}
                transform={`rotate(-42, ${g.labelX}, ${padT + chartH + 10})`}
                textAnchor="end"
                fontSize="11"
                fontFamily="ui-monospace,monospace"
                fontWeight="500"
                fill="#00000066"
              >
                {shortLabel(g.label)}
              </text>
            </g>
          ))}
        </svg>
        </div>
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, white)" }} />
      </div>

      {/* Legend + scroll hint on same row */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-6">
          {quarters.map((q, i) => (
            <div key={q} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: ARR_QUARTER_COLORS[i] }} />
              <span className="font-mono font-medium text-black/40 text-xs">{q}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono font-medium text-black/30 text-xs uppercase tracking-wider">scroll</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="#00000033" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Country Pie Charts ────────────────────────────────────────────────────────

const COUNTRY_COLORS: Record<string, string> = {
  Chile:     "#FFEC40",
  Mexico:    "#1C1C1C",
  Colombia:  "#666666",
  Peru:      "#AAAAAA",
  Argentina: "#D4C832",
  Ecuador:   "#999999",
  España:    "#444444",
  Guatemala: "#BBBBBB",
  Uruguay:   "#888888",
  USA:       "#555555",
  Otros:     "#CCCCCC",
};

function CountryPieChart({ data }: { data: { label: string; value: number }[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = [...data].filter((d) => d.value > 0).sort((a, b) => b.value - a.value);
  if (active.length === 0) return (
    <p className="font-mono text-black/30 text-xs uppercase tracking-wider py-6 text-center">Sin datos</p>
  );

  const total = active.reduce((s, d) => s + d.value, 0);
  const cx = 230, cy = 170, outerR = 118, innerR = 70;
  const gap = 0.02;
  // Minimum angle to show a label — skip only truly tiny slivers (< ~2°)
  const MIN_LABEL_ANGLE = 0.04;

  let cursor = -Math.PI / 2;
  const rawSlices = active.map((d) => {
    const angle = (d.value / total) * (2 * Math.PI) - gap;
    const a1 = cursor, a2 = cursor + angle;
    cursor += angle + gap;
    const large = angle > Math.PI ? 1 : 0;
    const ox1 = cx + outerR * Math.cos(a1), oy1 = cy + outerR * Math.sin(a1);
    const ox2 = cx + outerR * Math.cos(a2), oy2 = cy + outerR * Math.sin(a2);
    const ix1 = cx + innerR * Math.cos(a1), iy1 = cy + innerR * Math.sin(a1);
    const ix2 = cx + innerR * Math.cos(a2), iy2 = cy + innerR * Math.sin(a2);
    const path = `M ${ox1.toFixed(2)} ${oy1.toFixed(2)} A ${outerR} ${outerR} 0 ${large} 1 ${ox2.toFixed(2)} ${oy2.toFixed(2)} L ${ix2.toFixed(2)} ${iy2.toFixed(2)} A ${innerR} ${innerR} 0 ${large} 0 ${ix1.toFixed(2)} ${iy1.toFixed(2)} Z`;
    const mid = a1 + angle / 2;
    const isRight = Math.cos(mid) >= 0;
    const p1x = cx + (outerR + 6) * Math.cos(mid);
    const p1y = cy + (outerR + 6) * Math.sin(mid);
    const p2x = cx + (outerR + 26) * Math.cos(mid);
    const p2y = cy + (outerR + 26) * Math.sin(mid);
    const p3x = p2x + (isRight ? 30 : -30);
    const p3y = p2y;
    const color = COUNTRY_COLORS[d.label] ?? "#CCCCCC";
    return { path, p1x, p1y, p2x, p2y, p3x, p3y, isRight, angle, mid, color, ...d };
  });

  // Separate left/right and resolve vertical overlaps per side
  const LABEL_H = 13;
  const resolveOverlaps = (items: typeof rawSlices) => {
    const sorted = [...items].sort((a, b) => a.p3y - b.p3y);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].p3y - sorted[i - 1].p3y < LABEL_H) {
        sorted[i] = { ...sorted[i], p3y: sorted[i - 1].p3y + LABEL_H };
      }
    }
    return sorted;
  };

  const labeled = rawSlices.filter((s) => s.angle >= MIN_LABEL_ANGLE);
  const rightLabels = resolveOverlaps(labeled.filter((s) => s.isRight));
  const leftLabels = resolveOverlaps(labeled.filter((s) => !s.isRight));
  const slices = rawSlices.map((s) => {
    const resolved = [...rightLabels, ...leftLabels].find((r) => r.label === s.label);
    return resolved ?? s;
  });

  return (
    <svg viewBox="0 0 460 340" className="w-4/5 mx-auto block" overflow="visible">
      {slices.map((s, i) => {
        const isSmall = s.angle < MIN_LABEL_ANGLE;
        const isHovered = hovered === s.label;
        // Tooltip position: just outside the slice midpoint
        const tipCx = cx + (outerR + 48) * Math.cos(s.mid);
        const tipCy = cy + (outerR + 48) * Math.sin(s.mid);
        const tipW = 72, tipH = 20;
        const tipX = Math.min(Math.max(tipCx - tipW / 2, 2), 460 - tipW - 2);
        const tipY = tipCy - tipH / 2;
        return (
        <g key={i}>
          <path
            d={s.path}
            fill={s.color}
            onMouseEnter={() => setHovered(s.label)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: isSmall ? "pointer" : "default" }}
          />
          {isSmall && isHovered && (
            <g>
              <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="2" fill="#1C1C1C" />
              <text x={tipX + tipW / 2} y={tipCy} textAnchor="middle" dominantBaseline="central"
                fontSize="8.5" fontFamily="ui-monospace,monospace" fontWeight="500" fill="#FFEC40">
                {s.label} · {s.value}
              </text>
            </g>
          )}
          {s.angle >= MIN_LABEL_ANGLE && (
            <>
              <polyline
                points={`${s.p1x.toFixed(1)},${s.p1y.toFixed(1)} ${s.p2x.toFixed(1)},${s.p2y.toFixed(1)} ${s.p3x.toFixed(1)},${s.p3y.toFixed(1)}`}
                fill="none" stroke="#00000030" strokeWidth="0.8"
              />
              <text
                x={s.p3x + (s.isRight ? 4 : -4)}
                y={s.p3y}
                textAnchor={s.isRight ? "start" : "end"}
                dominantBaseline="central"
                fontSize="9.5"
                fontFamily="ui-monospace,monospace"
                fontWeight="500"
                fill="#000000aa"
              >
                {s.label} · {s.value}
              </text>
            </>
          )}
        </g>
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fontFamily="ui-monospace,monospace" fill="#00000045" fontWeight="500">TOTAL</text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize="17" fontFamily="ui-monospace,monospace" fill="#000000" fontWeight="600">{total}</text>
    </svg>
  );
}

function CountryByBatchChart({
  countryByBatch,
  batchLabels,
}: {
  countryByBatch: Record<string, number[]>;
  batchLabels: string[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);

  const switchBatch = (i: number) => {
    if (i === activeIdx) return;
    setFading(true);
    setTimeout(() => {
      setDisplayIdx(i);
      setActiveIdx(i);
      setFading(false);
    }, 120);
  };

  const batchData = Object.entries(countryByBatch)
    .map(([label, vals]) => ({ label, value: vals[displayIdx] }));

  return (
    <div>
      <div className="flex gap-1 mb-6 flex-wrap">
        {batchLabels.map((b, i) => (
          <button
            key={b}
            onClick={() => switchBatch(i)}
            className={`px-3 py-1.5 rounded-full font-mono font-medium text-xs uppercase tracking-wider transition-colors duration-150 cursor-pointer ${
              activeIdx === i
                ? "bg-[#474402] text-[#FFEC40]"
                : "bg-black/5 text-black/40 hover:text-black hover:bg-black/10"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
      <div style={{ opacity: fading ? 0 : 1, transition: "opacity 120ms" }}>
        <CountryPieChart data={batchData} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function TrackRecordContent() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const lpTypes = [
    { label: "FFOO", count: 13, amount: 9_730_000 },
    { label: "HNWI", count: 26, amount: 2_662_867 },
    { label: "Founders", count: 35, amount: 1_964_867 },
    { label: "CORP", count: 4, amount: 1_398_867 },
    { label: "GP/VC", count: 6, amount: 385_000 },
  ];
  const batches = [
    { label: "2020", value: 4 },
    { label: "21-I", value: 5 },
    { label: "21-II", value: 5 },
    { label: "22-I", value: 15 },
    { label: "22-II", value: 12 },
    { label: "23-I", value: 15 },
    { label: "23-II", value: 16 },
    { label: "24-I", value: 13 },
    { label: "24-II", value: 12 },
  ];

  const countries = [
    { label: "Chile", value: 51 },
    { label: "Mexico", value: 30 },
    { label: "Colombia", value: 15 },
    { label: "Peru", value: 6 },
    { label: "Argentina", value: 6 },
    { label: "Ecuador", value: 2 },
    { label: "España", value: 1 },
    { label: "Guatemala", value: 1 },
    { label: "Uruguay", value: 1 },
    { label: "USA", value: 1 },
  ];
  const industries = [
    { label: "AI", value: 19 },
    { label: "Fintech", value: 13 },
    { label: "SaaS", value: 11 },
    { label: "E-commerce", value: 11 },
    { label: "Proptech", value: 7 },
    { label: "Regtech", value: 6 },
    { label: "Logistics", value: 5 },
    { label: "Healthtech", value: 5 },
    { label: "EdTech", value: 5 },
    { label: "Creators Economy", value: 4 },
    { label: "HRTech", value: 4 },
    { label: "Dev Tools", value: 3 },
    { label: "Foodtech", value: 3 },
    { label: "Insurtech", value: 2 },
    { label: "Crypto", value: 2 },
    { label: "PetCare", value: 2 },
    { label: "Data", value: 2 },
    { label: "Climatech", value: 1 },
    { label: "Web3", value: 1 },
    { label: "Travels", value: 1 },
    { label: "Otros", value: 7 },
  ];
  const industryByBatch: Record<string, number[]> = {
    "AI":                 [0, 0, 0, 1, 1, 2, 7, 3, 1],
    "Fintech":            [2, 2, 2, 2, 0, 1, 1, 1, 0],
    "SaaS":               [0, 0, 0, 1, 0, 3, 3, 2, 2],
    "E-commerce":         [1, 1, 0, 2, 2, 1, 0, 2, 0],
    "Proptech":           [0, 0, 0, 2, 3, 1, 0, 0, 0],
    "Regtech":            [0, 0, 1, 0, 0, 0, 1, 0, 2],
    "Logistics":          [0, 0, 0, 1, 1, 0, 0, 1, 2],
    "Healthtech":         [0, 1, 0, 0, 1, 0, 0, 2, 1],
    "EdTech":             [0, 0, 0, 2, 0, 1, 1, 0, 0],
    "HRTech":             [0, 0, 0, 1, 1, 1, 1, 0, 0],
    "Creators Economy":   [0, 0, 2, 1, 1, 0, 0, 0, 0],
    "Dev Tools":          [0, 0, 0, 1, 0, 2, 0, 0, 0],
    "Foodtech":           [0, 0, 0, 0, 2, 0, 1, 0, 0],
    "Insurtech":          [0, 1, 0, 0, 0, 0, 1, 0, 0],
    "Otros":              [1, 0, 0, 1, 0, 3, 0, 2, 3],
  };

  const countryByBatch: Record<string, number[]> = {
    Chile:    [5, 5, 3, 8, 5, 6, 6, 3, 4],
    Mexico:   [0, 0, 1, 4, 5, 1, 3, 7, 4],
    Colombia: [0, 0, 0, 1, 1, 3, 4, 1, 2],
    Peru:     [0, 0, 0, 1, 0, 2, 1, 1, 0],
    Argentina:[0, 0, 1, 0, 1, 1, 2, 0, 1],
    Ecuador:  [0, 0, 0, 1, 0, 0, 0, 1, 0],
    Otros:    [0, 0, 0, 0, 0, 2, 0, 0, 1],
  };

  const statusByBatch = [
    { label: "Active",  values: [3, 2.41, 3, 8, 7, 9, 11, 8, 11] },
    { label: "Closed",  values: [1, 2, 2, 5, 5, 5, 5, 5, 1] },
    { label: "Exited",  values: [0, 0.59, 0, 2, 0, 1, 0, 0, 0] },
  ];

  const growthByBatch = [
    { label: "Interesting", values: [1, 1, 1, 1, 1, 2, 3, 1, 5] },
    { label: "Slow growth", values: [1, 2, 0, 4, 5, 2, 3, 3, 4] },
    { label: "Stalled",     values: [1, 0, 2, 3, 1, 5, 5, 4, 2] },
    { label: "Closed",      values: [1, 2, 2, 5, 5, 5, 5, 5, 1] },
    { label: "Exited",      values: [0, 0, 0, 2, 0, 1, 0, 0, 0] },
  ];

  const arrRanges = [
    { label: "$1 – $50k",       values: [19, 18, 14, 6] },
    { label: "$51k – $100k",    values: [5, 9, 9, 6] },
    { label: "$101k – $250k",   values: [11, 15, 15, 14] },
    { label: "$251k – $500k",   values: [6, 7, 11, 11] },
    { label: "$501k – $750k",   values: [8, 5, 7, 6] },
    { label: "$751k – $1M",     values: [1, 4, 3, 8] },
    { label: "$1.1M – $1.5M",   values: [2, 3, 2, 6] },
    { label: "$1.51M – $2M",    values: [1, 2, 5, 1] },
    { label: "$2.1M – $5M",     values: [3, 1, 2, 5] },
    { label: "$5M – $10M",      values: [1, 2, 1, 1] },
    { label: "$10M+",           values: [0, 0, 1, 1] },
  ];
  const arrTotals = [57, 66, 70, 65];

  const batchLabels = ["20", "21-I", "21-II", "22-I", "22-II", "23-I", "23-II", "24-I", "24-II"];

  return (
    <Section id="track-record" badge="09" title="Track Record">

      {/* ── Intro ── */}
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          En esta sección primero mostraremos de forma general el estado de los fondos y el portafolio de Platanus, para luego hacer lo mismo por cada fondo.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Previo a Platanus Cavendish hemos levantado <span className="bg-[#FFEC40] px-1 text-black">tres fondos de inversión e invertido en 115 startups</span>. Los tres vehículos ya se encuentran cerrados y no están realizando más inversiones.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          El fondo Genesis fue retornado en menos de 2 años de su origen.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          De acuerdo a la data de Carta, los dos primeros fondos se encuentran sobre el{" "}
          <span className="bg-[#FFEC40] px-1 text-black">percentil 90</span> en términos de TVPI.
          En cuanto a DPI, para el vintage 2021, el percentil 90 ha distribuido un 0.13x — nuestro fondo Genesis está en{" "}
          <span className="bg-[#FFEC40] px-1 text-black">1.41x</span>. Solo un 24% de los fondos del vintage 2022 han repartido capital; nuestro Fund I se encuentra dentro de ese porcentaje.
        </p>
      </div>

      {/* ── Métricas generales ── */}
      <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Métricas generales
      </h3>
      <div className="overflow-x-auto mb-10" onMouseLeave={() => setHoveredCol(null)}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-black/10">
              <th className="text-left font-mono font-medium text-black/40 text-xs uppercase tracking-wider pb-3 pr-6 min-w-[140px]"></th>
              {(["SPV", "Genesis", "Fund I", "Total"] as const).map((col, ci) => (
                <th
                  key={col}
                  onMouseEnter={() => setHoveredCol(ci)}
                  className={`text-right font-mono font-medium text-xs uppercase tracking-wider pb-3 pr-6 cursor-default select-none transition-colors duration-150 ${
                    hoveredCol === null
                      ? ci === 3 ? "text-black" : "text-black/40"
                      : hoveredCol === ci
                        ? "text-black"
                        : "text-black/20"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Vintage row */}
            <tr className="border-b border-black/10">
              <td className="font-sans font-medium text-black text-sm py-2.5 pr-6">Vintage</td>
              {(["2020", "2021", "2022", "—"] as const).map((v, ci) => (
                <td
                  key={ci}
                  onMouseEnter={() => setHoveredCol(ci)}
                  className={`font-mono font-medium text-sm py-2.5 text-right pr-6 transition-all duration-150 ${
                    hoveredCol === null
                      ? "text-black/60 bg-transparent"
                      : hoveredCol === ci
                        ? "text-black bg-[#FFEC40]"
                        : "text-black/20 bg-transparent"
                  }`}
                >
                  {v}
                </td>
              ))}
            </tr>
            {/* Data rows */}
            {[
              { label: "Committed Amount", values: ["$206,600", "$650,000", "$15,285,013", "$16,141,613"] },
              { label: "Called Amount", values: ["$206,600", "$650,000", "$15,285,013", "$16,141,613"] },
              { label: "Total Invested", values: ["$211,600", "$535,000", "$11,747,214", "$12,493,814"] },
              { label: "Total Realized Value", values: ["$5,000", "$1,136,516", "$867,499", "$2,009,015"] },
              { label: "Total Unrealized Value", values: ["$944,773", "$3,860,000", "$15,259,710", "$20,064,483"] },
              { label: "Net Distributions", values: ["$0", "$914,915", "$294,350", "$1,209,265"] },
              { label: "Total Value", values: ["$944,773", "$4,774,915", "$15,554,060", "$21,273,748"] },
              { label: "MOIC", values: ["4.49x", "9.34x", "1.37x", "1.7x"], highlight: true },
              { label: "RVPI", values: ["4.57x", "5.94x", "1x", "1.24x"], highlight: true },
              { label: "DPI", values: ["0x", "1.41x", "0.02x", "0.07x"], highlight: true },
              { label: "TVPI", values: ["4.57x", "7.35x", "1.02x", "1.32x"], highlight: true },
            ].map((row) => (
              <tr key={row.label} className="border-b border-black/10">
                <td className="font-sans font-medium text-black text-sm py-2.5 pr-6">{row.label}</td>
                {row.values.map((v, ci) => (
                  <td
                    key={ci}
                    onMouseEnter={() => setHoveredCol(ci)}
                    className={`font-mono uppercase font-medium text-sm py-2.5 text-right pr-6 transition-all duration-150 ${
                      hoveredCol === null
                        ? row.highlight ? "text-black bg-transparent" : "text-black/60 bg-transparent"
                        : hoveredCol === ci
                          ? "text-black bg-[#FFEC40]"
                          : "text-black/20 bg-transparent"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Limited Partners ── */}
      <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Limited Partners
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6">
        92 Limited Partners han sido parte de estos tres fondos, distribuidos en las siguientes categorías:
      </p>
      <div className="mb-10">
        <LpPieChart data={lpTypes} />
      </div>

      {/* ── Portafolio ── */}
      <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Portafolio
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6">
        Los tres fondos han invertido en total <span className="bg-[#FFEC40] px-1 text-black">$12,493,814</span> en 115 startups, concentrándose la mayor parte en Fund I. Las inversiones se distribuyen en 97 a través del programa de aceleración y 18 como oportunidades.
      </p>

      {/* Fund tabs + metrics */}
      <FundMetrics />

      {/* Batches bar chart */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Startups invertidas en cada Batch del programa de aceleración
      </h4>
      <div className="mb-10">
        <BatchChart data={batches} />
      </div>

      {/* Countries bar chart */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Países del portafolio
      </h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Los dos primeros años de Platanus fueron prácticamente chilenos. Actualmente Chile representa menos de la mitad del portafolio general.
      </p>
      <div className="mb-6">
        <CountryPieChart data={countries} />
      </div>

      {/* Countries by batch */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Países por batch
      </h4>
      <div className="mb-10">
        <CountryByBatchChart countryByBatch={countryByBatch} batchLabels={batchLabels} />
      </div>

      {/* Industries bar chart */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Industrias de todo el portafolio
      </h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        No nos hemos separado mucho del resto de las inversiones de Latam. La tendencia de AI entró fuerte en el portafolio desde el batch 23-I en adelante.
      </p>
      <div className="mb-6">
        <IndustryTreemap data={industries} />
      </div>

      {/* Industries by batch */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Industrias por batch
      </h4>
      <div className="mb-10">
        <IndustryByBatchChart industryByBatch={industryByBatch} batchLabels={batchLabels} />
      </div>

      {/* ── Estado del portafolio ── */}
      <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Estado del portafolio
      </h3>
      <div className="space-y-3 mb-6">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Para saber cómo vamos, el primer paso es saber cuántas del portafolio siguen activas, cerradas o hemos logrado un exit.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Las startups cerradas son aquellas que han formalizado su cierre o nos han informado la intención de no continuar con operaciones.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Hemos tenido dos exits con pago en cash, uno parcial de la startup Toku de Genesis Fund y un exit total de Bemmbo de Fund I. El tercer exit fue por intercambio de acciones.
        </p>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Activas", value: 78, pct: "67.83%", color: "#FFEC40" },
          { label: "Cerradas", value: 34, pct: "29.57%", color: "rgba(9,9,9,0.10)" },
          { label: "Exit", value: 3, pct: "2.61%", color: "#F9BC12" },
        ].map((s) => (
          <div key={s.label} className="border border-black/10 p-4 bg-black/5">
            <div className="w-full h-0.5 mb-3" style={{ backgroundColor: s.color }} />
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className="font-mono uppercase font-medium text-black text-4xl">{s.value}</p>
            <p className="font-sans font-medium text-black/40 text-xs mt-0.5">{s.pct}</p>
          </div>
        ))}
      </div>

      {/* Status by batch */}
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Otra forma interesante de ver el estado es en base a los batches. Destacamos el salto que tuvimos en el Batch 24-II, que fue cuando subimos el ticket de $100k a $200k.
      </p>
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Estado por batch
      </h4>
      <div className="mb-10">
        {batchLabels.map((bLabel, bIdx) => (
          <StackedBar
            key={bLabel}
            rowLabel={bLabel}
            segments={STATUS_SEGMENTS(
              statusByBatch[0].values[bIdx],
              statusByBatch[1].values[bIdx],
              statusByBatch[2].values[bIdx],
            )}
          />
        ))}
      </div>

      {/* ── Crecimiento ── */}
      <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Crecimiento del portafolio
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        El hecho de que más startups estén activas no se refleja en un mayor desempeño del portafolio. Para eso hemos decidido clasificar las startups según sus ingresos en:
      </p>
      <div className="space-y-2 mb-6">
        {[
          {
            label: "Interesting",
            color: "#FFEC40",
            desc: "Con ingreso mensual sobre $10.000 además de un crecimiento sostenido mes a mes. Agregamos también las que vemos potencial para llegar prontamente a esos ingresos y crecimiento. De aquí deben salir las startups que compongan el 10% del portafolio que de los retornos del fondo.",
          },
          {
            label: "Slow Growth",
            color: "rgba(255,236,64,0.4)",
            desc: "Con una tasa de crecimiento positiva, pero baja y poco interesante para lograr los retornos que busca el fondo. Esperamos un retorno de entre 1x a 10x.",
          },
          {
            label: "Stalled",
            color: "rgba(0,0,0,0.15)",
            desc: "Sin crecimiento en los últimos meses. Esperamos un retorno menor a 1x.",
          },
          {
            label: "Closed",
            color: "rgba(0,0,0,0.06)",
            desc: "Cerradas o con la decisión de cerrar en el corto plazo. Pérdida o retorno no sustancial.",
          },
          {
            label: "Exited",
            color: "#F9BC12",
            desc: "Aquellas en las que vendimos completamente nuestras acciones, ya sea por cash o a cambio de una inversión en la empresa compradora.",
          },
        ].map((cat) => (
          <div key={cat.label} className="flex items-start gap-3">
            <div className="w-3 h-3 shrink-0 mt-0.5" style={{ backgroundColor: cat.color }} />
            <div>
              <span className="font-mono font-medium text-black/60 text-xs uppercase tracking-wider">{cat.label}</span>
              <span className="font-sans font-medium text-black/60 text-sm"> — {cat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth by fund stacked bars */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Crecimiento por fondo
      </h4>
      <div className="mb-6">
        <GrowthBar label="SPV" interesting={2} slowGrowth={1} stalled={1} closed={1} exited={0} total={5} />
        <GrowthBar label="Genesis" interesting={3} slowGrowth={2} stalled={2} closed={4} exited={0} total={11} />
        <GrowthBar label="Fund I" interesting={19} slowGrowth={26} stalled={22} closed={29} exited={3} total={99} />
        <GrowthBar label="Total" interesting={24} slowGrowth={29} stalled={25} closed={34} exited={3} total={115} />
      </div>

      {/* Growth by batch */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        Crecimiento por batch
      </h4>
      <div className="mb-10">
        {batchLabels.map((bLabel, bIdx) => (
          <StackedBar
            key={bLabel}
            rowLabel={bLabel}
            segments={GROWTH_SEGMENTS(
              growthByBatch[0].values[bIdx],
              growthByBatch[1].values[bIdx],
              growthByBatch[2].values[bIdx],
              growthByBatch[3].values[bIdx],
              growthByBatch[4].values[bIdx],
            )}
          />
        ))}
      </div>

      {/* ARR Range chart */}
      <h4 className="mt-8 font-mono font-medium text-black/80 text-sm uppercase tracking-wider mb-3">
        ARR del portafolio en el tiempo
      </h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6">
        Por último, una buena forma de ver el desarrollo del portafolio es ver cuántas startups están sobrepasando rangos de ingresos anualizados. El movimiento es claro, el portafolio va creciendo.
      </p>
      <div className="mb-10">
        <ArrGroupedChart
          ranges={arrRanges}
          quarters={["Q2 2024", "Q4 2024", "Q2 2025", "Q4 2025"]}
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* ── Fund Details ── */}
      {/* ════════════════════════════════════════════════════════════════════════ */}

      {/* ── SPV ── */}
      <div className="border-t border-black/10 pt-10 mt-2">
        <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
          Primer vehículo — SPV
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <MetricCard label="Nombre" value="Platanus Ventures SpA GEN 1 C.p.A." />
          <MetricCard label="Vintage" value="2020" />
          <MetricCard label="Jurisdicción" value="Chile" />
          <MetricCard label="Entidad legal" value="Comandita por acciones" />
          <MetricCard label="Tiempo" value="10 años" />
          <MetricCard label="Startups destacadas" value="Fintoc, Reversso" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "MOIC", value: "4.49x" },
            { label: "TVPI", value: "4.57x" },
            { label: "RVPI", value: "4.57x" },
            { label: "DPI", value: "0x" },
          ].map((m) => (
            <div key={m.label} className="border border-black/10 p-4 bg-black/5">
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-mono uppercase font-medium text-black text-3xl">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
          Entidad legal para financiar el primer Batch de Platanus (2020). Se levantó ~$206k entre tres inversionistas en un Special Purpose Vehicle. No se cobraron management fees ni se reservó capital para costos. El portafolio es de cinco startups: cuatro del programa de aceleración y una oportunidad, todas chilenas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">LPs</h4>
            {[
              { label: "Founders", count: 1, amount: 68_867 },
              { label: "HNWI", count: 1, amount: 68_867 },
              { label: "CORP", count: 1, amount: 68_867 },
            ].map((lp) => (
              <HBarMoney key={lp.label} label={lp.label} value={lp.amount} max={68_867} count={lp.count} />
            ))}
          </div>
          <div>
            <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">Industrias</h4>
            {[
              { label: "Fintech", value: 2 },
              { label: "E-commerce", value: 1 },
              { label: "Regtech", value: 1 },
              { label: "Travels", value: 1 },
            ].map((ind) => (
              <HBar key={ind.label} label={ind.label} value={ind.value} max={2} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Activas", value: 4, pct: "80%" },
            { label: "Cerradas", value: 1, pct: "20%" },
            { label: "Exit", value: 0, pct: "0%" },
          ].map((s) => (
            <div key={s.label} className="border border-black/10 p-3 bg-black/5">
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
              <p className="font-mono uppercase font-medium text-black text-4xl">{s.value}</p>
              <p className="font-sans font-medium text-black/40 text-xs">{s.pct}</p>
            </div>
          ))}
        </div>
        <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3 mt-6">Crecimiento</h4>
        <div className="mb-2">
          <GrowthBar label="SPV" interesting={2} slowGrowth={1} stalled={1} closed={1} exited={0} total={5} />
        </div>
      </div>

      {/* ── Genesis Fund ── */}
      <div className="border-t border-black/10 pt-10 mt-8">
        <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
          Segundo vehículo — Genesis Fund
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <MetricCard label="Nombre" value="PV2021 SpA" />
          <MetricCard label="Vintage" value="2021" />
          <MetricCard label="Jurisdicción" value="Chile" />
          <MetricCard label="Entidad legal" value="Sociedad por acciones" />
          <MetricCard label="Tiempo" value="10 años" />
          <MetricCard label="Startups destacadas" value="Toku, Plutto" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "MOIC", value: "9.34x" },
            { label: "TVPI", value: "7.35x" },
            { label: "RVPI", value: "5.94x" },
            { label: "DPI", value: "1.41x" },
          ].map((m) => (
            <div key={m.label} className="border border-black/10 p-4 bg-black/5">
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-mono uppercase font-medium text-black text-xl">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
          Tras una buena primera generación, se armó una SpA en Chile con acciones Serie A (solo derechos económicos, suscritas por inversionistas) y Serie B (administración + 30% dividendos, suscritas por Platanus). Se recaudaron $650k entre 11 inversionistas para dos generaciones del programa (21-I y 21-II).
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
          Ticket de $50k por el 7% vía Safe post-money con Valuation CAP de $714.286. Primer fondo con inversiones fuera de Chile: una startup de México y otra de Argentina.
        </p>
        <Callout>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            En diciembre de 2022 logramos vender secundarias de Toku en su Serie A, dejando el DPI en{" "}
            <span className="bg-[#FFEC40] px-1 text-black">1.41x</span>. El fondo todavía mantiene 1.43% en Toku además de una buena participación en Plutto.
          </p>
        </Callout>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
          <div>
            <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">LPs</h4>
            {[
              { label: "FFOO", count: 1, amount: 370_000 },
              { label: "Founders", count: 5, amount: 160_000 },
              { label: "CORP", count: 1, amount: 100_000 },
              { label: "HNWI", count: 2, amount: 10_000 },
              { label: "GP/VC", count: 1, amount: 10_000 },
            ].map((lp) => (
              <HBarMoney key={lp.label} label={lp.label} value={lp.amount} max={370_000} count={lp.count} />
            ))}
          </div>
          <div>
            <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">Industrias</h4>
            {[
              { label: "Fintech", value: 4 },
              { label: "Creators Econ.", value: 2 },
              { label: "Insurtech", value: 1 },
              { label: "Healthtech", value: 1 },
              { label: "E-commerce", value: 1 },
              { label: "Regtech", value: 1 },
              { label: "AI", value: 1 },
            ].map((ind) => (
              <HBar key={ind.label} label={ind.label} value={ind.value} max={4} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Activas", value: 7, pct: "63.64%" },
            { label: "Cerradas", value: 4, pct: "36.36%" },
            { label: "Exit", value: 0, pct: "0%" },
          ].map((s) => (
            <div key={s.label} className="border border-black/10 p-3 bg-black/5">
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
              <p className="font-mono uppercase font-medium text-black text-lg">{s.value}</p>
              <p className="font-sans font-medium text-black/40 text-xs">{s.pct}</p>
            </div>
          ))}
        </div>
        <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3 mt-6">Crecimiento</h4>
        <div className="mb-2">
          <GrowthBar label="Genesis" interesting={3} slowGrowth={2} stalled={2} closed={4} exited={0} total={11} />
        </div>
      </div>

      {/* ── Fund I ── */}
      <div className="border-t border-black/10 pt-10 mt-8">
        <h3 className="font-sans font-medium text-black mt-10 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
          Tercer vehículo — Fund I
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <MetricCard label="Nombre" value="Platanus Ventures Fund II LP*" />
          <MetricCard label="Inicio" value="27 de abril de 2022" />
          <MetricCard label="Jurisdicción" value="Ontario, Canadá" />
          <MetricCard label="Entidad legal" value="Limited Partnership" />
          <MetricCard label="Tiempo" value="10 años + 3 prórrogas" />
          <MetricCard label="Startups destacadas" value="Bemmbo (exit)" />
        </div>
        <p className="font-sans font-medium text-black/40 text-xs leading-relaxed mb-4">
          * El nombre legal es Fund II, pero de conformidad a la costumbre de la industria es más correcto denominarlo Fondo I.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "MOIC", value: "1.37x" },
            { label: "TVPI", value: "1.02x" },
            { label: "RVPI", value: "1x" },
            { label: "DPI", value: "0.02x" },
          ].map((m) => (
            <div key={m.label} className="border border-black/10 p-4 bg-black/5">
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-mono uppercase font-medium text-black text-4xl">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
          En octubre de 2021 decidimos expandirnos formalmente a todo Latam. Objetivo: levantar $15 millones, subir el ticket a $100k por el 7% vía Safe post-money con Valuation CAP de $1,428,571.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
          Primer cierre en abril 2022 por $9,436,000 a través de 38 inversionistas. Cierre final el 31 de mayo de 2023 por ~$15 millones con 79 inversionistas. Los abogados son Davies Ward Phillips &amp; Vineberg LLP y los auditores Weaver.
        </p>
        <Callout>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Para markup del portafolio se considera cualquier startup que haya levantado una ronda de más de $300k, independiente de si es con valor convertible o emisión de acciones.
          </p>
        </Callout>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
          <div>
            <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">LPs (79)</h4>
            {[
              { label: "FFOO", count: 13, amount: 9_360_000 },
              { label: "HNWI", count: 25, amount: 2_584_000 },
              { label: "Founders", count: 33, amount: 1_736_000 },
              { label: "CORP", count: 3, amount: 1_230_000 },
              { label: "GP/VC", count: 5, amount: 375_000 },
            ].map((lp) => (
              <HBarMoney key={lp.label} label={lp.label} value={lp.amount} max={9_360_000} count={lp.count} />
            ))}
          </div>
          <div>
            <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">Países (99 startups)</h4>
            {[
              { label: "Chile", value: 38 },
              { label: "Mexico", value: 29 },
              { label: "Colombia", value: 15 },
              { label: "Peru", value: 6 },
              { label: "Argentina", value: 5 },
              { label: "Otros", value: 6 },
            ].map((c) => (
              <HBar key={c.label} label={c.label} value={c.value} max={38} />
            ))}
          </div>
        </div>
        <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3">Industrias principales</h4>
        <div className="mb-6">
          {[
            { label: "AI", value: 18 },
            { label: "SaaS", value: 11 },
            { label: "E-commerce", value: 9 },
            { label: "Fintech", value: 7 },
            { label: "Proptech", value: 7 },
            { label: "Regtech", value: 5 },
            { label: "Logistics", value: 5 },
            { label: "Healthtech", value: 4 },
            { label: "EdTech", value: 5 },
            { label: "HRTech", value: 4 },
            { label: "Otros", value: 23 },
          ].map((ind) => (
            <HBar key={ind.label} label={ind.label} value={ind.value} max={23} />
          ))}
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
          Este fondo fue modelado con una tasa de fracaso del 70%, lejos de la actual tasa de ~30%. El crecimiento del portafolio no ha sido tan explosivo como los dos fondos anteriores, pero ya comienza a destacarse un grupo de startups que debería traer los retornos necesarios para ser un fondo exitoso.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Activas", value: 67, pct: "67.68%" },
            { label: "Cerradas", value: 29, pct: "29.29%" },
            { label: "Exit", value: 3, pct: "3.03%" },
          ].map((s) => (
            <div key={s.label} className="border border-black/10 p-3 bg-black/5">
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
              <p className="font-mono uppercase font-medium text-black text-4xl">{s.value}</p>
              <p className="font-sans font-medium text-black/40 text-xs">{s.pct}</p>
            </div>
          ))}
        </div>
        <h4 className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-3 mt-6">Crecimiento</h4>
        <div className="mb-2">
          <GrowthBar label="Fund I" interesting={19} slowGrowth={26} stalled={22} closed={29} exited={3} total={99} />
        </div>
      </div>
    </Section>
  );
}

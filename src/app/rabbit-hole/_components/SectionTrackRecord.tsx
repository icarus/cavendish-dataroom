import { Callout } from "./Callout";

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
    <div className="flex items-center gap-4 py-2.5 border-b border-white/10 last:border-0">
      <div className="w-36 shrink-0">
        <p className="font-sans font-medium text-white/70 text-sm leading-snug">{label}</p>
        {sublabel && <p className="font-sans font-medium text-white/40 text-xs mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-white/10 h-1.5">
          <div style={{ width: `${pct}%`, backgroundColor: color }} className="h-full" />
        </div>
        <span className="font-mono font-medium text-white/70 text-sm w-10 text-right shrink-0">{value}</span>
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
    <div className="flex items-center gap-4 py-2.5 border-b border-white/10 last:border-0">
      <div className="w-36 shrink-0">
        <p className="font-sans font-medium text-white/70 text-sm leading-snug">{label}</p>
        <p className="font-sans font-medium text-white/40 text-xs mt-0.5">{count} LP{count !== 1 ? "s" : ""}</p>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 bg-white/10 h-1.5">
          <div style={{ width: `${pct}%` }} className="h-full bg-[#FFEC40]" />
        </div>
        <span className="font-mono font-medium text-white/70 text-sm w-14 text-right shrink-0">{fmt}</span>
      </div>
    </div>
  );
}

function VBars({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5 h-28">
      {data.map((d) => {
        const pct = Math.round((d.value / max) * 100);
        return (
          <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="font-mono font-medium text-white/40 text-xs">{d.value}</span>
            <div className="w-full bg-white/10 relative" style={{ height: "72px" }}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#FFEC40]"
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="font-mono font-medium text-white/40 text-xs leading-tight text-center">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function GrowthBar({
  interesting,
  slowGrowth,
  stalled,
  closed,
  exited,
  total,
  label,
}: {
  interesting: number;
  slowGrowth: number;
  stalled: number;
  closed: number;
  exited: number;
  total: number;
  label: string;
}) {
  const seg = (n: number) => `${Math.round((n / total) * 100)}%`;
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-1.5">
        <span className="font-mono font-medium text-white/40 text-xs w-20 shrink-0">{label}</span>
        <div className="flex-1 flex h-5 gap-px overflow-hidden">
          <div style={{ width: seg(interesting), backgroundColor: "#FFEC40" }} title={`Interesting: ${interesting}`} />
          <div style={{ width: seg(slowGrowth), backgroundColor: "rgba(255,236,64,0.4)" }} title={`Slow growth: ${slowGrowth}`} />
          <div style={{ width: seg(stalled), backgroundColor: "rgba(255,255,255,0.25)" }} title={`Stalled: ${stalled}`} />
          <div style={{ width: seg(closed), backgroundColor: "rgba(255,255,255,0.08)" }} title={`Closed: ${closed}`} />
          {exited > 0 && (
            <div style={{ width: seg(exited), backgroundColor: "#F9BC12" }} title={`Exited: ${exited}`} />
          )}
        </div>
        <span className="font-mono font-medium text-white/40 text-xs w-6 text-right shrink-0">{total}</span>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 p-4 bg-white/5">
      <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="font-sans font-medium text-white text-sm">{value}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function SectionTrackRecord() {
  const lpTypes = [
    { label: "FFOO", count: 13, amount: 9_730_000 },
    { label: "HNWI", count: 26, amount: 2_662_867 },
    { label: "Founders", count: 35, amount: 1_964_867 },
    { label: "CORP", count: 4, amount: 1_398_867 },
    { label: "GP/VC", count: 6, amount: 385_000 },
  ];
  const maxLpAmount = Math.max(...lpTypes.map((l) => l.amount));

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
  const maxCountry = Math.max(...countries.map((c) => c.value));

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
  const maxIndustry = Math.max(...industries.map((i) => i.value));

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
    <section id="track-record" className="py-16 border-b border-white/10">
      <span className="inline-block bg-[#FFEC40] text-black font-mono font-medium text-base px-2 py-0.5 mb-4">08</span>
      <h2 className="font-sans font-medium text-white mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Track Record
      </h2>

      {/* ── Intro ── */}
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En esta sección primero mostraremos de forma general el estado de los fondos y el portafolio de Platanus, para luego hacer lo mismo por cada fondo.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Previo a Platanus Cavendish hemos levantado tres fondos de inversión e invertido en 114 startups. Los tres vehículos ya se encuentran cerrados y no están realizando más inversiones.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          El fondo Genesis fue retornado en menos de 2 años de su origen.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          De acuerdo a la data de Carta, los dos primeros fondos se encuentran sobre el{" "}
          <span className="bg-[#FFEC40] px-1 text-black">percentil 90</span> en términos de TVPI.
          En cuanto a DPI, para el vintage 2021, el percentil 90 ha distribuido un 0.13x — nuestro fondo Genesis está en{" "}
          <span className="bg-[#FFEC40] px-1 text-black">1.41x</span>. Solo un 24% de los fondos del vintage 2022 han repartido capital; nuestro Fund I se encuentra dentro de ese porcentaje.
        </p>
      </div>

      {/* ── Métricas generales ── */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Métricas generales
      </h3>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white/40 text-xs uppercase tracking-wider pb-3 pr-6 min-w-[140px]">Métrica</th>
              <th className="text-right font-mono font-medium text-white/40 text-xs uppercase tracking-wider pb-3 pr-6">SPV</th>
              <th className="text-right font-mono font-medium text-white/40 text-xs uppercase tracking-wider pb-3 pr-6">Genesis</th>
              <th className="text-right font-mono font-medium text-white/40 text-xs uppercase tracking-wider pb-3 pr-6">Fund I</th>
              <th className="text-right font-mono font-medium text-white text-xs uppercase tracking-wider pb-3">Total</th>
            </tr>
          </thead>
          <tbody>
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
              <tr key={row.label} className="border-b border-white/10">
                <td className="font-sans font-medium text-white/40 text-sm py-2.5 pr-6">{row.label}</td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`font-mono font-medium text-sm py-2.5 text-right pr-6 last:pr-0 ${
                      row.highlight ? "text-white" : "text-white/70"
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
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Limited Partners
      </h3>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-6">
        92 Limited Partners han sido parte de estos tres fondos.
      </p>
      <div className="mb-10">
        {lpTypes.map((lp) => (
          <HBarMoney key={lp.label} label={lp.label} value={lp.amount} max={maxLpAmount} count={lp.count} />
        ))}
      </div>

      {/* ── Portafolio ── */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Portafolio
      </h3>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-6">
        Los tres fondos han invertido en total <span className="bg-[#FFEC40] px-1 text-black">$12,493,814</span> en 114 startups, concentrándose la mayor parte en Fund I. Las inversiones se distribuyen en 97 a través del programa de aceleración y 18 como oportunidades.
      </p>

      {/* Fund cards */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { fund: "SPV", startups: 4, amount: "$211,600", type: "4 aceleración · 1 oportunidad" },
          { fund: "Genesis", startups: 11, amount: "$535,000", type: "10 aceleración · 1 oportunidad" },
          { fund: "Fund I", startups: 99, amount: "$11,747,214", type: "83 aceleración · 16 oportunidades" },
        ].map((f) => (
          <div key={f.fund} className="border border-white/10 p-4 bg-white/5">
            <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-2">{f.fund}</p>
            <p className="font-sans font-medium text-white text-2xl font-mono mb-1">{f.startups}</p>
            <p className="font-sans font-medium text-white/70 text-xs">{f.amount}</p>
            <p className="font-sans font-medium text-white/40 text-xs mt-0.5">{f.type}</p>
          </div>
        ))}
      </div>

      {/* Batches bar chart */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-4">
        Generaciones — programa de aceleración
      </h4>
      <div className="mb-10">
        <VBars data={batches} />
      </div>

      {/* Countries bar chart */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-4">
        Países del portafolio
      </h4>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
        Los dos primeros años de Platanus fueron prácticamente chilenos. Actualmente Chile representa menos de la mitad del portafolio general.
      </p>
      <div className="mb-6">
        {countries.map((c) => (
          <HBar key={c.label} label={c.label} value={c.value} max={maxCountry} />
        ))}
      </div>

      {/* Countries by batch table */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-3">
        Países por batch
      </h4>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white/40 pb-2 pr-4 min-w-[80px]">País</th>
              {batchLabels.map((b) => (
                <th key={b} className="font-mono font-medium text-white/40 pb-2 px-2 text-right">{b}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(countryByBatch).map(([country, vals]) => (
              <tr key={country} className="border-b border-white/10">
                <td className="font-sans font-medium text-white/70 py-2 pr-4">{country}</td>
                {vals.map((v, i) => (
                  <td key={i} className={`font-mono font-medium py-2 px-2 text-right ${v > 0 ? "text-white/70" : "text-white/20"}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Industries bar chart */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-4">
        Industrias del portafolio
      </h4>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
        No nos hemos separado mucho del resto de las inversiones de Latam. La tendencia de AI entró fuerte en el portafolio desde el batch 23-I en adelante.
      </p>
      <div className="mb-6">
        {industries.map((ind) => (
          <HBar key={ind.label} label={ind.label} value={ind.value} max={maxIndustry} />
        ))}
      </div>

      {/* Industries by batch table */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-3">
        Industrias por batch
      </h4>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white/40 pb-2 pr-4 min-w-[120px]">Industria</th>
              {batchLabels.map((b) => (
                <th key={b} className="font-mono font-medium text-white/40 pb-2 px-2 text-right">{b}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "AI",              values: [0, 0, 0, 1, 1, 2, 7, 3, 1] },
              { label: "Fintech",         values: [2, 2, 2, 2, 0, 1, 1, 1, 0] },
              { label: "SaaS",            values: [0, 0, 0, 1, 0, 3, 3, 2, 2] },
              { label: "E-commerce",      values: [1, 1, 0, 2, 2, 1, 0, 2, 0] },
              { label: "Proptech",        values: [0, 0, 0, 2, 3, 1, 0, 0, 0] },
              { label: "Regtech",         values: [0, 0, 1, 0, 0, 0, 1, 0, 2] },
              { label: "Logistics",       values: [0, 0, 0, 1, 1, 0, 0, 1, 2] },
              { label: "Healthtech",      values: [0, 1, 0, 0, 1, 0, 0, 2, 1] },
              { label: "EdTech",          values: [0, 0, 0, 2, 0, 1, 1, 0, 0] },
              { label: "HRTech",          values: [0, 0, 0, 1, 1, 1, 1, 0, 0] },
              { label: "Creators Econ.",  values: [0, 0, 2, 1, 1, 0, 0, 0, 0] },
              { label: "Dev Tools",       values: [0, 0, 0, 1, 0, 2, 0, 0, 0] },
              { label: "Foodtech",        values: [0, 0, 0, 0, 2, 0, 1, 0, 0] },
              { label: "Insurtech",       values: [0, 1, 0, 0, 0, 0, 1, 0, 0] },
              { label: "Otros",           values: [1, 0, 0, 1, 0, 3, 0, 2, 3] },
            ].map((row) => (
              <tr key={row.label} className="border-b border-white/10">
                <td className="font-sans font-medium text-white/70 py-2 pr-4">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className={`font-mono font-medium py-2 px-2 text-right ${v > 0 ? "text-white/70" : "text-white/20"}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Estado del portafolio ── */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Estado del portafolio
      </h3>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-6">
        Las startups cerradas son aquellas que han formalizado su cierre o nos han informado la intención de no continuar. Hemos tenido dos exits con pago en cash (Toku parcial y Bemmbo total) y un tercero por intercambio de acciones.
      </p>

      {/* Status overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Activas", value: 78, pct: "67.83%", color: "#FFEC40" },
          { label: "Cerradas", value: 34, pct: "29.57%", color: "rgba(255,255,255,0.2)" },
          { label: "Exit", value: 3, pct: "2.61%", color: "#F9BC12" },
        ].map((s) => (
          <div key={s.label} className="border border-white/10 p-4 bg-white/5">
            <div className="w-full h-0.5 mb-3" style={{ backgroundColor: s.color }} />
            <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className="font-mono font-medium text-white text-xl">{s.value}</p>
            <p className="font-sans font-medium text-white/40 text-xs mt-0.5">{s.pct}</p>
          </div>
        ))}
      </div>

      {/* Status by batch */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-3">
        Estado por batch
      </h4>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white/40 pb-2 pr-4 min-w-[80px]">Estado</th>
              {batchLabels.map((b) => (
                <th key={b} className="font-mono font-medium text-white/40 pb-2 px-2 text-right">{b}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statusByBatch.map((row) => (
              <tr key={row.label} className="border-b border-white/10">
                <td className="font-sans font-medium text-white/70 py-2 pr-4">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className={`font-mono font-medium py-2 px-2 text-right ${v > 0 ? "text-white/70" : "text-white/20"}`}>
                    {Number.isInteger(v) ? v : v.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-white/10 bg-white/5">
              <td className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider py-2 pr-4">Total</td>
              {batchLabels.map((_, i) => {
                const total = statusByBatch.reduce((sum, row) => sum + row.values[i], 0);
                return (
                  <td key={i} className="font-mono font-medium text-white/40 py-2 px-2 text-right">{Math.round(total)}</td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Crecimiento ── */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Crecimiento del portafolio
      </h3>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
        Clasificamos las startups según sus ingresos en cinco categorías:
      </p>
      <div className="space-y-2 mb-6">
        {[
          {
            label: "Interesting",
            color: "#FFEC40",
            desc: "MRR sobre $10k con crecimiento sostenido. De aquí deben salir las startups que componen el 10% del portafolio que genera los retornos del fondo.",
          },
          {
            label: "Slow growth",
            color: "rgba(255,236,64,0.4)",
            desc: "Crecimiento positivo pero bajo. Esperamos retorno de 1x–10x.",
          },
          {
            label: "Stalled",
            color: "rgba(255,255,255,0.25)",
            desc: "Sin crecimiento en los últimos meses. Retorno esperado menor a 1x.",
          },
          {
            label: "Closed",
            color: "rgba(255,255,255,0.08)",
            desc: "Cerradas o con decisión de cierre en el corto plazo.",
          },
          {
            label: "Exited",
            color: "#F9BC12",
            desc: "Vendimos completamente nuestras acciones, por cash o intercambio.",
          },
        ].map((cat) => (
          <div key={cat.label} className="flex items-start gap-3">
            <div className="w-3 h-3 shrink-0 mt-0.5" style={{ backgroundColor: cat.color }} />
            <div>
              <span className="font-mono font-medium text-white/70 text-xs uppercase tracking-wider">{cat.label}</span>
              <span className="font-sans font-medium text-white/40 text-xs"> — {cat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Growth by fund stacked bars */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-4">
        Crecimiento por fondo
      </h4>
      <div className="mb-6">
        <GrowthBar label="SPV" interesting={2} slowGrowth={1} stalled={1} closed={1} exited={0} total={5} />
        <GrowthBar label="Genesis" interesting={3} slowGrowth={2} stalled={2} closed={4} exited={0} total={11} />
        <GrowthBar label="Fund I" interesting={19} slowGrowth={26} stalled={22} closed={29} exited={3} total={99} />
        <GrowthBar label="Total" interesting={24} slowGrowth={29} stalled={25} closed={34} exited={3} total={115} />
      </div>

      {/* Growth by batch table */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-3">
        Crecimiento por batch
      </h4>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white/40 pb-2 pr-4 min-w-[100px]">Categoría</th>
              {batchLabels.map((b) => (
                <th key={b} className="font-mono font-medium text-white/40 pb-2 px-2 text-right">{b}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {growthByBatch.map((row) => (
              <tr key={row.label} className="border-b border-white/10">
                <td className="font-sans font-medium text-white/70 py-2 pr-4">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className={`font-mono font-medium py-2 px-2 text-right ${v > 0 ? "text-white/70" : "text-white/20"}`}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ARR Range table */}
      <h4 className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider mb-3">
        ARR del portafolio en el tiempo
      </h4>
      <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
        El movimiento es claro: el portafolio va creciendo. Más startups superan rangos más altos de ingresos anualizados con el tiempo.
      </p>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white/40 text-xs uppercase tracking-wider pb-3 pr-6 min-w-[130px]">ARR Range</th>
              {["Q2 2024", "Q4 2024", "Q2 2025", "Q4 2025"].map((q) => (
                <th key={q} className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider pb-3 px-3 text-right">{q}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {arrRanges.map((row) => {
              const maxVal = Math.max(...row.values);
              return (
                <tr key={row.label} className="border-b border-white/10">
                  <td className="font-sans font-medium text-white/70 text-sm py-2.5 pr-6">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`font-mono font-medium text-sm py-2.5 px-3 text-right ${
                        v === maxVal && maxVal > 0 ? "text-[#FFEC40]" : v > 0 ? "text-white/70" : "text-white/20"
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr className="bg-white/5">
              <td className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider py-2.5 pr-6">Total</td>
              {arrTotals.map((t, i) => (
                <td key={i} className="font-mono font-medium text-white/40 text-sm py-2.5 px-3 text-right">{t}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* ── Fund Details ── */}
      {/* ════════════════════════════════════════════════════════════════════════ */}

      {/* ── SPV ── */}
      <div className="border-t border-white/10 pt-10 mt-2">
        <h3 className="font-sans font-medium text-white/40 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
          Primer vehículo — SPV
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
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
            <div key={m.label} className="border border-white/10 p-4 bg-white/5">
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-mono font-medium text-white text-xl">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
          Entidad legal para financiar el primer Batch de Platanus (2020). Se levantó ~$206k entre tres inversionistas en un Special Purpose Vehicle. No se cobraron management fees ni se reservó capital para costos. El portafolio es de cinco startups: cuatro del programa de aceleración y una oportunidad, todas chilenas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">LPs</h4>
            {[
              { label: "Founders", count: 1, amount: 68_867 },
              { label: "HNWI", count: 1, amount: 68_867 },
              { label: "CORP", count: 1, amount: 68_867 },
            ].map((lp) => (
              <HBarMoney key={lp.label} label={lp.label} value={lp.amount} max={68_867} count={lp.count} />
            ))}
          </div>
          <div>
            <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">Industrias</h4>
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
            <div key={s.label} className="border border-white/10 p-3 bg-white/5">
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
              <p className="font-mono font-medium text-white text-lg">{s.value}</p>
              <p className="font-sans font-medium text-white/40 text-xs">{s.pct}</p>
            </div>
          ))}
        </div>
        <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3 mt-6">Crecimiento</h4>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {[
            { label: "Interesting", value: 2, color: "#FFEC40" },
            { label: "Slow growth", value: 1, color: "rgba(255,236,64,0.4)" },
            { label: "Stalled", value: 1, color: "rgba(255,255,255,0.25)" },
            { label: "Closed", value: 1, color: "rgba(255,255,255,0.08)" },
            { label: "Exited", value: 0, color: "#F9BC12" },
          ].map((cat) => (
            <div key={cat.label} className="border border-white/10 p-3 bg-white/5">
              <div className="w-full h-0.5 mb-2" style={{ backgroundColor: cat.color }} />
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider leading-tight mb-1">{cat.label}</p>
              <p className="font-mono font-medium text-white text-lg">{cat.value}</p>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <GrowthBar label="SPV" interesting={2} slowGrowth={1} stalled={1} closed={1} exited={0} total={5} />
        </div>
      </div>

      {/* ── Genesis Fund ── */}
      <div className="border-t border-white/10 pt-10 mt-8">
        <h3 className="font-sans font-medium text-white/40 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
          Segundo vehículo — Genesis Fund
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
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
            <div key={m.label} className="border border-white/10 p-4 bg-white/5">
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-mono font-medium text-white text-xl">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
          Tras una buena primera generación, se armó una SpA en Chile con acciones Serie A (solo derechos económicos, suscritas por inversionistas) y Serie B (administración + 30% dividendos, suscritas por Platanus). Se recaudaron $650k entre 11 inversionistas para dos generaciones del programa (21-I y 21-II).
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
          Ticket de $50k por el 7% vía Safe post-money con Valuation CAP de $714.286. Primer fondo con inversiones fuera de Chile: una startup de México y otra de Argentina.
        </p>
        <Callout>
          <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
            En diciembre de 2022 logramos vender secundarias de Toku en su Serie A, dejando el DPI en{" "}
            <span className="bg-[#FFEC40] px-1 text-black">1.41x</span>. El fondo todavía mantiene 1.43% en Toku además de una buena participación en Plutto.
          </p>
        </Callout>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
          <div>
            <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">LPs</h4>
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
            <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">Industrias</h4>
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
            <div key={s.label} className="border border-white/10 p-3 bg-white/5">
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
              <p className="font-mono font-medium text-white text-lg">{s.value}</p>
              <p className="font-sans font-medium text-white/40 text-xs">{s.pct}</p>
            </div>
          ))}
        </div>
        <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3 mt-6">Crecimiento</h4>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {[
            { label: "Interesting", value: 3, color: "#FFEC40" },
            { label: "Slow growth", value: 2, color: "rgba(255,236,64,0.4)" },
            { label: "Stalled", value: 2, color: "rgba(255,255,255,0.25)" },
            { label: "Closed", value: 4, color: "rgba(255,255,255,0.08)" },
            { label: "Exited", value: 0, color: "#F9BC12" },
          ].map((cat) => (
            <div key={cat.label} className="border border-white/10 p-3 bg-white/5">
              <div className="w-full h-0.5 mb-2" style={{ backgroundColor: cat.color }} />
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider leading-tight mb-1">{cat.label}</p>
              <p className="font-mono font-medium text-white text-lg">{cat.value}</p>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <GrowthBar label="Genesis" interesting={3} slowGrowth={2} stalled={2} closed={4} exited={0} total={11} />
        </div>
      </div>

      {/* ── Fund I ── */}
      <div className="border-t border-white/10 pt-10 mt-8">
        <h3 className="font-sans font-medium text-white/40 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
          Tercer vehículo — Fund I
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <MetricCard label="Nombre" value="Platanus Ventures Fund II LP*" />
          <MetricCard label="Inicio" value="27 de abril de 2022" />
          <MetricCard label="Jurisdicción" value="Ontario, Canadá" />
          <MetricCard label="Entidad legal" value="Limited Partnership" />
          <MetricCard label="Tiempo" value="10 años + 3 prórrogas" />
          <MetricCard label="Startups destacadas" value="Bemmbo (exit)" />
        </div>
        <p className="font-sans font-medium text-white/40 text-xs leading-relaxed mb-4">
          * El nombre legal es Fund II, pero de conformidad a la costumbre de la industria es más correcto denominarlo Fondo I.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "MOIC", value: "1.37x" },
            { label: "TVPI", value: "1.02x" },
            { label: "RVPI", value: "1x" },
            { label: "DPI", value: "0.02x" },
          ].map((m) => (
            <div key={m.label} className="border border-white/10 p-4 bg-white/5">
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{m.label}</p>
              <p className="font-mono font-medium text-white text-xl">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
          En octubre de 2021 decidimos expandirnos formalmente a todo Latam. Objetivo: levantar $15 millones, subir el ticket a $100k por el 7% vía Safe post-money con Valuation CAP de $1,428,571.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
          Primer cierre en abril 2022 por $9,436,000 a través de 38 inversionistas. Cierre final el 31 de mayo de 2023 por ~$15 millones con 79 inversionistas. Los abogados son Davies Ward Phillips &amp; Vineberg LLP y los auditores Weaver.
        </p>
        <Callout>
          <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
            Para markup del portafolio se considera cualquier startup que haya levantado una ronda de más de $300k, independiente de si es con valor convertible o emisión de acciones.
          </p>
        </Callout>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
          <div>
            <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">LPs (79)</h4>
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
            <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">Países (99 startups)</h4>
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
        <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3">Industrias principales</h4>
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
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-4">
          Este fondo fue modelado con una tasa de fracaso del 70%, lejos de la actual tasa de ~30%. El crecimiento del portafolio no ha sido tan explosivo como los dos fondos anteriores, pero ya comienza a destacarse un grupo de startups que debería traer los retornos necesarios para ser un fondo exitoso.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Activas", value: 67, pct: "67.68%" },
            { label: "Cerradas", value: 29, pct: "29.29%" },
            { label: "Exit", value: 3, pct: "3.03%" },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 p-3 bg-white/5">
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{s.label}</p>
              <p className="font-mono font-medium text-white text-lg">{s.value}</p>
              <p className="font-sans font-medium text-white/40 text-xs">{s.pct}</p>
            </div>
          ))}
        </div>
        <h4 className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-3 mt-6">Crecimiento</h4>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {[
            { label: "Interesting", value: 19, color: "#FFEC40" },
            { label: "Slow growth", value: 26, color: "rgba(255,236,64,0.4)" },
            { label: "Stalled", value: 22, color: "rgba(255,255,255,0.25)" },
            { label: "Closed", value: 29, color: "rgba(255,255,255,0.08)" },
            { label: "Exited", value: 3, color: "#F9BC12" },
          ].map((cat) => (
            <div key={cat.label} className="border border-white/10 p-3 bg-white/5">
              <div className="w-full h-0.5 mb-2" style={{ backgroundColor: cat.color }} />
              <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider leading-tight mb-1">{cat.label}</p>
              <p className="font-mono font-medium text-white text-lg">{cat.value}</p>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <GrowthBar label="Fund I" interesting={19} slowGrowth={26} stalled={22} closed={29} exited={3} total={99} />
        </div>
      </div>
    </section>
  );
}

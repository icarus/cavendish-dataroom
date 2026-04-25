"use client";

const bars = [
  { label: "Platanus", display: "$2,857,142", value: 2857142, platanus: true },
  { label: "High Pre Seed", display: "$6,000,000", value: 6000000 },
  { label: "Seed", display: "$15,000,000", value: 15000000 },
  { label: "Series A", display: "$35,000,000", value: 35000000 },
  { label: "Series B", display: "$120,000,000", value: 120000000 },
  { label: "Series C", display: "$250,000,000", value: 250000000 },
  { label: "Series D", display: "$800,000,000", value: 800000000 },
];

const MAX = 800000000;
const CHART_H = 280;

export function ValorizacionesChart() {
  return (
    <figure className="my-8 border border-black/10 p-6 bg-black/5">
      <p className="font-sans font-medium text-black/60 text-sm mb-6">
        Valorizaciones post money segun rondas
      </p>

      <div className="hidden sm:block">
        <div className="flex items-end gap-3" style={{ height: CHART_H }}>
          {bars.map((bar) => {
            const barH = Math.max(Math.round((bar.value / MAX) * CHART_H), 6);
            return (
              <div key={bar.label} className="flex flex-col items-center justify-end flex-1 h-full">
                <span className="font-mono uppercase font-medium text-black mb-1 leading-tight text-center" style={{ fontSize: "clamp(8px, 1vw, 11px)" }}>
                  {bar.display}
                </span>
                <div className={`w-full ${bar.platanus ? "bg-[#FFEC40]" : "bg-black/5"}`} style={{ height: barH }} />
              </div>
            );
          })}
        </div>
        <div className="border-t border-black/40 mt-0" />
        <div className="flex gap-3 mt-2">
          {bars.map((bar) => (
            <div key={bar.label} className="flex-1 text-center">
              <span className="font-mono uppercase font-medium text-black leading-tight text-center block" style={{ fontSize: "clamp(8px, 1vw, 11px)" }}>
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden flex flex-col gap-2">
        {bars.map((bar) => {
          const barW = Math.max(Math.round((bar.value / MAX) * 100), 2);
          return (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="font-mono uppercase font-medium text-black text-xs shrink-0 w-20">{bar.label}</span>
              <div className="flex-1 flex items-center gap-2">
                <div className={`h-5 ${bar.platanus ? "bg-[#FFEC40]" : "bg-black/10"}`} style={{ width: `${barW}%` }} />
                <span className="font-mono uppercase font-medium text-black text-xs shrink-0">{bar.display}</span>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-4">
        Carta y data propia.
      </figcaption>
    </figure>
  );
}

const exits = [250, 300, 350, 400, 450, 500];
const entries = [
  { label: "$2,857,143", short: "$2.8M", value: 2857143, platanus: true },
  { label: "$5,000,000", short: "$5M", value: 5000000 },
  { label: "$10,000,000", short: "$10M", value: 10000000 },
  { label: "$15,000,000", short: "$15M", value: 15000000 },
  { label: "$20,000,000", short: "$20M", value: 20000000 },
  { label: "$25,000,000", short: "$25M", value: 25000000 },
  { label: "$30,000,000", short: "$30M", value: 30000000 },
];

const retornosData: number[][] = [
  [46, 55, 64, 73, 82, 91],
  [26, 31, 37, 42, 47, 52],
  [13, 16, 18, 21, 23, 26],
  [9, 10, 12, 14, 16, 17],
  [7, 8, 9, 10, 12, 13],
  [5, 6, 7, 8, 9, 10],
  [4, 5, 6, 7, 8, 9],
];

function cellColor(val: number): string {
  if (val >= 60) return "bg-[#474402] text-[#FFEC40] font-medium";
  if (val >= 30) return "bg-[#474402]/20 text-black";
  if (val >= 10) return "bg-black/10 text-black";
  return "bg-red-900/30 text-red-400";
}

export function RetornosTable() {
  return (
    <figure className="my-8">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="font-mono font-medium text-black text-xs uppercase tracking-wider text-left p-1.5 border border-black/10 bg-black/5 w-[18%]">
              Entrada / Exit
            </th>
            {exits.map((e) => (
              <th key={e} className="font-mono uppercase font-medium text-black text-xs text-center p-1.5 border border-black/10 bg-black/5">
                ${e}M
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, ri) => (
            <tr key={entry.label}>
              <td className={`font-mono font-medium text-xs p-1.5 border border-black/10 ${entry.platanus ? "text-black bg-[#FFEC40] uppercase" : "bg-black/5 text-black"}`}>
                <span className="hidden sm:inline">{entry.label}</span>
                <span className="sm:hidden">{entry.short}</span>
                {entry.platanus && <span className="block text-black bg-[#FFEC40] uppercase w-fit" style={{ fontSize: "10px" }}>Platanus</span>}
              </td>
              {retornosData[ri].map((val, ci) => (
                <td key={ci} className={`font-mono uppercase font-medium text-xs text-center p-1.5 border border-black/10 ${cellColor(val)}`}>
                  {val}x
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
        Retornos de una inversion de $200k segun valorizacion de entrada y exit. Considera diluciones de 25% (Serie A), 20% (Serie B) y 13% (Serie C).
      </figcaption>
    </figure>
  );
}

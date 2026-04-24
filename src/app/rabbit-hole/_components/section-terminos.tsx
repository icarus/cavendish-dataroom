import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

export function SectionTerminos() {
  const terms = [
    { label: "Tamaño", value: "USD $15.000.000", sub: "CAP de USD $20.000.000" },
    { label: "Portafolio objetivo", value: "35 – 45 startups" },
    { label: "Etapa de inversión", value: "Pre Seed y Seed" },
    { label: "Ticket por startup", value: "$50.000 – $500.000", sub: "Promedio 5–7% de participación" },
    { label: "Mecanismo de inversión", value: "SAFE", sub: "Valor convertible con límite post-money" },
    { label: "Tiempo del fondo", value: "10 años", sub: "Con dos extensiones de 1 año cada una" },
    { label: "Geografía", value: "Latinoamérica" },
    { label: "Jurisdicción", value: "Ontario, Canadá" },
    { label: "Carry", value: "20%", sub: "Sobre utilidades" },
  ];

  const capitalCalls = [
    { call: "1 — Firma", date: "Al firmar", pct: "30%", total: "30%" },
    { call: "2", date: "1 Jul 2026", pct: "5%", total: "35%" },
    { call: "3", date: "1 Abr 2027", pct: "3%", total: "38%" },
    { call: "4", date: "1 Jul 2027", pct: "7%", total: "45%" },
    { call: "5", date: "1 Ene 2028", pct: "15%", total: "60%" },
    { call: "6", date: "1 Jul 2028", pct: "10%", total: "70%" },
    { call: "7", date: "1 Ene 2029", pct: "5%", total: "75%" },
    { call: "8", date: "1 Jul 2029", pct: "5%", total: "80%" },
    { call: "9", date: "1 Ene 2030", pct: "3%", total: "83%" },
    { call: "10", date: "1 Jul 2030", pct: "3%", total: "86%" },
    { call: "11", date: "1 Ene 2031", pct: "3%", total: "89%" },
    { call: "12", date: "1 Jul 2031", pct: "2%", total: "91%" },
    { call: "13", date: "1 Ene 2032", pct: "2%", total: "93%" },
    { call: "14", date: "1 Jul 2032", pct: "2%", total: "95%" },
    { call: "15", date: "1 Ene 2033", pct: "1%", total: "96%" },
    { call: "16", date: "1 Jul 2033", pct: "1%", total: "97%" },
    { call: "17", date: "1 Ene 2034", pct: "1%", total: "98%" },
    { call: "18", date: "1 Jul 2034", pct: "1%", total: "99%" },
    { call: "19", date: "1 Ene 2035", pct: "1%", total: "100%" },
  ];

  return (
    <section id="terminos" className="py-16">
      <Badge variant="solid" className="mb-4">09</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Términos Platanus Cavendish LP
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {terms.map((t) => (
          <div key={t.label} className="border border-black/10 p-5 bg-black/5">
            <p className="font-mono font-medium text-black text-sm uppercase tracking-wider mb-1">{t.label}</p>
            <p className="font-sans font-medium text-black/60 text-sm">{t.value}</p>
            {t.sub && <p className="font-sans font-medium text-black/40 text-sm mt-0.5">{t.sub}</p>}
          </div>
        ))}
      </div>

      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Management Fee
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Promedio de 2% anual sobre capital comprometido durante 10 años. Distribución:
      </p>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10">
              <th className="text-left font-mono font-medium text-black text-sm uppercase tracking-wider pb-3 pr-8">Período</th>
              <th className="text-left font-mono font-medium text-black text-sm uppercase tracking-wider pb-3">Fee anual</th>
            </tr>
          </thead>
          <tbody>
            {[
              { period: "Años 1 a 3", fee: "3,75%" },
              { period: "Año 4", fee: "3,00%" },
              { period: "Años 5 a 9", fee: "1,00%" },
              { period: "Año 10", fee: "0,75%" },
            ].map((row) => (
              <tr key={row.period} className="border-b border-black/10">
                <td className="font-sans font-medium text-black/60 text-sm py-3 pr-8">{row.period}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-3">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Capital Calls
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Al firmar el Subscription Agreement se paga el <span className="bg-[#3d3a00] text-[#FFEC40] px-1  text-black">30%</span> del capital comprometido. El resto sigue este calendario tentativo:
      </p>
      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Pueden adelantar uno o más capital calls si resulta más conveniente.
        </p>
      </Callout>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10">
              {["Call", "Fecha", "% del call", "% acumulado"].map((h) => (
                <th key={h} className="text-left font-mono font-medium text-black text-sm uppercase tracking-wider pb-3 pr-8">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {capitalCalls.map((row) => (
              <tr key={row.call} className="border-b border-black/10">
                <td className="font-mono font-medium text-black/60 text-sm py-2 pr-8">{row.call}</td>
                <td className="font-sans font-medium text-black/60 text-sm py-2 pr-8">{row.date}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2 pr-8">{row.pct}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

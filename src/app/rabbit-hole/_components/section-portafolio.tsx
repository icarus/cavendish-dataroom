import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

export function SectionPortafolio() {
  return (
    <section id="portafolio" className="py-16 border-b border-black/10">
      <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-base hover:bg-[#FFEC40]/90 border-transparent mb-4">05</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Construcción del portafolio
      </h2>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Al planear una construcción de portafolio tenemos que comprobar cómo se logra llegar a un retorno de 3x en base a un portafolio exitoso.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">Para esto, hay que fijar algunos supuestos:</p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          {[
            "Monto que invertirá el fondo.",
            "Startups target.",
            "Ticket de inversión y valorización de las startups en que invertiremos.",
            "Monto destinado para follow ons.",
            "La dilución esperada.",
            "Porcentaje de éxito.",
            "Valor de la startup al momento del exit.",
          ].map((item) => (
            <li key={item} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>

      {/* Monto a invertir */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Monto a invertir
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Monto a invertir de Platanus Cavendish LP:
      </p>
      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse">
          <tbody>
            {[
              { label: "Monto objetivo del fondo", value: "$15,000,000", bold: false },
              { label: "Gastos organizacionales", value: "−$100,000", bold: false },
              { label: "Gastos operacionales totales", value: "−$799,600", bold: false },
              { label: "Mgmt Fees", value: "−$3,000,000", bold: false },
              { label: "Monto a reinvertir", value: "$750,000", bold: false },
              { label: "Monto para inversiones", value: "$11,850,400", bold: true },
              { label: "Primeras inversiones — Aceleración", value: "−$6,399,216", bold: false, sub: true },
              { label: "Primeras inversiones — Oportunidades", value: "−$1,896,064", bold: false, sub: true },
              { label: "Follow ons", value: "−$3,555,120", bold: false, sub: true },
            ].map((row) => (
              <tr key={row.label} className={`border-b ${row.bold ? "border-black/10 bg-[#FFEC40]" : "border-black/10"}`}>
                <td className={`font-sans font-medium text-sm py-2.5 pr-8 ${row.bold ? "text-black" : row.sub ? "text-black pl-4" : "text-black"}`}>
                  {row.label}
                </td>
                <td className={`font-mono font-medium text-sm py-2.5 text-right ${row.bold ? "text-black" : "text-black"}`}>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Startups target */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Startups target
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Lo primero es definir en qué startups invertiremos en base a distintos tipos de fundadores y las características de las rondas que suelen levantar.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6">
        Hemos identificado tres tipos de rondas iniciales, las que llamaremos Low Pre Seed, High Pre Seed y Seed.
      </p>

      <div className="space-y-4 mb-6">
        {[
          {
            name: "Low Pre Seed",
            desc: "Fundadores con poca o nada de experiencia en el mundo startup y venture capital que acaban de partir. Deben ser excepcionales, pero no tienen los conocimientos, contactos o redes para levantar una ronda inicial rápido. Estos fundadores suelen pivotear y son los que más tiempo necesitan previo a encontrar algo interesante.",
            details: [
              "Rondas de entre $50k y $300k con valorizaciones bajas de $1M a $4M.",
              "Tasa de graduación a una serie Seed: 30–35%.",
              "Ejemplos en Platanus: Toku, Fintoc, Horizon.",
            ],
          },
          {
            name: "High Pre Seed",
            desc: "Fundadores que tienen más experiencia en startups y venture capital; con conocimientos y conexiones para levantar una ronda inicial. Tienen más claridad respecto a lo que quieren hacer y el mercado donde se están metiendo.",
            details: [
              "Tasa de graduación a una serie Seed: 35–45%.",
              "Ejemplos en Platanus: Grupalia, Shinkansen, Tax Flow.",
            ],
          },
          {
            name: "Seed",
            desc: "Startups que ya cuentan con un producto, clientes y tracción. Todavía no necesitan el capital de una Serie A, pero la tracción inicial hace que quieran levantar más capital, o tal vez una primera ronda si son bootstrapped.",
            details: [
              "Rondas de entre $500k y $5M a una valorización entre $5M y $25M.",
              "Tienden a ser las menos riesgosas de las tres, pero la valorización es mayor.",
              "Tasa de graduación hacia una Serie A: 45%–50%.",
            ],
          },
        ].map((type) => (
          <div key={type.name} className="border border-black/10 p-5 bg-black/5">
            <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-2">{type.name}</h4>
            <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">{type.desc}</p>
            <ul className="list-disc list-outside pl-5 space-y-2">
              {type.details.map((d) => (
                <li key={d} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          No estaremos invirtiendo en fundadores que busquen una ronda High Pre Seed con valorizaciones de USA (por ejemplo, en Boom post YC).
        </p>
      </Callout>

      {/* Tamaño de ticket */}
      <h3 className="font-sans font-medium text-black/40 mb-4 mt-10" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Tamaño de ticket y valorizaciones de entrada
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">Realizaremos tres tipos de inversiones:</p>
      <div className="space-y-3 mb-10">
        {[
          { title: "Nueva inversión — Programa de Aceleración", body: "Inversión estándar de $200,000 por un 7% de participación en etapa Pre Seed." },
          { title: "Nueva inversión — Oportunidad", body: "Inversión de $200,000 por un 3%–7% de participación en Pre Seed o Seed. Estos tickets buscan rebajar el riesgo general." },
          { title: "Follow ons", body: "Inversión promedio de $300,000 en las rondas Seed o Series A en startups de las inversiones anteriores." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 py-3 border-b border-black/10 last:border-0">
            <span className="text-[#FFEC40] bg-black/5 w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">→</span>
            <div>
              <span className="font-sans font-medium text-black/60 text-sm">{item.title}: </span>
              <span className="font-sans font-medium text-black/60 text-sm leading-relaxed">{item.body}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tasa de éxito + Dilución */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
            Tasa de éxito
          </h3>
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: "Pre Seed → Seed", value: "40%" },
                { label: "Seed → Serie A", value: "45%" },
                { label: "Serie A → Serie B", value: "50%" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-black/10">
                  <td className="font-sans font-medium text-black/60 text-sm py-2.5 pr-4">{row.label}</td>
                  <td className="font-mono font-medium text-black/60 text-sm py-2.5 text-right">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
            Dilución esperada
          </h3>
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: "Serie A", value: "25%" },
                { label: "Serie B", value: "20%" },
                { label: "Serie C", value: "13%" },
              ].map((row) => (
                <tr key={row.label} className="border-b border-black/10">
                  <td className="font-sans font-medium text-black/60 text-sm py-2.5 pr-4">{row.label}</td>
                  <td className="font-mono font-medium text-black/60 text-sm py-2.5 text-right">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Valorizaciones al exit */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Valorizaciones al momento del exit
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-10">
        Nuestra estrategia es vender nuestra participación en las rondas de financiamiento de nuestras startups. Para los cálculos, utilizamos un rango de valorizaciones al momento del exit de entre <span className="bg-[#FFEC40] px-1  text-black">$250M a $500M</span>. Cualquier exit con un valor superior mejorará las métricas del fondo sustancialmente.
      </p>

      {/* Portafolio esperado */}
      <h2 className="font-sans font-medium text-black mb-8 mt-4" style={{ fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.2 }}>
        Portafolio esperado y resultados
      </h2>

      {/* Aceleración */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Inversiones del programa de aceleración
      </h3>
      <div className="space-y-4 mb-6">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          El ticket estándar del programa de aceleración busca atraer y seleccionar a los mejores de las rondas Low Pre Seed y alguno que otro High Pre Seed. Es este ticket con este porcentaje de participación el que nos permitirá obtener startups fund returners que retornen 75x la inversión inicial.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Destinaremos <span className="bg-[#FFEC40] px-1  text-black">$6,400,000</span> para estas inversiones, <span className="bg-[#FFEC40] px-1  text-black">32 nuevas startups</span> bajo los términos fijos de $200.000 por un 7% de participación.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Estas inversiones se distribuyen en generaciones del programa, una generación cada semestre.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">Este sería el avance del portafolio según las tasas de éxito:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Startups iniciales", value: "32" },
            { label: "Llegan a Serie Seed", value: "11" },
            { label: "Llegan a Serie A", value: "5" },
            { label: "Llegan a Serie B", value: "3" },
          ].map((item) => (
            <div key={item.label} className="border border-black/10 p-4 bg-black/5 text-center">
              <p className="font-mono font-medium text-black text-2xl mb-1">{item.value}</p>
              <p className="font-sans font-medium text-black/60 text-sm leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Para lograr un portafolio ideal, la distribución de estas 32 startups en base a su MOIC debiese ser:
      </p>
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-black/10">
              {["MOIC", "% startups", "# startups", "Val. exit", "Exit value", "Total"].map((h) => (
                <th key={h} className="text-left font-mono font-medium text-black text-xs uppercase tracking-wider pb-3 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { moic: "0x", pct: "25%", n: "8", val: "$0", exit: "$0", total: "$0" },
              { moic: "0.4x", pct: "27%", n: "9", val: "$0", exit: "$80,000", total: "$720,000" },
              { moic: "1x", pct: "20%", n: "6", val: "$2,857,143", exit: "$200,000", total: "$1,200,000" },
              { moic: "3x", pct: "18%", n: "6", val: "$8,571,429", exit: "$600,000", total: "$3,600,000" },
              { moic: "55x", pct: "10%", n: "3", val: "$301,039,956", exit: "$11,000,000", total: "$33,000,000", highlight: true },
            ].map((row) => (
              <tr key={row.moic} className={`border-b ${row.highlight ? "bg-[#FFEC40]" : "border-black/10"}`}>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.moic}</td>
                <td className="font-sans font-medium text-black/60 text-sm py-2.5 pr-3">{row.pct}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.n}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.val}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.exit}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="space-y-4 mt-6 mb-10">
        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider">Generaciones a la fecha</h4>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          A la fecha el fondo ya ha realizado 4 inversiones a través de dos generaciones:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Generación 25: 4 startups.</li>
        </ul>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Estamos en proceso de selección de la generación 26-I, donde ya hemos seleccionado 4 startups.
        </p>

        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mt-4">Proyección de startups por generación</h4>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">Para llegar a las 32 startups, invertiremos en 6 generaciones:</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { gen: "25", n: "4" },
            { gen: "26-I", n: "5" },
            { gen: "26-II", n: "5" },
            { gen: "27-I", n: "5" },
            { gen: "27-II", n: "6" },
            { gen: "28-I", n: "7" },
          ].map((g) => (
            <div key={g.gen} className="border border-black/10 p-3 bg-black/5 text-center">
              <p className="font-mono font-medium text-black text-xl mb-0.5">{g.n}</p>
              <p className="font-mono font-medium text-black text-xs uppercase tracking-wider">Gen {g.gen}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Oportunísticas */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Inversiones oportunísticas
      </h3>
      <div className="space-y-4 mb-6">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Destinaremos <span className="bg-[#FFEC40] px-1  text-black">$1,800,000</span> para estas inversiones, 9 nuevas startups si pensamos en tickets de $200k.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">Las inversiones oportunísticas están destinadas a:</p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">High Pre Seed que estén levantando a una valorización que haga difícil aceptar el ticket estándar (por ejemplo están levantando una ronda de $750k a una valorización de $5M y ya llevan $300k levantados). Como son inversiones en teoría con mayor tasa de éxito, sacrificamos un porcentaje de participación para bajar el riesgo al portafolio.</li>
          <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Fundadores Low Pre Seed que nos gustaría invertirles menos que los $200k del deal fijo del programa de aceleración.</li>
        </ul>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          A la fecha ya hemos realizado dos: <span className="text-black">Boom</span> y <span className="text-black">Utanix</span>.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Startups iniciales", value: "9" },
            { label: "Llegan a Serie Seed", value: "4" },
            { label: "Llegan a Serie A", value: "2" },
            { label: "Llegan a Serie B", value: "1" },
          ].map((item) => (
            <div key={item.label} className="border border-black/10 p-4 bg-black/5 text-center">
              <p className="font-mono font-medium text-black text-2xl mb-1">{item.value}</p>
              <p className="font-sans font-medium text-black/60 text-sm leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Dado que teóricamente son startups menos riesgosas y que nos quedaremos con menos porcentaje, hemos considerado MOICs más bajos.
        </p>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-black/10">
              {["MOIC", "% startups", "# startups", "Val. exit", "Exit value", "Total"].map((h) => (
                <th key={h} className="text-left font-mono font-medium text-black text-xs uppercase tracking-wider pb-3 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { moic: "0x", pct: "22%", n: "2", val: "$0", exit: "$0", total: "$0" },
              { moic: "0.4x", pct: "27%", n: "3", val: "$0", exit: "$80,000", total: "$240,000" },
              { moic: "1x", pct: "23%", n: "2", val: "$6,000,000", exit: "$200,000", total: "$400,000" },
              { moic: "3x", pct: "18%", n: "2", val: "$24,000,000", exit: "$600,000", total: "$1,200,000" },
              { moic: "35x", pct: "10%", n: "1", val: "$402,298,851", exit: "$7,000,000", total: "$7,000,000", highlight: true },
            ].map((row) => (
              <tr key={row.moic} className={`border-b ${row.highlight ? "bg-[#FFEC40]" : "border-black/10"}`}>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.moic}</td>
                <td className="font-sans font-medium text-black/60 text-sm py-2.5 pr-3">{row.pct}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.n}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.val}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.exit}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Follow on */}
      <h3 className="font-sans font-medium text-black/40 mb-4 mt-10" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Follow on
      </h3>
      <div className="space-y-4 mb-6">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Destinaremos <span className="bg-[#FFEC40] px-1  text-black">$3,600,000</span> para follow on en startups del portafolio que estén levantando su Serie Seed.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Dado que las startups en una etapa Seed siguen en etapas muy iniciales y el análisis de si invertir o no sigue pasando más por el equipo que por la tracción de la empresa, podemos invertir en estas rondas si conocemos muy bien a los fundadores, algo que logramos si ya son parte de nuestra comunidad.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Así, la estrategia de follow ons sería por ejemplo invertir en Low o High Pre Seed y luego en Seed.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          De acuerdo al comportamiento esperado del portafolio, habrán 12 startups que retornarán 3x o más. Son en esas 12 startups en las que debemos hacer el follow on.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          De darse los resultados de más arriba, solo las cuatro startups más importantes darán los siguientes retornos de follow on:
        </p>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-black/10">
              {["MOIC", "% startups", "# startups", "Val. exit", "Exit value", "Total"].map((h) => (
                <th key={h} className="text-left font-mono font-medium text-black text-xs uppercase tracking-wider pb-3 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { moic: "12.6x", pct: "25%", n: "3", val: "$301,039,971", exit: "$3,771,429", total: "$11,314,286", highlight: true },
              { moic: "16.8x", pct: "8%", n: "1", val: "$402,298,851", exit: "$5,040,000", total: "$5,040,000", highlight: true },
            ].map((row) => (
              <tr key={row.moic} className={`border-b ${row.highlight ? "bg-[#FFEC40]" : "border-black/10"}`}>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.moic}</td>
                <td className="font-sans font-medium text-black/60 text-sm py-2.5 pr-3">{row.pct}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.n}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.val}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5 pr-3">{row.exit}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-2.5">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Retorno total */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Retorno total del portafolio
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black/10">
              <th className="text-left font-mono font-medium text-black text-sm uppercase tracking-wider pb-3 pr-8">Tipo de ticket</th>
              <th className="text-right font-mono font-medium text-black text-sm uppercase tracking-wider pb-3">Total exit value</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Nueva inversión — Programa de Aceleración", value: "$38,520,000" },
              { label: "Nueva inversión — Oportunidad", value: "$47,360,000" },
              { label: "Follow ons", value: "$16,354,286" },
            ].map((row) => (
              <tr key={row.label} className="border-b border-black/10">
                <td className="font-sans font-medium text-black/60 text-sm py-3 pr-8">{row.label}</td>
                <td className="font-mono font-medium text-black/60 text-sm py-3 text-right">{row.value}</td>
              </tr>
            ))}
            <tr className="bg-[#FFEC40]">
              <td className="font-sans font-medium text-black/60 text-sm py-3 pr-8">Total</td>
              <td className="font-mono font-medium text-black/60 text-sm py-3 text-right">$63,714,286</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

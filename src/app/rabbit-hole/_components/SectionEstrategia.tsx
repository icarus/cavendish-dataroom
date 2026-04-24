import { Callout } from "./Callout";

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

function ValorizacionesChart() {
  return (
    <figure className="my-8 border border-white/10 p-6 bg-white/5">
      <p className="font-sans font-medium text-white/70 text-sm mb-6">
        Valorizaciones post money según rondas
      </p>
      <div className="flex items-end gap-3" style={{ height: CHART_H }}>
        {bars.map((bar) => {
          const rawH = Math.round((bar.value / MAX) * CHART_H);
          const barH = Math.max(rawH, 6);
          return (
            <div key={bar.label} className="flex flex-col items-center justify-end flex-1 h-full">
              {/* value label above bar */}
              <span
                className="font-mono font-medium text-white mb-1 leading-tight text-center"
                style={{ fontSize: "clamp(8px, 1vw, 11px)" }}
              >
                {bar.display}
              </span>
              {/* bar */}
              <div
                className={`w-full ${bar.platanus ? "bg-[#FFEC40]" : "bg-[#111111]"}`}
                style={{ height: barH }}
              />
            </div>
          );
        })}
      </div>
      {/* x-axis line */}
      <div className="border-t border-white/40 mt-0" />
      {/* x labels */}
      <div className="flex gap-3 mt-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex-1 text-center">
            <span
              className="font-mono font-medium text-white leading-tight text-center block"
              style={{ fontSize: "clamp(8px, 1vw, 11px)" }}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="font-sans font-medium text-white/40 text-sm leading-relaxed mt-4">
        Carta y data propia.
      </figcaption>
    </figure>
  );
}

const exits = [250, 300, 350, 400, 450, 500];
const entries = [
  { label: "$2,857,143", value: 2857143, platanus: true },
  { label: "$5,000,000", value: 5000000 },
  { label: "$10,000,000", value: 10000000 },
  { label: "$15,000,000", value: 15000000 },
  { label: "$20,000,000", value: 20000000 },
  { label: "$25,000,000", value: 25000000 },
  { label: "$30,000,000", value: 30000000 },
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
  if (val >= 60) return "bg-[#FFEC40] text-black font-medium";
  if (val >= 30) return "bg-[#FFEC40]/20 text-white";
  if (val >= 10) return "bg-white/10 text-white";
  return "bg-red-900/30 text-red-400";
}

function RetornosTable() {
  return (
    <figure className="my-8">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="font-mono font-medium text-white text-xs uppercase tracking-wider text-left p-1.5 border border-white/10 bg-white/5 w-[18%]">
              Entrada / Exit
            </th>
            {exits.map((e) => (
              <th key={e} className="font-mono font-medium text-white text-xs text-center p-1.5 border border-white/10 bg-white/5">
                ${e}M
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, ri) => (
            <tr key={entry.label}>
              <td className={`font-mono font-medium text-xs p-1.5 border border-white/10 ${entry.platanus ? "bg-[#111111] text-[#FFEC40]" : "bg-white/5 text-white"}`}>
                {entry.label}
                {entry.platanus && <span className="block text-[#FFEC40]/60" style={{ fontSize: "10px" }}>Platanus</span>}
              </td>
              {retornosData[ri].map((val, ci) => (
                <td key={ci} className={`font-mono font-medium text-xs text-center p-1.5 border border-white/10 ${cellColor(val)}`}>
                  {val}x
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="font-sans font-medium text-white/40 text-sm leading-relaxed mt-2">
        Retornos de una inversión de $200k según valorización de entrada y exit. Considera diluciones de 25% (Serie A), 20% (Serie B) y 13% (Serie C).
      </figcaption>
    </figure>
  );
}

export function SectionEstrategia() {
  return (
    <section id="estrategia" className="py-16 border-b border-white/10">
      <span className="inline-block bg-[#FFEC40] text-black font-mono font-medium text-base px-2 py-0.5mb-4">04</span>
      <h2 className="font-sans font-medium text-white mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Estrategia de inversión
      </h2>

      <Callout>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En Platanus invertimos en las etapas iniciales de startups tecnológicas de Latinoamérica que cuenten con un fundador tech.
        </p>
      </Callout>

      <div className="space-y-4 mt-6 mb-10">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En la sección diagnóstico inicial hablamos de los esfuerzos de Platanus para incentivar y apoyar la creación de más startups en Latam lideradas por personas excepcionales y adictas a la tecnología.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Aunque nuestro foco sea ese, no somos una fundación u organismo de beneficencia.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          El objetivo económico detrás de Platanus es simple: obtener de manera consistente retornos extraordinarios que por lo general solo pueden darse en fondos de venture capital.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          La complejidad en esta "simpleza" radica principalmente en la estrategia de inversión y la región donde se enmarca esa estrategia.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Dos de las grandes críticas que se hacen al Venture Capital en Latinoamérica es la falta de liquidez y, en eventos de exits, las bajas valorizaciones de venta o adquisición. Esto es cierto, pero solo en la medida en cómo se ha abordado el VC en Latam.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Casi todos los fondos en Latam quieren tener retornos de VC, tomando riesgos de PE y asumiendo valorizaciones de USA al momento del exit.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          La forma y la etapa en la que incentivamos, invertimos y apoyamos a las startups es justamente lo que nos permite tener retornos de VC. Es una forma que acepta el riesgo que conlleva el <span className="italic">Adventure</span> Capital y ajusta la estrategia de inversión a la realidad y valorizaciones de Latam.
        </p>
      </div>

      {/* ¿Cómo se compone un fondo exitoso? */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        ¿Cómo se compone un fondo exitoso de Venture Capital?
      </h3>
      <div className="space-y-4 mb-6">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Los fondos de VC buscan dar a sus inversionistas 3x el capital invertido. Ese es el piso. La realidad es que pocos fondos logran ese retorno y eso se debe principalmente al Power Law: dos o tres startups concentran todos los retornos.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Es más fácil de visualizar si partimos analizando cómo se compone el portafolio de un VC que logre el 3x.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Utilizando la data histórica de Stepstone, un fondo excepcional de VC se compone del siguiente portafolio:
        </p>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left font-mono font-medium text-white text-sm uppercase tracking-wider pb-3 pr-8">Retorno</th>
              <th className="text-left font-mono font-medium text-white text-sm uppercase tracking-wider pb-3">% del portafolio</th>
            </tr>
          </thead>
          <tbody>
            {[
              { range: "0x", pct: "22%" },
              { range: "0x – 0.99x", pct: "27%" },
              { range: "1x – 3x", pct: "23%" },
              { range: "3x – 10x", pct: "18%" },
              { range: "10x+", pct: "10%", highlight: true },
            ].map((row) => (
              <tr key={row.range} className="border-b border-white/10">
                <td className="font-sans font-medium text-sm py-3 pr-8">
                  {row.highlight ? <span className="bg-[#FFEC40] px-1>{row.range}</span> : <span className="text-white">{row.range}</span>}
                </td>
                <td className="font-sans font-medium text-sm py-3">
                  {row.highlight ? <span className="bg-[#FFEC40] px-1>{row.pct}</span> : <span className="text-white">{row.pct}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En los mejores fondos casi un <span className="bg-[#FFEC40] px-1>95% de los retornos</span> se compone de ese <span className="bg-[#FFEC40] px-1>10% del portafolio</span> que retorna en promedio <span className="bg-[#FFEC40] px-1>60x</span>. Sin esas startups ganadoras no se llega al 3x tan anhelado.
        </p>
      </Callout>

      <figure className="mt-6 mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/stepstonedata.png"
          alt="Stepstone Historical Data - What makes a Top VC fund"
          className="w-full border border-white/10"
        />
        <figcaption className="font-sans font-medium text-white/40 text-sm leading-relaxed mt-2">
          Data de Stepstone, gráfico de Altimeter.
        </figcaption>
      </figure>

      {/* Un desafío posible */}
      <h3 className="font-sans font-medium text-white/40 mb-4 mt-10" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Un desafío posible
      </h3>
      <div className="space-y-4 mb-6">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Teniendo la claridad de cómo debería ser un portafolio exitoso surgen dos preguntas:
        </p>
        <ol className="list-decimal list-outside pl-5 space-y-2">
          <li className="font-sans font-medium text-white/70 text-sm leading-relaxed">¿Es posible en general Latam que las startups retornen múltiplos de 20x, 50x o 100x?</li>
          <li className="font-sans font-medium text-white/70 text-sm leading-relaxed">¿Pueden nuestros fondos llegar a las características mostradas por los portafolios de fondos exitosos?</li>
        </ol>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          No es ningún secreto que las valorizaciones en la región se quedan más en los cientos que en los miles de millones. Además, las adquisiciones y salidas a bolsa son una fracción de lo que pasa en USA.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Ante esta situación, la única forma de llegar a esos 60x es entrar a la valorización más baja de una startup, lo más cercana a sus inicios.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Ejemplo. Para Platanus Cavendish, con una inversión de $200k, un fund returner debe retornar <span className="bg-[#FFEC40] px-1  text-black">75x</span> la inversión inicial.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Para saber si podemos llegar a ese múltiplo debemos saber el precio de entrada y de salida, además de las potenciales diluciones que existirán en el camino.
        </p>

        <ValorizacionesChart />

        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Las diluciones estándar para los inversionistas serían de:
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          {["25% en la Serie A.", "20% en la Serie B.", "13% en la Serie C."].map((item) => (
            <li key={item} className="font-sans font-medium text-white/70 text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Estos serían los retornos de una inversión de $200k dependiendo del precio de entrada y el de exit, considerando las tres diluciones anteriores.
        </p>
      </div>

      <RetornosTable />

      <Callout>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Salvo nuestra valorización estándar de <span className="bg-[#FFEC40] px-1>$200k por un 7%</span>, ninguna otra inversión logra llegar a un múltiplo de retorno de 60x.
        </p>
      </Callout>

      <div className="space-y-4 mt-6 mb-10">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          El análisis debe partir de la base que en Latam una startup exitosa se va a vender en esos precios. Si después termina siendo un unicornio, excelente, pero la estrategia debe funcionar con montos menores.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          A valorizaciones de entrada de $2–5 millones la estrategia de inversión tiene sentido. Es la única forma de llegar a 75x con precios aterrizados.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Actualmente, las únicas startups con excelentes fundadores que rondan esas valorizaciones son las que están partiendo y levantando sus primeros tickets de inversión, la comúnmente llamada ronda Pre Seed.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Para invertir tan temprano hay que tomar el riesgo asociado. De ahí viene que para obtener en Latam retornos de VC, hay que actuar realmente como un VC y no como PE. Se debe apostar en equipos lo antes posible y asumir que un alto porcentaje va a fracasar, pero que este fracaso se verá compensado con el retorno espectacular de un par de startups.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En la región, los fondos de VC tienden a ser más conservadores. Prefieren esperar antes de invertir, ver que la startup tenga tracción y que sea una apuesta más segura. Cuando pasa eso, las mejores startups ya están levantando a valorizaciones de entre $10–25 millones.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Bajo esas valorizaciones de entrada podrían lograr retornos de 27x siempre y cuando el exit sea de $500 millones o más. De ahí que su estrategia se basa en valorizaciones de USA.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Otra alternativa para lograr buenos retornos entrando más tarde (asumiendo valorizaciones de exit de Latam) es compensar los retornos por inversión más bajos con una menor tasa de fracaso del portafolio. Apostar de forma más segura por los 2x–5x. Es válido, pero eso obliga que las decisiones sean más conservadoras, que el pensamiento se vuelva más de Private Equity y se entra en un loop donde el capital de riesgo deja de ser riesgoso y los retornos dejan de ser de Venture Capital.
        </p>
      </div>

      {/* Buscando el fund returner */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Buscando el fund returner
      </h3>
      <div className="space-y-4 mb-6">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          ¿Podemos en Platanus llegar a esos 75x? Veamos un caso real:
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Tomemos como ejemplo Toku, startup invertida por Platanus el primer semestre del 2021 que a la fecha ya ha levantado su Serie A y B.
        </p>
      </div>

      <Callout>
        <ul className="list-disc list-outside pl-5 space-y-2">
          {[
            "Si entrara en este nuevo fondo, recibiría una inversión inicial de $200k por un 7% de participación.",
            "Tendríamos una dilución en la Serie A de 25% y en la Serie B de 30%.",
            "Tras la Serie B, nos quedaríamos con un 3,675%.",
            "De acuerdo a su última valorización, el valor actual de la inversión sería de $9,187,500 (45.9x el monto inicial invertido).",
          ].map((item) => (
            <li key={item} className="font-sans font-medium text-white/70 text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mt-3">
          Si suponemos que en 3–4 años levantará una ronda a 2.5x de valorización y consideramos una dilución de 25%, el potencial exit sería de <span className="bg-[#FFEC40] px-1>$17,226,562 — un fund returner de 86x</span>.
        </p>
      </Callout>

      <div className="space-y-4 mt-6 mb-10">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Para el resto de las startups que formarían ese 10% de 10x+, al invertir en Pre Seed, con la inversión estándar de este fondo y considerando diluciones estándar, toda startup que levante una ronda a una valorización de al menos $40 millones post money es un 10x de la inversión inicial.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          ¿Y el resto del portafolio?
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Dejando de lado las que fracasan o retornan menos de 1x, en un fondo exitoso el 41% de las startups deben retornar entre 1x–10x.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Nuevamente, al entrar tan temprano, somos de los únicos que podemos sacar un beneficio interesante en startups que se vendan a relativamente bajos montos.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Bemmbo, por ejemplo, se vendió el 2025 a Buk por $6 millones.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En esta venta, los únicos inversionistas que lograron retornos fueron los ángeles que entraron primero y nosotros, que obtuvimos 3.9x. Los demás obtuvieron retornos cercanos a 1x o directamente menores si consideramos la inflación.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Todo gracias a haber entrado antes que el resto de los fondos de Latam.
        </p>
      </div>

      {/* Mitigar el riesgo */}
      <h3 className="font-sans font-medium text-white/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Mitigar el riesgo asociado a invertir en Pre Seed
      </h3>
      <div className="space-y-4 mb-8">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Los fondos tradicionales de Latam sacrifican mayores retornos al evitar el riesgo de invertir en Pre Seed.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          En Platanus preferimos buscar los mayores retornos, utilizando otras estrategias para mitigar lo que conlleva invertir tan temprano.
        </p>
      </div>

      <div className="space-y-20">
        {/* Mitigación 1 */}
        <div className="flex gap-6">
          <span className="inline-flex items-start justify-center bg-[#FFEC40] text-black font-mono font-medium text-sm w-8 h-7  shrink-0 mt-0.5">01</span>
          <div>
            <h4 className="font-sans font-medium text-white/40 text-sm mb-3">Nos aseguramos que haya un tech en el equipo</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Como vimos antes, nuestra tesis es invertir en equipos que incluyan al menos un cofundador técnico. Creemos que esto da a las startups una ventaja competitiva, especialmente en sus primeras etapas, reduciendo el riesgo de nuestra inversión.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">Ventajas de tener un cofundador técnico:</p>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                {[
                  { title: "Expertise interno", body: "En una empresa de tecnología, es crucial contar con un experto que pueda crear y adaptar rápidamente el producto sin depender de externos, asegurando el avance continuo y aprovechando los últimos avances tecnológicos." },
                  { title: "Desarrollo continuo", body: "Aunque un producto pueda parecer terminado externamente, el desarrollo técnico es constante en una startup, con nuevas funcionalidades y optimizaciones necesarias que un cofundador técnico puede anticipar y gestionar." },
                  { title: "Atracción de talento", body: "A medida que las startups crecen, necesitan más talento técnico. Tener un cofundador bien valorado en el mercado facilita la atracción y retención de este talento, escaso y competitivo." },
                  { title: "Motivación y compromiso", body: "Un cofundador técnico está profundamente comprometido con el éxito del negocio, dedicando tiempo y esfuerzo a la tecnología, el producto y el crecimiento de la empresa, lo que impulsa el avance y la innovación más que un empleado común." },
                ].map((item) => (
                  <li key={item.title} className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                    <span className="text-white">{item.title}:</span> {item.body}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Mitigación 2 */}
        <div className="flex gap-6">
          <span className="inline-flex items-start justify-center bg-[#FFEC40] text-black font-mono font-medium text-sm w-8 h-7  shrink-0 mt-0.5">02</span>
          <div>
            <h4 className="font-sans font-medium text-white/40 text-sm mb-3">Somos buenos identificando equipos</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                En etapas iniciales hay poca o nada de tracción del negocio. Las startups justamente están levantando capital para echar a andar sus productos y probarlos con clientes. Están muy lejos de tener PMF.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Por lo tanto lo que más debe analizarse son los fundadores. Invertir en etapas iniciales es invertir principalmente en equipos y eso requiere un análisis y experiencia de selección distinto a un fondo de Series A o B.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Esta experiencia debe contemplar poder analizar equipos con un fuerte componente técnico. ¿Cómo saber si el fundador es o no buen desarrollador o si será capaz de construir el producto? ¿Tenemos cómo asegurarnos que la startup logrará atraer al mejor talento tech necesario para escalar?
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Desde el 2020 hemos revisado <span className="bg-[#FFEC40] px-1>9.549 postulaciones</span>, conducido <span className="bg-[#FFEC40] px-1>1.697 entrevistas</span> e invertido en <span className="bg-[#FFEC40] px-1>121 startups</span>. Semestre a semestre hemos ido desarrollando el músculo de ir identificando características que aumentan las posibilidades de que un equipo logre armar una startup exitosa.
              </p>
            </div>
          </div>
        </div>

        {/* Mitigación 3 */}
        <div className="flex gap-6">
          <span className="inline-flex items-start justify-center bg-[#FFEC40] text-black font-mono font-medium text-sm w-8 h-7  shrink-0 mt-0.5">03</span>
          <div>
            <h4 className="font-sans font-medium text-white/40 text-sm mb-3">Portafolios más grandes</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                La estrategia tradicional de los fondos es tener portafolios acotados, de entre 10–20 startups, y luego hacen follow on en las startups más exitosas para mantener una participación relevante al momento del exit.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                En un fondo Pre Seed un portafolio de ese tamaño es peligroso. En estos casos, un 10% sería 1 o 2 startups. Si no logras invertir en ellas, tu fondo no tiene la posibilidad de ser exitoso. Nuevamente esto lleva a que el fondo sea más conservador en sus decisiones y evite los fracasos. Necesitan ver tracción del negocio para dar el paso de invertir.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                En nuestro caso, dado que invertimos tan temprano y no hay métricas que podamos analizar, debemos aceptar que la tasa de fracaso va a ser mayor y construir un portafolio con eso en mente.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Tenemos más posibilidades de estar en 2 o 3 startups excepcionales entre <span className="bg-[#FFEC40] px-1>40–45 inversiones</span> que entre 10.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                En fondos Pre Seed, la norma son portafolios grandes.
              </p>
            </div>
          </div>
        </div>

        {/* Mitigación 4 */}
        <div className="flex gap-6">
          <span className="inline-flex items-start justify-center bg-[#FFEC40] text-black font-mono font-medium text-sm w-8 h-7  shrink-0 mt-0.5">04</span>
          <div>
            <h4 className="font-sans font-medium text-white/40 text-sm mb-3">Aumentar las posibilidades de éxito</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Por último, atendiendo a que estamos invirtiendo en la primera etapa de las empresas, todo nuestro apoyo debe estar enfocado en que logren armar un negocio que se mantenga en el tiempo y que eventualmente escale a ritmo acelerado.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                El ticket estándar de $200k está diseñado para darles la oportunidad de encontrar algo interesante. En nuestra experiencia, las startups suelen demorarse entre 12 y 24 meses en encontrar PMF. Este ticket les permite mantenerse por ese tiempo sin necesidad de buscar más capital, dándoles tiempo para lograr un producto con tracción.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Para aquellas que van bien, queremos que sigan acelerando y para eso las ayudamos en levantar más capital, ya sea a través de Demo Days o con introducciones directas a fondos.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
                Todo lo demás que hacemos, como el programa de aceleración y los esfuerzos de armar una buena comunidad, repercuten en que nuestra inversión entrará en un ambiente que potenciará su mejor versión.
              </p>
              <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">Lo principal para dar ese valor agregado es:</p>
              <ul className="list-disc list-outside pl-5 space-y-2">
                {[
                  "Una buena curatoía de fundadores. Actualmente tenemos una tasa de aceptación de un 0,7% de las postulaciones.",
                  "Impregnarle a los fundadores la importancia del sentido de urgencia y de tener foco en sus productos y usuarios en las primeras semanas.",
                  "Generar una buena red y comunidad que se apoye entre sí.",
                ].map((item) => (
                  <li key={item} className="font-sans font-medium text-white/70 text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

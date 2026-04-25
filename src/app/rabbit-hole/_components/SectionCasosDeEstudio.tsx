import React from "react";
import Image from "next/image";
import { Section } from "./mdx-components";
import { ChevronRight } from "lucide-react";

const CASE_LOGOS: Record<string, { avatar: string; url: string }> = {
  fintoc: { avatar: "/avatars/fintoc.png", url: "https://fintoc.com" },
  toku: { avatar: "/avatars/toku.png", url: "https://toku.cl" },
  bemmbo: { avatar: "/avatars/bemmbo.webp", url: "https://bemmbo.com" },
  grupalia: { avatar: "/avatars/grupalia.png", url: "https://grupalia.com" },
  boom: { avatar: "/avatars/boom.ico", url: "https://useboom.ai" },
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 p-4 bg-black/5">
      <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="font-sans font-medium text-black text-sm">{value}</p>
    </div>
  );
}

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-black/10 last:border-b-0 [&>summary]:list-none [&>summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between cursor-pointer py-4">
        <span className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider">{title}</span>
        <span className="font-mono uppercase font-medium text-black/40 text-xs group-open:rotate-90 transition-transform"><ChevronRight className="size-3.5" /></span>
      </summary>
      <div className="pb-6 space-y-3">{children}</div>
    </details>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">{children}</p>;
}

function PersonCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="border border-black/10 p-4 bg-black/5">
      <p className="font-sans font-medium text-black text-sm">{name}</p>
      <p className="font-sans font-medium text-black/40 text-xs mb-2">{role}</p>
      <p className="font-sans font-medium text-black/60 text-xs leading-relaxed">{bio}</p>
    </div>
  );
}

function FundraisingTable({ rows }: { rows: { ronda: string; fecha: string; monto: string; valoracion: string; investors: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-black/10">
            {["Ronda", "Fecha", "Monto", "Valoración", "Inversionistas"].map((h) => (
              <th key={h} className="text-left font-mono font-medium text-black/40 uppercase tracking-wider pb-2 pr-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.ronda} className="border-b border-black/10">
              <td className="font-mono uppercase font-medium text-black/60 py-2 pr-4">{r.ronda}</td>
              <td className="font-mono uppercase font-medium text-black/60 py-2 pr-4">{r.fecha}</td>
              <td className="font-mono uppercase font-medium text-black/60 py-2 pr-4">{r.monto}</td>
              <td className="font-mono uppercase font-medium text-black/60 py-2 pr-4">{r.valoracion}</td>
              <td className="font-mono uppercase font-medium text-black/60 py-2">{r.investors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Case Studies ─────────────────────────────────────────────────────────────

function CaseFintoc() {
  return (
    <div className="border border-black/10 bg-black/5 mb-4">
      <div className="p-6 border-b border-black/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">SPV · 2020</p>
            <a href={CASE_LOGOS.fintoc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src={CASE_LOGOS.fintoc.avatar} alt="Fintoc" width={24} height={24} className="size-6 object-cover" />
              <h3 className="font-sans font-medium text-black" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Fintoc</h3>
            </a>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono uppercase font-medium text-xs px-2 py-0.5">Prueba de concepto</span>
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-5">
          Fintoc funciona como un intermediario de pagos y conexión bancaria a través de una API, permitiendo a otras empresas (fintechs, e-commerce, etc.) conectar sus aplicaciones directamente con las cuentas bancarias de sus usuarios de forma segura, simplificando pagos, conciliación y acceso a información financiera.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="MOIC" value="12.46x" />
          <StatCard label="Inversión" value="$65K por 10%" />
          <StatCard label="Valoración entrada" value="$650K post-money" />
          <StatCard label="ARR hoy" value="$8M+ (Q4 2025)" />
        </div>
      </div>
      <div className="px-6">
        <CaseSection title="Resumen ejecutivo">
          <Body>De $19K ARR (julio 2020) a $8M+ ARR (Q4 2025). Primera inversión histórica de Platanus (enero 2020). Primera inversión de Monashees en Chile (abril 2021). Tercera startup chilena en ser apoyada por Y Combinator (2021). Series A liderada por Monashees + Propel Ventures (abril 2024, $7M a $29M valuation). Capital Efficiency: $8M ARR con $10.3M levantados = 0.78x Capital/ARR ratio (top decile para infraestructura fintech en LatAm).</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Fintoc fue nuestra primera inversión histórica en enero de 2020.</Body>
          <Body>Cristóbal Griffero (CEO) trabajaba como desarrollador en Platanus Software Factory (la versión anterior de Platanus Venture Capital). Además de ser desarrollador, había construido diferentes empresas fintech. En general conocía muy bien el espacio fintech.</Body>
          <Body>Había visto que en el ecosistema de Platanus había varias fintechs scrapeando bancos — Buda, Fintual, Chipax, SimpleDTE. Cada una estaba perdiendo tiempo de desarrollo en infraestructura en lugar de su producto core. Estaba considerando armar una API para extraer datos de cuentas bancarias (el "Plaid de Latinoamérica").</Body>
          <Body>Por su lado, Lukas Zorich (CTO) aplicó como solo founder a nuestra primera generación, tenía la misma idea que Griffero. Lukas había estudiado Ingeniería en Computación en la Universidad Católica de Chile y tenía un magíster en Machine Learning con Karim Pichara, fundador de NotCo. Llevaba programando desde los 15 años.</Body>
          <Body>Había hecho dos pasantías en Google. Después de terminar la carrera, Google le ofreció una posición full-time, pero la rechazó porque quería emprender. Había tenido varios proyectos anteriores que no funcionaron. De hecho, la idea de Fintoc nació de un dolor que él sufría. En su startup anterior necesitaba saber quiénes le habían depositado en la cuenta corriente, pero no había forma fácil de lograrlo sin desarrollar algo custom. Lukas entendía el problema desde adentro ya que lo había vivido como founder.</Body>
          <Body>Lukas quiso postular a Platanus porque le interesaba vender a las fintechs que había en nuestra red, y recibir mentoría de los socios de Platanus.</Body>
          <Body>Entrevistamos a ambos para nuestro primer programa. Los dos eran técnicos, pero Griffero tenía una beta comercial muy desarrollada. Los introdujimos y les invertimos USD 65,000 por un 10% de la empresa. Lo que nos gustó fue: fundadores técnicos, con talento comercial, desarrollando una solución para otra gente técnica; conocían el problema de primera mano; y resolvían un problema estructural latinoamericano.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Cristóbal Griffero — CEO"
              role="Co-fundador"
              bio="Trabajaba como desarrollador en Platanus Software Factory. Además de ser desarrollador, había construido diferentes empresas fintech. Conocía muy bien el espacio fintech y había visto que varias startups del ecosistema scrapeaban bancos en lugar de conectarse directamente. Tenía una beta comercial muy desarrollada al momento de unirse al programa."
            />
            <PersonCard
              name="Lukas Zorich — CTO"
              role="Co-fundador"
              bio="Ingeniería en Computación en la Universidad Católica de Chile + Magíster en Machine Learning con Karim Pichara (fundador de NotCo). Llevaba programando desde los 15 años. Dos pasantías en Google; rechazó posición full-time para emprender. La idea de Fintoc nació de un dolor que vivió como founder: necesitaba saber quiénes le depositaban en su cuenta y no había forma fácil de lograrlo."
            />
          </div>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body>Trabajamos juntos mediante nuestro programa de aceleración desde enero hasta agosto de 2020. Les ofrecimos:</Body>
          <Body>Una junta semanal con el team Platanus. Una junta cada 2 semanas con fundadores top de Chile. Espacio de oficina para que compartieran con las otras 3 startups del batch. Demo Day al final del programa para ayudarlos a armar su estrategia de fundraising, narrativa y presentarles a otros inversionistas ángeles.</Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Platanus", fecha: "Ene 2020", monto: "$65K", valoracion: "$650K", investors: "Platanus" },
            { ronda: "Demo Day", fecha: "Sep 2020", monto: "$213K", valoracion: "$6M", investors: "Ángeles" },
            { ronda: "Seed", fecha: "Abr 2021", monto: "$3M", valoracion: "$16M", investors: "Monashees, Y Combinator, Soma Capital, Harvard Management Company, execs de Meta y Stripe" },
            { ronda: "Series A", fecha: "Abr 2024", monto: "$7M", valoracion: "$29M", investors: "Monashees (follow-on), Propel Ventures" },
          ]} />
        </CaseSection>
        <CaseSection title="Take-aways del negocio">
          <Body><span className="text-black">22x crecimiento ARR de 2021 a 2025.</span></Body>
          <Body><span className="text-black">Alta eficiencia de capital:</span> lograron $8M ARR con $10.3M en levantamiento (0.78x ratio ARR/Capital Raised).</Body>
          <Body><span className="text-black">Seleccionamos a un equipo que también era interesante para top-tier investors:</span> Monashees hizo su primera apuesta en Chile con Fintoc. Les hicieron follow-on en su Serie A; también invirtieron Y Combinator y Propel Ventures.</Body>
          <Body><span className="text-black">Bajo churn y captación del mercado que tenían otros competidores:</span> startups mexicanas los han ido prefiriendo frente a Belvo.</Body>
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-black">Estar en el origen te da acceso a las mejores valuaciones:</span> 8 meses después de nuestra inversión, la empresa ya levantó a una valuación 10x más alta. 15 meses después, levantó a ~25× nuestra inversión.</Body>
          <Body><span className="text-black">Comunidad tech esencial para deal-flow:</span> fue gracias a la comunidad de desarrolladores de la fábrica de software que estos fundadores gravitaban en torno a Platanus.</Body>
          <Body><span className="text-black">Comunidad de startups clave para detectar problemas:</span> en nuestro ecosistema había varias fintechs que sufrían el mismo dolor; gracias al acceso que Platanus le daba a Fintoc a esas startups, pudieron detectarlo.</Body>
          <Body><span className="text-black">Comunidad como fuente de clientes:</span> la comunidad de startups es instrumental, porque sirve como primeros clientes a las startups que están naciendo.</Body>
          <Body><span className="text-black">Buen timing de mercado al momento de invertir:</span> estaban bien posicionados para la ola de open banking latinoamericano.</Body>
          <Body><span className="text-black">Capital paciente:</span> el capital pre-semilla en LatAm exige paciencia, pero quienes aguantan esta tensión capturan valuaciones de entrada 10-20x más bajas y retornos finales proporcionalmente más altos cuando el negocio finalmente escala.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseToku() {
  return (
    <div className="border border-black/10 bg-black/5 mb-4">
      <div className="p-6 border-b border-black/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">Génesis · 2021</p>
            <a href={CASE_LOGOS.toku.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src={CASE_LOGOS.toku.avatar} alt="Toku" width={24} height={24} className="size-6 object-cover" />
              <h3 className="font-sans font-medium text-black" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Toku</h3>
            </a>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono uppercase font-medium text-xs px-2 py-0.5">El caso que valida la tesis</span>
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-5">
          Toku automatiza todo el proceso de cobranza y gestión de pagos recurrentes, ayudando a empresas con alto volumen a cobrar mejor y más rápido.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="MOIC" value="76.81x" />
          <StatCard label="Inversión" value="$50K por 7%" />
          <StatCard label="Valoración entrada" value="$715K post-money" />
          <StatCard label="ARR actual" value="$16M (Q3 2025)" />
        </div>
      </div>
      <div className="px-6">
        <CaseSection title="Resumen ejecutivo">
          <Body>De $18K ARR (agosto 2020) a $16M ARR (Q3 2025) = <span className="text-black">889x crecimiento en 5 años</span>. Platanus es el primer inversionista institucional de Toku (marzo 2021). Primeras mujeres chilenas en ser apoyadas por Y Combinator (junio 2021). Late Seed liderado por F-Prime Capital (marzo 2022, $7M a $42M valuation). Serie A liderada por Oak HC/FT (abril 2025, $48M a $180M valuation) — la Serie A más grande de LatAm liderada por una mujer. ARR se ha duplicado por tercer año consecutivo (2023–2025). Operando en 3 países: Chile, México y Brasil con 260 personas en el equipo.</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Conocimos a Cristina Etcheberry, Francisca Noguera y Enzo Tamburini en enero de 2021, cuando se inscribieron al "Build Sprint" de Platanus, una especie de pre-programa de aceleración.</Body>
          <Body>En ese momento, Toku recién estaba empezando. Tenían apenas 4 clientes pagando por su software de automatización de cobranzas.</Body>
          <Body>Durante el Build Sprint (que duraba 4 semanas), cada equipo debía fijarse una meta y reportar avances semanalmente. La meta de Toku era ambiciosa: duplicar sus clientes de 4 a 8. No era fácil. Sus clientes no eran pymes, eran corporaciones grandes, y ya existían muchos softwares intentando resolver lo mismo.</Body>
          <Body>Cuando estábamos cerrando el Build Sprint, parecía que no iban a lograrlo. Pero entonces llegó el último reporte: habían cerrado 3 nuevos clientes esa semana. <span className="text-black">Prometieron 8, entregaron 9.</span></Body>
          <Body>Decidimos invertir en Toku y fuimos su primer inversionista institucional. Lo que nos convenció fue el equipo.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Cristina Etcheberry — CEO"
              role="Ex CPO/COO"
              bio="Tenía una experiencia laboral relativamente incipiente, pero tanto sus compañeros del colegio como de la universidad hablaban de ella con admiración y decían 'apuesto porque Cristina será la más exitosa del grupo'. En nuestros primeros contactos con ella, nos pareció que era la clara líder entre los 3 fundadores. Tenía mucha claridad mental y capacidad de empuje. Eventualmente pasó a ser la CEO de Toku."
            />
            <PersonCard
              name="Francisca Noguera — CRO"
              role="Ex CEO"
              bio="Habilidades comerciales probadas (posicionó CMR Puntos como el programa de fidelización más grande de Chile), capacidad de negociación y liderazgo excepcionales. Actualmente es la CRO de Toku."
            />
            <PersonCard
              name="Enzo Tamburini — VP of Engineering"
              role="Ex CTO"
              bio="Talento técnico de alto nivel (ayudante jefe de programación avanzada por 3 años), capacidad de resolver problemas complejos de escalabilidad. Actualmente es VP of Engineering en Toku."
            />
          </div>
          <Body>Lo que vimos en ellos: <span className="text-black">Skin in the game</span> — financiaron sus primeros meses de operación con un pequeño aporte de capital de cada uno (USD 2.5k por founder). <span className="text-black">Build sprint</span> — equipo con gran capacidad de ejecución, disciplina y foco. <span className="text-black">Data-driven deciders</span> — obsesión por los números y la calidad de los entregables.</Body>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body>Para la generación 2021-1 aplicaron aproximadamente 200 startups, y seleccionamos a 4 de ellas. Trabajamos juntos desde febrero hasta junio, acompañándolos con nuestro programa de aceleración.</Body>
          <Body>El programa consistía en Coliseos: reuniones bi-semanales donde todas las startups del batch se reúnen con 3 mentores — Pedro Pineda (CEO de Fintual), Agustín Feuerhake (Fundador de Platanus) y Jaime Bünzli (CEO Buda.com). Acá se conversaba sobre el cumplimiento de metas que se habían puesto en el coliseo anterior y discutían sobre las cosas estratégicas del negocio. El programa está orientado al accountability, a generar competencia sana entre las startups y a acelerar el crecimiento de los negocios antes del demo day.</Body>
          <Body>Check-in semanal: cada startup se juntaba de manera individual con el team Platanus, donde discutíamos temas de sus negocios y entendíamos qué teníamos que hacer para apoyarlas mejor.</Body>
          <Body>Demo Day: el final del programa estaba marcado por un evento de levantamiento de capital online donde asistieron aproximadamente 70 inversionistas. No es un evento abierto a cualquiera, las personas tenían que aplicar como inversionistas y sólo se admite a las personas con posibilidades e intenciones reales de invertir. Antes del demo day, apoyamos a las startups para preparar su levantamiento: discutimos las condiciones de la ronda, estrategias efectivas para levantar, los ayudamos con la narrativa y les presentamos a inversionistas. <span className="text-black">Toku sobresuscribió su ronda, levantando más de USD $1M en 3 días.</span></Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Platanus", fecha: "03/2021", monto: "$50,000 USD", valoracion: "~$715,000 USD", investors: "Platanus (Genesis Fund) — primer ticket institucional" },
            { ronda: "Demo Day / Pre-seed", fecha: "09/2021", monto: "$2,100,000 USD", valoracion: "$15,000,000 USD", investors: "Y Combinator, Clocktower Ventures" },
            { ronda: "Seed", fecha: "03/2022", monto: "$7,000,000 USD", valoracion: "$42,000,000 USD", investors: "Wollef, F-Prime Capital" },
            { ronda: "Serie A", fecha: "04/2025", monto: "$48,000,000 USD", valoracion: "$180,000,000 USD", investors: "Oak HC/FT, F-Prime, Gradient Ventures (Google), Clocktower Ventures, Y Combinator, Honey Island by 8UM" },
          ]} />
        </CaseSection>
        <CaseSection title="Take-aways del negocio">
          <Body><span className="text-black">De 4 a 450 clientes en 4 años:</span> crecimiento sostenido de 4 clientes corporativos en enero 2021 a 450 clientes en abril 2025.</Body>
          <Body><span className="text-black">Expansión geográfica exitosa:</span> de operar solo en Chile a tener presencia en 3 mercados (México, Brasil y Chile).</Body>
          <Body><span className="text-black">Escalamiento del equipo:</span> de 3 fundadores a 170 personas en 4 años.</Body>
          <Body><span className="text-black">Confianza de inversionistas top-tier:</span> seleccionamos a un equipo que también resultó interesante para inversionistas de primer nivel como Oak HC/FT, F-Prime, Gradient Ventures (Google), Y Combinator y Honey Island by 8UM.</Body>
          <Body><span className="text-black">Capital Efficiency:</span> $16M ARR con $57M levantados = 0.28x Capital/ARR ratio (top decile para B2B SaaS en LatAm).</Body>
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-black">En pre-semilla todo puede cambiar:</span> el mercado, la solución, el modelo de negocios. La única constante es el equipo. Toku, Fintoc, Grupalia y Bemmbo pivotearon su modelo en algún momento, por lo que tenemos claro que lo que más importa en pre-semilla es invertir en equipos con agencia y ambición.</Body>
          <Body><span className="text-black">La ventaja estructural de Platanus:</span> la mayoría de los VCs en la región invierten en Seed o Series A, cuando las valuaciones ya reflejan tracción validada. El alpha está en el pre-seed, pero necesita capacidad de detección antes de la validación de mercado. Muchas de las mejores oportunidades pasan de una ronda angel a aplicar a fondos tier 1 de Estados Unidos, como Y Combinator, saltándose los fondos locales. La única forma de competirle a YC es entrar antes que YC. Platanus ha construido esa capacidad.</Body>
          <Body><span className="text-black">La comprobación de nuestro modelo:</span> Toku es el fund returner del fondo Génesis de Platanus. En diciembre del 2022 logramos vender secundarias de Toku en su Serie A — esto dejó el DPI en 1.41x. Todavía tenemos ~2% de Toku. MOIC de 76.81x: nuestra inversión de $50K tiene hoy un valor total de $3,840,576 USD.</Body>
          <Body>Entramos temprano con tickets chicos y valoraciones bajas, lo que permite que cuando el mercado internacional valida la startup, el múltiplo sea significativo. Con Toku pasó eso: levantaron una Serie A relevante con fondos globales y hubo liquidez parcial para inversionistas iniciales como nosotros, que logramos devolver el fondo en menos de dos años, manteniendo participación en la empresa. Esto valida nuestro enfoque en Platanus ya que muestra que es clave invertir en fundadores técnicos con agencia en etapa muy temprana para poder obtener un porcentaje interesante de sus startups, y a su vez evidencia que basta con que solo algunos casos funcionen para generar DPI real.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseBemmbo() {
  return (
    <div className="border border-black/10 bg-black/5 mb-4">
      <div className="p-6 border-b border-black/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">Fondo I · 2022</p>
            <a href={CASE_LOGOS.bemmbo.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src={CASE_LOGOS.bemmbo.avatar} alt="Bemmbo" width={24} height={24} className="size-6 object-cover" />
              <h3 className="font-sans font-medium text-black" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Bemmbo</h3>
            </a>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono uppercase font-medium text-xs px-2 py-0.5">Primer exit Fondo I</span>
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-5">
          Bemmbo automatiza rendiciones, conciliaciones bancarias y la gestión de cuentas por pagar y por cobrar, ayudando a empresas a eliminar procesos manuales y reducir errores contables.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="MOIC" value="3.97x" />
          <StatCard label="TIR bruta" value="53.73%" />
          <StatCard label="Inversión" value="$100K por 7%" />
          <StatCard label="Exit" value="$6M (Buk, ago 2025)" />
        </div>
      </div>
      <div className="px-6">
        <CaseSection title="Resumen ejecutivo">
          <Body>De $115 MRR (septiembre 2021) a $67,000 MRR (junio 2025) = <span className="text-black">582x crecimiento en ~4 años</span>. Estado al momento del exit: 100+ clientes, NPS de 60, crecimiento lento a moderado. Quintuplicaron ventas en los últimos 2 años. Adquirida por Buk en agosto 2025 para convertirse en su brazo financiero. Retorno en 3.3 años.</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>La historia de Bemmbo empieza con Rodrigo Oyarzún, 3 semanas después de salirse de Cacttus, una startup en la que había sido socio y en la que Platanus había invertido para su tercer batch. Rodrigo estaba obsesionado con demostrarle a Platanus que merecía que le invirtiéramos una segunda vez.</Body>
          <Body>Antes había trabajado en el negocio ferretero de su papá, donde notó que los procesos de pago a proveedores eran manuales e ineficientes. Vio la oportunidad de digitalizar ese proceso con un producto fintech. Participó de una versión de nuestro Build Sprint, un programa de pre-aceleración de Platanus donde solo ofrecemos apoyo. Su perfil es principalmente comercial, pero igual desarrolló un producto no-code usando una herramienta llamada Bubble. Con ese MVP cerró a sus primeros 3 clientes y empezó a facturar.</Body>
          <Body>Por su lado, Cristóbal Dotte estaba construyendo una plataforma de educación para gamers. Cris, igual que Rodrigo, era parte del Build Sprint de Platanus. Estaba muy entusiasmado con la tecnología, pero no fue capaz de generar revenue durante el programa de pre-aceleración. Antes de participar del Build Sprint, Cristóbal había aplicado a un cargo de ingeniero de software en Platanus Software Factory, por lo que ya lo conocíamos.</Body>
          <Body>Rodrigo mandó un mensaje en el Discord de Platanus buscando socio técnico, y conectaron. Se asociaron y Platanus les invirtió, convirtiéndose en la primera startup en la que invertimos con el Fondo I.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Rodrigo Oyarzún — CEO"
              role="Head of Growth ex-Cornershop, ex-socio Cacttus (batch 3 de Platanus)"
              bio="Vendía antes de tener un producto, se sentaba con clientes a observar sus procesos, y construía el producto in situ. Tenía una buenísima habilidad comercial, cerraba contratos con empresas grandes previo a tener la solución construida."
            />
            <PersonCard
              name="Cristóbal Dotte — CTO"
              role="Ingeniero de software"
              bio="Gran capacidad técnica. Había construido una plataforma de educación para gamers antes de Bemmbo. Su perfil complementaba muy bien a Rodrigo. Logró atraer talento excepcional al equipo, incluyendo a Jonathan Chávez (hoy fundador de ZeroEval en Y Combinator), quien había postulado a Platanus con 21 años y estaba trabajando en Google."
            />
          </div>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body>Bemmbo hizo nuestro programa de aceleración, donde los apoyamos con mentorías, redes y aumentando sus chances de levantamiento posterior con el Demo Day.</Body>
          <Body><span className="text-black">Mentoría estratégica con Jaime Arrieta (CEO de Buk):</span> el programa de aceleración de Platanus tiene una instancia llamada "Coliseo", donde las startups van mostrando sus avances frente a un grupo de 2-3 mentores ultra selectivos con su tiempo. De hecho, todos los mentores que apoyan a las startups de Platanus son fundadores que han construido cosas notables en LatAm y el mundo. En ese tiempo, Buk era una startup con un crecimiento increíble, que había nacido bootstrapped. Eran un bicho raro en el segmento VC, y Jaime Arrieta, su CEO, nos parecía que tenía una claridad mental envidiable. Lo invitamos a ser mentor y la primera startup que le tocó mentorear fue Bemmbo.</Body>
          <Body>Rodrigo estrujaba sus 13 minutos cada dos semanas con él, siempre llegaba muy bien preparado, con avances que mostrar y buenas preguntas para hacer. En el tiempo que no estaba con Jaime, escuchaba podcasts de Jaime. Construyeron una relación. Con el tiempo Jaime no solo se convirtió en mentor, sino en inversionista ángel de Bemmbo en su Demo Day, y eventualmente en el comprador de la empresa.</Body>
          <Body><span className="text-black">Conexión con talento de primer nivel:</span> algo muy difícil para las startups en etapas tempranas es atraer a talento técnico de buen nivel. Jonathan Chávez había postulado a Platanus con 21 años con una startup. Le habíamos querido invertir, pero aceptó un cargo en Google. Mantuvimos contacto y cuando Bemmbo nos contó que estaban buscando a su primer ingeniero mexicano, Paula presentó a Jonathan con Cristóbal, quien logró convencerlo de sumarse a Bemmbo. Jonathan después trabajó en DataDog y posteriormente fundó ZeroEval y fue aceptado en Y Combinator, demostrando que su nivel de talento era de primer nivel.</Body>
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-black">1. La comunidad como "moat" en un fondo pre-seed:</span> la historia de Bemmbo es un caso perfecto de cómo funcionan los efectos de red de una comunidad. Rodrigo (ex-Cactus batch 3) se conecta con Cristóbal (participante del Build Sprint). Los conectamos con Jaime Arrieta (mentor, después inversionista en el demo day y después comprador). Los conectamos con Jonathan Chávez (ex-aplicante a Platanus y después empleado clave de Bemmbo). Rodrigo cierra su ronda en Demo Day con ángeles del ecosistema Platanus. Bemmbo se vende a Buk, empresas que se conocieron a través de Platanus.</Body>
          <Body><span className="text-black">2. Pre-seed permite exits "pequeños" con retornos reales:</span> $6M es un exit pequeño para una startup, pero como invertimos a $1.43M post-money, generamos 3.97x MOIC. La mayoría de los VCs en LatAm no pueden hacer esto. Cuando invierten en Seed a $10M-$25M de valoración, necesitan exits de $50M+ para generar retornos de 3x-5x. Esos exits son escasos en LatAm. En esta venta, los únicos inversionistas que lograron retornos fueron los ángeles que entraron antes de Platanus (~7x) y Platanus (3.97x). Los demás obtuvieron retornos cercanos a 1x o directamente menores. Esto comprueba nuestra tesis: para obtener MOICs de 3-10x en exits "pequeños" ($6M), necesitas haber entrado en pre-semilla.</Body>
          <Body><span className="text-black">3. La tesis de exit en secundarias se comprueba:</span> en un fondo exitoso, 27% de las startups retornan entre 1x-10x. Bemmbo está exactamente en este rango (3.97x). Lo crítico es que estos retornos early pavimentan el camino para los grandes exits. Un DPI de 0.02x hoy es parte del plan. Necesitamos estos exits de 3-5x cada 1-2 años mientras esperamos que las empresas más prometedoras lleguen a 50x-100x. La única forma de poder salir en secundarias a estas valoraciones y obtener retornos decentes es haber entrado a la menor valoración posible en pre-semilla.</Body>
          <Body><span className="text-black">4. Reciclaje y re-invención de talento:</span> Rodrigo y Cristóbal son fundadores con un exit. Serán potenciales ángeles, referentes para otros founders, alguien que dentro de 10 años podría estar adquiriendo startups de otros que hoy están recién empezando. Ese es el círculo virtuoso que buscamos en Platanus: juntar el conocimiento, el capital y las oportunidades, para que se multipliquen.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseGrupalia() {
  return (
    <div className="border border-black/10 bg-black/5 mb-4">
      <div className="p-6 border-b border-black/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">Fondo I · 2022</p>
            <a href={CASE_LOGOS.grupalia.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src={CASE_LOGOS.grupalia.avatar} alt="Grupalia" width={24} height={24} className="size-6 object-cover" />
              <h3 className="font-sans font-medium text-black" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Grupalia</h3>
            </a>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono uppercase font-medium text-xs px-2 py-0.5">Potencial fund returner</span>
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-5">
          Grupalia es el primer neobanco para micronegocios en América Latina. Digitalizan préstamos grupales, ofreciendo a microemprendedores en México créditos 4x más rápidos y más económicos que las alternativas tradicionales.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="MOIC" value="2.46x" />
          <StatCard label="Inversión total" value="$400K (6.57%)" />
          <StatCard label="ARR actual" value="$3M (dic 2025)" />
          <StatCard label="NPL" value="2.5–3.5%" />
        </div>
      </div>
      <div className="px-6">
        <CaseSection title="Resumen ejecutivo">
          <Body>Desde $50 revenue (noviembre 2023) a $3M ARR (diciembre 2025) = <span className="text-black">4.7x crecimiento en 24 meses</span>. Cash flow positive en 10 meses desde primer préstamo (agosto 2024). NPLs de 2.5–3.5% — comparable con Banco Compartamos (3.2%), el líder de mercado con 30+ años de experiencia. Estructura de costos 50% más eficiente que Compartamos. Capital efficiency: $3M ARR con ~$3M en equity levantado (~1.07x ratio).</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Ramón fue el primer empleado de Platanus, era un prodigio estudiante de ingeniería de software el año 2021. Gran parte de nuestro software Kalio lo construyó él, dejó su legado tech en Platanus.</Body>
          <Body>A Roger lo conocimos hace muchos años, cuando estaba en Atrato, un fintech BNPL mexicano respaldado por Accel y Y Combinator, que había originado más de $60M en préstamos. Se salió de Atrato y Paula lo invitó como nuestro primer Visiting Partner en Platanus el 2022. Roger armó una buena parte del contenido práctico que se aloja en nuestra plataforma y una parte importante del programa de aceleración, su legado sigue muy vigente. En Platanus conoció a Ramón, y un año después ambos decidieron emprender juntos para armar Reality.</Body>
          <Body>El plan con Reality era comprar y consolidar software businesses verticales, optimizándolos con tecnología. La idea era razonable, pero lo que nos convenció fue el equipo: Roger había demostrado que podía escalar un fintech desde cero; Ramón tenía la capacidad técnica para construir productos de alta calidad, rápido; y habíamos trabajado con ambos y nos generaban admiración. En abril 2023, invertimos $150K a $5M cap, convirtiéndonos en su primer y único inversionista institucional.</Body>
          <Body>Los siguientes 6 meses desarrollaron el plan de buscar y adquirir SaaS, compraron 2 empresas. En ese tiempo se dieron cuenta de que las mejores oportunidades eran caras o los founders no querían vender. Las baratas o accesibles para este modelo tenían problemas estructurales que terminaban por convertirles en compras mediocres.</Body>
          <Body>En octubre 2023 pivotearon. Roger identificó una oportunidad más grande en dar créditos grupales en México. Los créditos grupales son un producto crediticio donde grupos pequeños de microemprendedores son avales el uno del otro. El principal referente de mercado es Banco Compartamos, que es el banco más rentable de México. A pesar de que este tipo de préstamos tiene NPLs bajos (menos del 3%), obtener uno para los emprendedores era lento, presencial, tasas de 100% APR y todo realizado con papel y lápiz.</Body>
          <Body>El equipo de Grupalia vio la oportunidad de construir un banco como Banco Compartamos, pero 100% digital. Avanzaron a un ritmo bien impresionante: en 4 semanas diseñaron el producto crediticio completo, contrataron a un key-hire (ex-CRO de una de las SOFIPOs líderes en group lending) y armaron las políticas de riesgo. Además, construyeron la primera versión entera de la plataforma, incluyendo onboarding, KYC, underwriting, loan management, collections y la infraestructura de pago. A la semana 7 ya habían otorgado los primeros créditos a dos grupos en Texcoco.</Body>
          <Body>Teníamos buenas evidencias de que este era un equipo con agencia, capaz de identificar buenas oportunidades, de avanzar rápido y de atraer a buen talento. En marzo del año siguiente, decidimos hacer double down de la inversión en Grupalia, invirtiendo $250K a un CAP de $7M.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Roger Rea — CEO"
              role="Fundador de Atrato (Accel, YC)"
              bio="Track record liderando una fintech en México. Fundó Atrato desde cero y la llevó a más de $60M en volumen de préstamos antes de salirse. Conocimiento profundo del ecosistema, relaciones con reguladores, y experiencia operando un lending business. Como Visiting Partner en Platanus, demostró capacidad para sintetizar conocimiento complejo y empírico en guías accionables. Muy orientado a los unit economics y a la eficiencia de capital. En nuestras conversaciones sobre Grupalia, su obsesión siempre fue construir una empresa numéricamente saludable, no crecimiento a cualquier costo."
            />
            <PersonCard
              name="Ramón Echeverría — CTO"
              role="Primer empleado de Platanus, constructor de Kalio"
              bio="Talento técnico excepcional. Como primer empleado de Platanus, construyó Kalio, nuestro software interno, prácticamente solo. En las primeras semanas de Grupalia construyó toda la plataforma en menos de un mes. Su capacidad para sacar productos rápido sin sacrificar calidad fue evidente desde sus días en Platanus. Construyó la app de Android de Grupalia que hoy tiene 4.9 estrellas en Google Play con +5,000 descargas."
            />
          </div>
          <Body>Lo que vimos en ellos: sabíamos que ambos trabajaban bien, dado su paso por Platanus. De Roger nos gustó su track record y su humildad. Había escalado un fintech antes, pero reconocía que los préstamos grupales eran bastante diferentes a lo que ya conocía. Lo primero que hizo fue contratar a un experto en risk management de la industria y pasó semanas estudiando el modelo hasta entenderlo en profundidad. Roger había trabajado con el segmento de microemprendedores en Atrato, entonces había founder-market fit. A Ramón de cierta manera lo formamos, y sabíamos lo rápido que es capaz de construir productos de primera calidad. Nos dio y da confianza su disciplina con el capital: autofinanciaron los primeros meses, con sueldos sumamente bajo mercado, diseñaron el negocio para ser eficiente en capital y en sus investor updates incluían análisis de cohortes, vintage performance, siempre sumamente ordenados con sus finanzas y reportes.</Body>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body>A pesar de que ambos conocían muy bien Platanus, la red y el programa, decidieron hacer nuestro programa de aceleración el primer semestre del año 2024. Al equipo de Grupalia los mentorearon 3 fundadores con conocimiento en fintech, productos digitales y regulación.</Body>
          <Body><span className="text-black">Agustín Feuerhake (CPO — Fintual):</span> ingeniero de software de la Pontificia Universidad Católica de Chile. Siempre ha emprendido, vendiendo una de sus primeras startups a Pedidos Ya el 2016. Es co-fundador de Platanus software factory y de Fintual. Fintual es una fintech regulada por la CNBV (México) y CMF (Chile) que ofrece una plataforma 100% digital para ahorrar e invertir de forma simple. Levantaron su Serie B con Sequoia Capital.</Body>
          <Body><span className="text-black">Iñigo Rumayor (CEO — Monato):</span> estudió Economía en la Universidad de Pennsylvania. Es co-fundador de Arcus, una plataforma de pagos multi-riel y la segunda entidad no bancaria con conexión directa al SPEI en México. En 2021, Arcus fue adquirida por Mastercard. Después fundó Monato, una empresa dedicada a facilitar el acceso de las empresas a productos e infraestructura financiera.</Body>
          <Body><span className="text-black">Jaime Bünzli (CEO — Buda.com):</span> ingeniero de software de la Pontificia Universidad Católica de Chile. Anteriormente se desempeñó como CEO en Platanus software factory y fue Director por casi seis años en Fintual. Ahora Jaime ejerce como CEO de buda.com, un exchange de criptomonedas líder y pionero en Latinoamérica.</Body>
          <Body>Estos fundadores se juntaban con Roger y Ramón al menos una vez cada dos semanas, para que les contaran sobre sus avances y qué cosas les quitaban el sueño en ese momento. Así, los ayudaron a navegar los diferentes escenarios que fueron enfrentando durante las 12 semanas que dura el programa. Después del programa, Grupalia levantó su ronda Pre-seed, donde Platanus los ayudó a estructurar la ronda y les hizo diferentes introducciones a VCs que terminaron participando de sus rondas.</Body>
          <Body>Además, durante el programa de Platanus conocieron a <span className="text-black">Eric Schwartz</span>, que se desempeñaba como Visiting Partner en Platanus en esa época. Eric tiene más de una década trabajando en fintechs. Primero armó la estrategia de créditos de Payoneer (listada en Nasdaq). Levantó más de $150M en deuda, y los productos que armó fueron distribuidos en 14 países y dieron más de $1B en préstamos. Se fue a vivir a México hace 4 años, donde lideró la estrategia de Covalto (antes Credijusto), una de las fintechs más grandes del país. Es inversionista ángel activo en fintechs, edtechs y healthtechs en Latam. Eric eventualmente se convirtió en advisor e inversionista de Grupalia, posicionándose como un elemento importante para la definición de su estrategia y progreso.</Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Reality (Platanus)", fecha: "04/2023", monto: "$150,000 USD", valoracion: "$5,000,000 cap", investors: "Platanus (Fondo I) — primer ticket institucional" },
            { ronda: "Grupalia Angel Round", fecha: "10/2023–03/2024", monto: "~$350,000 USD", valoracion: "$5,000,000 cap", investors: "Platanus, Alex Chavez (Atrato), CAPEM, ángeles" },
            { ronda: "Pre-seed", fecha: "07/2024", monto: "$767,500 USD", valoracion: "$7,000,000 cap", investors: "Platanus ($250K adicional), Semilla Ventures, Innogen Capital, R2 Ventures, ángeles" },
            { ronda: "Seed", fecha: "12/2025", monto: "$1,850,000 USD", valoracion: "$15,000,000 cap", investors: "Undisclosed" },
            { ronda: "Deuda", fecha: "2025", monto: "$2M facility", valoracion: "—", investors: "Addem Capital" },
          ]} />
        </CaseSection>
        <CaseSection title="Take-aways del negocio">
          <Body><span className="text-black">Tracción excepcional en 2 años:</span> de $50 revenue a $2.8M ARR (56,000x), credit performance comparable al líder de mercado (NPLs 2.5–3.5%), y cash flow positive en 10 meses.</Body>
          <Body><span className="text-black">Ventaja tech en industria intensiva en capital humano:</span> lograron una estructura de costos 50% más eficiente que Banco Compartamos (líder de mercado con 2.8M clientes) en Cost to Serve por customer activo, gracias a automatización de underwriting, collections y servicing.</Body>
          <Body><span className="text-black">Capital efficiency sólida:</span> Grupalia alcanzó $2.8M ARR con ~$3M en equity levantado. Ratio Capital/ARR de ~1.07x es sólido para fintech en etapa temprana, especialmente considerando que construyeron toda la infraestructura tecnológica desde cero.</Body>
          <Body><span className="text-black">Credit performance comparable a Banco Compartamos:</span> NPLs entre 2.5–3.5% vs. 3.2% de Compartamos. Esto en una startup de 2 años vs. un banco con 30+ años de experiencia y miles de millones en volumen.</Body>
          <Body><span className="text-black">Cash flow positive en 10 meses:</span> alcanzaron breakeven operativo en agosto 2024, solo 10 meses después de originar su primer préstamo. La mayoría de lending fintechs tardan 2–3 años.</Body>
          <Body><span className="text-black">Nativos en AI desde el día 1:</span> implementaron "Francisco", un LLM-based collections agent, en marzo 2024. Automatizaron verificación de identidad con computer vision. Construyeron sistemas de prevención de fraude y underwriting usando AI antes de tener volumen significativo. Esto les dio ventaja competitiva antes de que AI se volviera mainstream.</Body>
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-black">Validación de tesis pre-semilla: apostar principalmente en equipos y hacerlo temprano.</span> En pre-semilla todo puede cambiar. El mercado, el producto, el modelo de negocios, etc. Lo que se mantiene constante son las personas detrás del negocio, es por esto que siempre hemos priorizado la inversión en equipos como máxima. En el caso de Grupalia, invertimos en Roger y Ramón cuando estaban construyendo una suerte de Private Equity digital y ahora tenemos en el portafolio un neobanco para microemprendedores mexicanos con buen potencial de convertirse en el fund returner del Fondo I. Si ejecutan su plan de llegar a $8M de ARR durante el 2026, nuestro MOIC sería aproximadamente entre 6-8x en alrededor de 3 años. Aún quedarían 6 años para el cierre del fondo.</Body>
          <Body><span className="text-black">El valor de Platanus es primeramente su comunidad y su programa de apoyo.</span> Roger y Ramón no necesitaban hacer el programa para conseguir financiamiento ni validación, pero optaron por hacerlo porque conocían el valor que genera en términos de accountability, acceso a una red curada de otros fundadores de primer nivel y a acompañamiento de pares que están en situaciones similares. Dentro del marco del programa, se insertaron en la comunidad de Platanus, y conocieron a personas de la comunidad que eventualmente probarían ser estratégicas para su negocio. Sus mentores Agustín Feuerhake e Iñigo Rumayor invirtieron en Grupalia después de trabajar con ellos. Eric Schwartz, parte del equipo de Platanus, se convirtió en su inversionista y advisor.</Body>
          <Body><span className="text-black">Los mejores fundadores pivotean rápido y el programa los ayuda.</span> Al igual que Toku, el equipo de Grupalia rápidamente se dio cuenta de que su idea original no era lo suficientemente interesante como para ser gigante. En 6 meses tomaron la decisión de cambiar su foco y rápidamente encontraron un espacio mejor para desarrollar una solución. Pivotear suena sencillo, pero dado el "sesgo de costo hundido" con el que operamos los humanos, tiende a ser una decisión difícil para los fundadores. Los mejores saben que tienen tiempo y capital limitado, y son capaces de evitar ese error cognitivo, e ir por las mejores oportunidades a pesar del trabajo ya invertido en su startup anterior. Lo que nosotros hemos aprendido es que a través de nuestro programa, se acelera la conclusión de pivotear cuando es necesario y se evita un malgasto de recursos en una solución que no tenía futuro.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseBoom() {
  return (
    <div className="border border-black/10 bg-black/5 mb-4">
      <div className="p-6 border-b border-black/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider mb-1">Cavendish · 2025</p>
            <a href={CASE_LOGOS.boom.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src={CASE_LOGOS.boom.avatar} alt="Boom" width={24} height={24} className="size-6 object-cover" />
              <h3 className="font-sans font-medium text-black" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Boom</h3>
            </a>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono uppercase font-medium text-xs px-2 py-0.5">El valor de la comunidad</span>
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-5">
          Boom construye equipos de growth impulsados por IA para e-commerce. Ofrecen a cada marca agentes autónomos de ventas, soporte y marketing que trabajan 24/7, recuperan carritos abandonados y ejecutan campañas de marketing personalizadas en redes sociales.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="MOIC" value="7.6x en 3 meses" />
          <StatCard label="Inversión" value="$200K (4%)" />
          <StatCard label="Valoración entrada" value="$5M cap" />
          <StatCard label="ARR" value="$130K (ene 2026)" />
        </div>
      </div>
      <div className="px-6">
        <CaseSection title="Resumen ejecutivo">
          <Body>De 0 revenue (julio 2025) a $130K ARR (enero 2026). Platanus invirtió en Boom AI en julio de 2025 — la empresa había nacido tres semanas antes. Hoy es la única startup mexicana en el batch actual de Y Combinator. Seed de $2M a $40M cap liderado por Y Combinator (mayo 2025). Único fondo pre-semilla que logró entrar antes de YC.</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Nuestra entrada fue completamente proactiva. No estaban levantando. Un alumni de la comunidad de Platanus comentó que el equipo había salido de Atrato. Los contactamos y a pesar de que Juan (el CEO) no quería levantar, sí dijo que siempre había querido ser parte de la comunidad de Platanus. Juan habló con Roger Rea (Grupalia) y Cristina Etcheberry (Toku) — fundadores de nuestro portafolio — y los dos le dieron una referencia sólida de Platanus. Con eso, concretamos la inversión.</Body>
          <Body>Fue una oportunidad creada para Platanus, no buscaron levantar capital de nadie más.</Body>
          <Body>El 2022, con Joaquín Stephens, nos fuimos a vivir a México para abrir las operaciones de Platanus allá. En ese entonces, solo habíamos invertido en Chile (salvo por 1 inversión). El objetivo era posicionar a Platanus en la mente de la comunidad de fundadores, VCs y desarrolladores mexicanos. Como invertimos en pre-semilla, estar top of mind de los fundadores cuando recién empiezan es la clave. Ahora que han pasado algunos años, ver que las startups mexicanas eligen la comunidad de Platanus para empezar, y nos dan la oportunidad de invertirles antes que cualquiera, es el resultado de esa apuesta.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Juan Casian — CEO"
              role="Co-fundador de Atrato (YC W21)"
              bio="Lideró producto y tecnología en Atrato. Aprendió a programar en la escuela 42 de San Francisco y trabajó en robótica con computer vision."
            />
            <PersonCard
              name="José Carlos Toscano — CTO"
              role="Full-stack engineer con foco en backend"
              bio="En Atrato resolvía los desafíos técnicos más complejos. Hoy lidera la infraestructura y arquitectura de agentes."
            />
            <PersonCard
              name="Sergio García — CPO"
              role="Experto en DevOps e infraestructura"
              bio="En Atrato se encargó de seguridad, gestión de equipos y manejo operativo técnico."
            />
          </div>
          <Body>Fundadores con experiencia previa en fintech, desarrollo técnico e infraestructura. Este equipo llevó a Atrato desde una idea hasta una Serie A exitosa, levantando más de US$45M en equity y deuda a lo largo de su historia. Hoy dejan de operar Atrato, que continúa bajo el liderazgo de un socio, para enfocarse 100% en construir Boom.</Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Pre-seed", fecha: "23/09/2025", monto: "$200,000 USD", valoracion: "$5,000,000 cap", investors: "Platanus (Cavendish) — primer ticket institucional" },
            { ronda: "Seed", fecha: "12/05/2025", monto: "$2,000,000 USD", valoracion: "$40,000,000 cap", investors: "Y Combinator y ángeles" },
          ]} />
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-black">Es clave posicionarse en la mente de los fundadores antes de que salgan a levantar.</span> Hay muchos fondos que dan cheques de $50k-$200k en Latinoamérica. Lo que diferencia a Platanus no es el capital sino el acceso a una red curada de fundadores, operadores y mentores que generan valor real en el día a día de construir una startup.</Body>
          <Body>Juan no necesitaba el capital de Platanus para empezar Boom. Lo que lo convenció fue ser parte de la comunidad. Las referencias que recibió de Roger (Grupalia) y Cristina (Toku) fueron la razón por la que aceptó nuestra inversión. Lo que más evaluó es si la comunidad valía la pena, más que una estrategia de fundraising. Consideremos que este fundador tiene buena relación y contactos con sus inversionistas previos, tier 1 a nivel mundial, como Accel. Para nosotros, esto evidencia que como fondo pre-seed, tu "producto" no es solo financiero, también es la red de personas que te rodean.</Body>
          <Body><span className="text-black">La comunidad que hemos construido es nuestro "moat".</span> Para Platanus esto implica que cada inversión que hacemos tiene que reforzar la percepción de que la comunidad es de primer nivel. Si los founders del portafolio no dan referencias positivas, no hay deal flow orgánico. Si la comunidad no es excepcional, founders como Juan no aceptan tu inversión. El ciclo virtuoso de comunidad → referencias → deal flow → selectividad → comunidad más fuerte es el mejor moat en early-stage VC.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function CasosDeEstudioContent() {
  return (
    <Section id="casos-de-estudio" badge="10" title="Casos de estudio">
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Cinco casos que muestran nuestra tesis: el rol de la comunidad, la ventaja de entrar en pre-semilla y el programa.
        </p>
      </div>
      <CaseFintoc />
      <CaseToku />
      <CaseBemmbo />
      <CaseGrupalia />
      <CaseBoom />
    </Section>
  );
}

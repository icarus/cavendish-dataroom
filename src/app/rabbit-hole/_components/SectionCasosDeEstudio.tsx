function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 p-4 bg-white/5">
      <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="font-sans font-medium text-white text-sm">{value}</p>
    </div>
  );
}

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-t border-white/10">
      <summary className="flex items-center justify-between cursor-pointer py-4 list-none">
        <span className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider">{title}</span>
        <span className="font-mono font-medium text-white/40 text-xs group-open:rotate-180 transition-transform">↓</span>
      </summary>
      <div className="pb-6 space-y-3">{children}</div>
    </details>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">{children}</p>;
}

function PersonCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="border border-white/10 p-4 bg-white/5">
      <p className="font-sans font-medium text-white text-sm">{name}</p>
      <p className="font-sans font-medium text-white/40 text-xs mb-2">{role}</p>
      <p className="font-sans font-medium text-white/70 text-xs leading-relaxed">{bio}</p>
    </div>
  );
}

function FundraisingTable({ rows }: { rows: { ronda: string; fecha: string; monto: string; valoracion: string; investors: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-white/10">
            {["Ronda", "Fecha", "Monto", "Valoración", "Inversionistas"].map((h) => (
              <th key={h} className="text-left font-mono font-medium text-white/40 uppercase tracking-wider pb-2 pr-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.ronda} className="border-b border-white/10">
              <td className="font-sans font-medium text-white/70 py-2 pr-4">{r.ronda}</td>
              <td className="font-mono font-medium text-white/70 py-2 pr-4">{r.fecha}</td>
              <td className="font-mono font-medium text-white/70 py-2 pr-4">{r.monto}</td>
              <td className="font-mono font-medium text-white/70 py-2 pr-4">{r.valoracion}</td>
              <td className="font-sans font-medium text-white/70 py-2">{r.investors}</td>
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
    <div className="border border-white/10 bg-white/5 mb-4">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">SPV · 2020</p>
            <h3 className="font-sans font-medium text-white" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Fintoc</h3>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono font-medium text-xs px-2 py-0.5">Prueba de concepto</span>
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-5">
          API de intermediación de pagos y conexión bancaria — el "Plaid de Latinoamérica". Primera inversión histórica de Platanus.
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
          <Body>De $19K ARR (julio 2020) a $8M+ ARR (Q4 2025). Primera inversión de Monashees en Chile (abril 2021). Tercera startup chilena en Y Combinator (2021). Series A por $7M a $29M de valoración liderada por Monashees + Propel Ventures (abril 2024). Capital efficiency top decile: $8M ARR con $10.3M levantados = 0.78x Capital/ARR ratio.</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Cristóbal Griffero trabajaba como desarrollador en Platanus Software Factory. Había notado que varias fintechs del ecosistema (Buda, Fintual, Chipax) scrapeaban bancos en lugar de conectarse directamente — pérdida de tiempo de desarrollo en infraestructura no-core.</Body>
          <Body>Lukas Zorich aplicó como solo founder a nuestra primera generación con la misma idea. Ingeniero de la PUC con magíster en Machine Learning, llevaba programando desde los 15 años. Google le ofreció una posición full-time al salir de la carrera, pero la rechazó para emprender.</Body>
          <Body>Los dos eran técnicos. Los introdujimos e invertimos $65K por el 10%. Lo que nos convenció: fundadores técnicos con talento comercial, conocían el problema de primera mano, y resolvían un problema estructural latinoamericano.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Cristóbal Griffero — CEO"
              role="Co-fundador"
              bio="Desarrollador en Platanus Software Factory. Conocía el ecosistema fintech de primera mano y tenía una beta comercial avanzada antes de unirse a Fintoc."
            />
            <PersonCard
              name="Lukas Zorich — CTO"
              role="Co-fundador"
              bio="Ingeniería en Computación PUC + Magíster en Machine Learning. Dos pasantías en Google, rechazó posición full-time para emprender. La idea de Fintoc nació de un dolor que vivió como founder."
            />
          </div>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body>Programa de aceleración enero–agosto 2020: junta semanal con el team Platanus, juntas quincenales con fundadores top de Chile, espacio de oficina compartido con las otras 3 startups del batch, y Demo Day para armar estrategia de fundraising.</Body>
          <Body>La comunidad fue clave: Fintoc podía vender a las fintechs de la red de Platanus como primeros clientes, acelerando la validación del producto.</Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Platanus", fecha: "Ene 2020", monto: "$65K", valoracion: "$650K", investors: "Platanus" },
            { ronda: "Demo Day", fecha: "Sep 2020", monto: "$213K", valoracion: "$6M", investors: "Ángeles" },
            { ronda: "Seed", fecha: "Abr 2021", monto: "$3M", valoracion: "$16M", investors: "Monashees, Y Combinator, Soma Capital, Harvard MC" },
            { ronda: "Series A", fecha: "Abr 2024", monto: "$7M", valoracion: "$29M", investors: "Monashees (follow-on), Propel Ventures" },
          ]} />
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-white">Estar en el origen da acceso a las mejores valoraciones:</span> 8 meses después de nuestra inversión, la empresa levantó a 10x más. A los 15 meses, a ~25x.</Body>
          <Body><span className="text-white">Comunidad tech esencial para deal-flow:</span> fue gracias a la red de desarrolladores de la fábrica de software que estos fundadores gravitaban en torno a Platanus.</Body>
          <Body><span className="text-white">La comunidad como fuente de clientes:</span> las startups de la red de Platanus fueron los primeros clientes de Fintoc, acelerando la validación.</Body>
          <Body><span className="text-white">Capital paciente:</span> quien aguanta la tensión pre-semilla captura valoraciones de entrada 10–20x más bajas y retornos finales proporcionalmente más altos.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseBemmbo() {
  return (
    <div className="border border-white/10 bg-white/5 mb-4">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">Fondo I · 2022</p>
            <h3 className="font-sans font-medium text-white" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Bemmbo</h3>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono font-medium text-xs px-2 py-0.5">Primer exit Fondo I</span>
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-5">
          Automatización de rendiciones, conciliaciones bancarias y gestión de cuentas por pagar/cobrar. Adquirida por Buk en agosto 2025 por $6M.
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
          <Body>De $115 MRR (sept 2021) a $67,000 MRR (jun 2025) = <span className="text-white">582x crecimiento en ~4 años</span>. Al momento del exit: 100+ clientes, NPS 60, crecimiento moderado. Adquirida por Buk para convertirse en su brazo financiero. Retorno en 3.3 años.</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Rodrigo Oyarzún (CEO) era ex-socio de Cacttus, startup del batch 3 de Platanus. 3 semanas después de salirse, estaba obsesionado con demostrar que merecía una segunda inversión. En el negocio ferretero de su padre había notado que los procesos de pago a proveedores eran manuales e ineficientes.</Body>
          <Body>Cristóbal Dotte (CTO) había aplicado a un cargo de ingeniero en Platanus Software Factory. Durante el Build Sprint de Platanus construía una plataforma de educación para gamers pero no generó revenue. Rodrigo publicó en el Discord de Platanus buscando socio técnico — conectaron.</Body>
          <Body>Rodrigo cerró sus primeros 3 clientes con un MVP no-code en Bubble antes de tener un ingeniero. La combinación de un CEO con habilidad comercial excepcional y un CTO técnico capaz nos convenció para invertir en la primera startup de Fondo I.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Rodrigo Oyarzún — CEO"
              role="Head of Growth ex-Cornershop, ex-socio Cacttus"
              bio="Vendía antes de tener producto. Se sentaba con clientes a observar sus procesos y construía in situ. Cerraba contratos con empresas grandes antes de tener la solución construida."
            />
            <PersonCard
              name="Cristóbal Dotte — CTO"
              role="Ingeniero de software"
              bio="Gran capacidad técnica. Atrajo talento excepcional al equipo, incluyendo a Jonathan Chávez (hoy fundador de ZeroEval en Y Combinator), quien había postulado a Platanus con 21 años y estaba en Google."
            />
          </div>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body><span className="text-white">Mentoría estratégica con Jaime Arrieta (CEO de Buk):</span> lo invitamos como mentor en el "Coliseo" de nuestro programa. Rodrigo aprovechaba cada sesión de 13 minutos con avances concretos. Con el tiempo Jaime no solo fue mentor, sino inversionista ángel en Demo Day y eventualmente el comprador de la empresa.</Body>
          <Body><span className="text-white">Conexión con talento de primer nivel:</span> Jonathan Chávez había postulado a Platanus con 21 años y después aceptó un cargo en Google. Cuando Bemmbo buscaba su primer ingeniero mexicano, Paula lo presentó con Cristóbal — logró convencerlo de sumarse.</Body>
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-white">La comunidad como moat:</span> Rodrigo (ex-Cactus batch 3) conectó con Cristóbal (Build Sprint) → los conectamos con Jaime Arrieta (mentor → ángel → comprador) → con Jonathan Chávez (ex-aplicante → empleado clave). Bemmbo se vendió a Buk, empresa que se conoció a través de Platanus.</Body>
          <Body><span className="text-white">Pre-seed permite exits "pequeños" con retornos reales:</span> $6M es pequeño para una startup, pero al entrar a $1.43M post-money generamos 3.97x MOIC. Los VCs que invirtieron en rondas posteriores obtuvieron retornos cercanos a 1x.</Body>
          <Body><span className="text-white">La tesis de entrada a la menor valoración posible:</span> solo los que entraron antes de Platanus (~7x) y Platanus (3.97x) lograron retornos reales. Esto comprueba que para MOICs de 3–10x en exits "pequeños" es necesario haber entrado en pre-semilla.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseGrupalia() {
  return (
    <div className="border border-white/10 bg-white/5 mb-4">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">Fondo I · 2022</p>
            <h3 className="font-sans font-medium text-white" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Grupalia</h3>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono font-medium text-xs px-2 py-0.5">Potencial fund returner</span>
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-5">
          Primer neobanco para micronegocios en América Latina. Digitaliza préstamos grupales en México, 4x más rápidos y económicos que las alternativas tradicionales.
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
          <Body>De $50 de revenue (nov 2023) a $3M ARR (dic 2025) = <span className="text-white">4.7x en 24 meses</span>. Cash flow positivo en 10 meses desde primer préstamo. NPLs de 2.5–3.5% — comparable con Banco Compartamos (3.2%), el líder de mercado con 30 años. Estructura de costos 50% más eficiente que Compartamos. Capital efficiency: $3M ARR con ~$3M en equity levantado (1.07x ratio).</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>Ramón Echeverría fue el primer empleado de Platanus — un prodigio de ingeniería que construyó gran parte de Kalio, nuestro software interno.</Body>
          <Body>Roger Rea lo conocimos cuando estaba en Atrato, fintech BNPL mexicano respaldado por Accel y YC que originó más de $60M en préstamos. Paula lo invitó como Visiting Partner en 2022. En Platanus, Roger y Ramón se conocieron y un año después decidieron emprender juntos con Reality.</Body>
          <Body>Reality buscaba comprar y consolidar software businesses verticales. En abril 2023 invertimos $150K a $5M cap. En octubre 2023 pivotearon a Grupalia — créditos grupales 100% digitales. En 4 semanas diseñaron el producto, contrataron un key-hire (ex-CRO de SOFIPO líder) y construyeron toda la plataforma. A la semana 7 ya habían otorgado los primeros créditos. En marzo 2024 hicimos double down con $250K a $7M cap.</Body>
        </CaseSection>
        <CaseSection title="El equipo">
          <div className="space-y-3">
            <PersonCard
              name="Roger Rea — CEO"
              role="Fundador de Atrato (Accel, YC)"
              bio="Llevó Atrato a más de $60M en volumen de préstamos. Como Visiting Partner en Platanus, demostró capacidad para sintetizar conocimiento complejo en guías accionables. Obsesionado con unit economics y eficiencia de capital."
            />
            <PersonCard
              name="Ramón Echeverría — CTO"
              role="Primer empleado de Platanus, fundador de Kalio"
              bio="Construyó Kalio, el software interno de Platanus, prácticamente solo. En las primeras semanas de Grupalia construyó toda la plataforma en menos de un mes. Su app Android tiene 4.9 estrellas con +5,000 descargas."
            />
          </div>
        </CaseSection>
        <CaseSection title="Cómo los apoyamos">
          <Body>Hicieron el programa de aceleración el primer semestre del 2024. Sus mentores: Agustín Feuerhake (CPO Fintual, regulado por CNBV + CMF), Iñigo Rumayor (co-fundador de Arcus, adquirida por Mastercard en 2021) y Jaime Bünzli (CEO de Buda.com). Ambos Agustín e Iñigo terminaron invirtiendo en Grupalia.</Body>
          <Body>A través del programa conocieron a Eric Schwartz (Visiting Partner), quien tenía más de una década en fintechs — estructuró créditos en Payoneer, levantó más de $150M en deuda. Eric se convirtió en advisor e inversionista de Grupalia.</Body>
          <Body>Platanus los ayudó a estructurar la ronda Pre-seed e hizo introducciones a VCs que participaron en sus rondas posteriores.</Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Reality (Platanus)", fecha: "04/2023", monto: "$150K", valoracion: "$5M cap", investors: "Platanus Fondo I — primer ticket institucional" },
            { ronda: "Grupalia Angel", fecha: "10/2023–03/2024", monto: "~$350K", valoracion: "$5M cap", investors: "Platanus, Alex Chavez (Atrato), CAPEM, ángeles" },
            { ronda: "Pre-seed", fecha: "07/2024", monto: "$767K", valoracion: "$7M cap", investors: "Platanus (+$250K), Semilla Ventures, Innogen, R2 Ventures" },
            { ronda: "Seed", fecha: "12/2025", monto: "$1.85M", valoracion: "$15M cap", investors: "Undisclosed" },
            { ronda: "Deuda", fecha: "2025", monto: "$2M facility", valoracion: "—", investors: "Addem Capital" },
          ]} />
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-white">Validación de la tesis pre-semilla:</span> invertimos cuando construían un Private Equity digital. Pivotaron y ahora tenemos un neobanco con potencial de ser el fund returner del Fondo I. En pre-semilla lo que se mantiene constante son las personas — el mercado y el producto pueden cambiar.</Body>
          <Body><span className="text-white">El valor de Platanus es su comunidad y programa:</span> Roger y Ramón no necesitaban el programa para conseguir financiamiento, lo hicieron por el acceso a mentores de primer nivel. Dentro del programa conocieron a personas que se volverían estratégicas para su negocio.</Body>
          <Body><span className="text-white">Objetivo 2026:</span> llegar a $8M ARR y levantar una Serie A. Si ejecutan, el MOIC proyectado sería ~6–8x en ~3 años desde la primera inversión.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

function CaseBoom() {
  return (
    <div className="border border-white/10 bg-white/5 mb-4">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-1">Cavendish · 2025</p>
            <h3 className="font-sans font-medium text-white" style={{ fontSize: "clamp(16px, 1.8vw, 22px)" }}>Boom</h3>
          </div>
          <span className="shrink-0 bg-[#FFEC40] text-black font-mono font-medium text-xs px-2 py-0.5">El valor de la comunidad</span>
        </div>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed mb-5">
          Equipos de growth impulsados por IA para e-commerce. Agentes autónomos de ventas, soporte y marketing que operan 24/7. Única startup mexicana en el batch actual de Y Combinator.
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
          <Body>De $0 revenue (julio 2025) a $130K ARR (enero 2026). Primer ticket institucional de Platanus Cavendish. Seed de $2M a $40M cap liderado por Y Combinator (mayo 2025). Único fondo pre-semilla que logró entrar antes de YC.</Body>
        </CaseSection>
        <CaseSection title="Cómo nos conocimos y por qué invertimos">
          <Body>La entrada fue completamente proactiva — no estaban levantando. Un alumni de la comunidad de Platanus comentó que el equipo había salido de Atrato. Los contactamos y aunque Juan (CEO) no quería levantar, sí quería ser parte de la comunidad de Platanus.</Body>
          <Body>Juan habló con Roger Rea (Grupalia) y Cristina Etcheberry (Toku) — fundadores del portafolio — y ambos le dieron referencias sólidas. Con eso concretamos la inversión. Fue una oportunidad creada para Platanus, no buscaron capital de nadie más.</Body>
          <Body>El 2022 Joaquín y Paula se fueron a vivir a México para abrir operaciones de Platanus. El objetivo era posicionarse en la mente de la comunidad de fundadores mexicanos. Ahora las startups mexicanas nos eligen antes que a cualquier otro fondo.</Body>
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
              role="Full-stack engineer"
              bio="En Atrato resolvía los desafíos técnicos más complejos. Hoy lidera la infraestructura y arquitectura de agentes."
            />
            <PersonCard
              name="Sergio García — CPO"
              role="DevOps e infraestructura"
              bio="En Atrato se encargó de seguridad, gestión de equipos y manejo operativo técnico."
            />
          </div>
          <Body>El equipo llevó Atrato desde una idea hasta una Serie A exitosa, levantando más de $45M en equity y deuda. Hoy dejan Atrato operando bajo el liderazgo de un socio para enfocarse 100% en Boom.</Body>
        </CaseSection>
        <CaseSection title="Historia de fundraising">
          <FundraisingTable rows={[
            { ronda: "Pre-seed", fecha: "23/09/2025", monto: "$200K", valoracion: "$5M cap", investors: "Platanus Cavendish — primer ticket institucional" },
            { ronda: "Seed", fecha: "12/05/2025", monto: "$2M", valoracion: "$40M cap", investors: "Y Combinator y ángeles" },
          ]} />
        </CaseSection>
        <CaseSection title="Lo que aprendimos">
          <Body><span className="text-white">Es clave posicionarse antes de que salgan a levantar:</span> Juan no necesitaba el capital para empezar. Lo que lo convenció fue ser parte de la comunidad. Las referencias de Roger y Cristina fueron la razón por la que aceptó — más que cualquier estrategia de fundraising.</Body>
          <Body><span className="text-white">La comunidad es el moat:</span> el producto de un fondo pre-seed no es solo financiero, también es la red de personas. El ciclo virtuoso — comunidad → referencias → deal flow → selectividad → comunidad más fuerte — es el mejor moat en early-stage VC.</Body>
          <Body><span className="text-white">Presencia local genera deal flow orgánico:</span> la inversión en estar físicamente en México el 2022 se materializó 3 años después en el acceso preferencial a uno de los equipos más fuertes del ecosistema.</Body>
        </CaseSection>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

import React from "react";

export function SectionCasosDeEstudio() {
  return (
    <section id="casos-de-estudio" className="py-16 border-b border-white/10">
      <span className="inline-block bg-[#FFEC40] text-black font-mono font-medium text-base px-2 py-0.5 mb-4">10</span>
      <h2 className="font-sans font-medium text-white mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Casos de estudio
      </h2>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Cuatro casos que ilustran cómo funciona la tesis de Platanus en la práctica: el rol de la comunidad, la ventaja de entrar en pre-semilla y el acompañamiento como diferenciador.
        </p>
      </div>
      <CaseFintoc />
      <CaseBemmbo />
      <CaseGrupalia />
      <CaseBoom />
    </section>
  );
}

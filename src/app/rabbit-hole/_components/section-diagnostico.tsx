import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

export function SectionDiagnostico() {
  return (
    <section id="diagnostico" className="py-16 border-b border-black/10">
      <Badge variant="solid" className="mb-4">01</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Diagnóstico inicial
      </h2>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Cuando partimos Platanus a inicios del 2020, el panorama de venture capital ("VC") en Latinoamérica estaba viviendo su primer crecimiento acelerado.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Pero aún con vientos a favor, comenzar una startup seguía siendo extremadamente difícil y confuso.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Además, por el lado de los inversionistas, los fondos regionales asumían que el ambiente tecnológico y de startups ya estaba desarrollado para un buen funcionamiento del VC, cuando en la práctica todavía debía (y debe) ser impulsado.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Hoy el diagnóstico se mantiene, reafirmándose además por situaciones post 2021, como la poca inversión pre semilla, la falta de exits y la retirada de los inversionistas "turistas".
        </p>
        <div>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">Hace cinco años partimos Platanus para:</p>
          <ol className="list-decimal list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Apoyar a los fundadores en las etapas más iniciales de una startup.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Incentivar la creación de más startups tech en Latam lideradas por personas excepcionales y con capacidad técnica.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Lograr retornos atractivos y de manera consistente con mentalidad de <span className="italic">adventure</span> capital.</li>
          </ol>
        </div>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Los tres objetivos son caras de una misma moneda. Los dos primeros apuntan hacia los fundadores, el tercero hacia los inversionistas.
        </p>
      </div>

      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Problemas al empezar una startup tech
      </h3>

      {/* Problem 1 */}
      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">Levantar capital inicial en Latam es difícil</h4>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          El camino del Venture Capital consiste, en simple, en construir algo que la gente necesite, apalancándose en tecnología para crecer rápido, captar mucho mercado y venderse a otra empresa o salir a bolsa.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Dado que comienzan de cero, las startups necesitan de capital inicial para encontrar Product Market Fit ("PMF").
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Este capital es difícil de conseguir. ¿A quién acudir cuando solo tienes una idea y no cuentas con familiares o amigos que puedan financiarte?
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Los beneficios gubernamentales generalmente se quedan cortos, mientras que los fondos de Latam prefieren alejarse de esta etapa (renunciando a retornos más altos), llamada comúnmente Pre Seed.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Incluso aquellos fundadores que logran levantar capital inicial, el proceso es largo y extenuante. Cuatro meses levantando una ronda Pre Seed es demasiado tiempo para estas etapas iniciales.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Además, muchos fondos ponen condiciones a su inversión que termina oprimiendo a los fundadores, limitando la libertad de exploración tan necesaria al inicio. Todo esto desenfoca a los fundadores de lo que realmente importa: construir rápidamente sus productos, hablar con clientes, iterar y crecer.
        </p>
      </div>

      {/* Problem 2 */}
      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">Cómo pasar de 0 a 1</h4>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Al comenzar una startup hay demasiadas opciones de hacia por dónde partir. El apoyo de personas con más experiencia para obtener consejos y accountability se vuelve clave.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Hay pocos fundadores en Latam con la experiencia de empezar y crecer una startup que termine siendo un buen negocio. Es un conocimiento escaso y de difícil acceso. Estos fundadores están dispuestos a dar su tiempo para apoyar a otros pero no quieren perderlo.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          En la práctica, se vuelve difícil para ellos saber a quién ayudar, pese a que quisieran hacerlo. Platanus se convierte en su filtro.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Además de este conocimiento, al inicio los fundadores necesitan entender y sentir el ritmo vertiginoso con que avanza una startup exitosa.
        </p>
      </div>

      {/* Problem 3 */}
      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">Falta de una comunidad de founders increíbles que ayuden a sortear problemas</h4>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Toda persona se beneficiará de estar con otros fundadores que le exijan, le den consejos, planteen problemas y participar de una comunidad que lo ayude a sortear de forma más rápida cualquier duda, problema o ambigüedad.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Ser parte de una comunidad te da shortcuts fundamentales para las etapas iniciales. Estamos más dispuestos a ayudar a alguien si tenemos un vínculo en común, como ser parte de un grupo.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Pero las comunidades son complicadas de construir. Para que sean útiles deben ser bien curadas, apuntar a un nicho específico y mantener la cultura interna. Esto significa que deben crecer lentamente, lo que requiere tiempo, paciencia y dedicación.
        </p>
      </div>

      {/* Crear un ambiente tech */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Crear un ambiente tech
      </h3>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Todo lo anterior busca apoyar a las personas que ya quieren ser fundadores. Generalmente en Latam hasta aquí se quedan los fondos de VC. El gran problema es que todavía hay mucho por hacer para que el Venture Capital sea exitoso en la región.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          La región tiene lo necesario para que exista un ambiente tech y de startups fuerte, pero distintos actores deben tener la paciencia y accionar para llegar ahí.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Nuestro aporte es crear las condiciones necesarias para que más personas ligadas a la tecnología funden startups o trabajen en ellas. Debemos incentivar que los fundadores en potencia busquen formas de cambiar el status quo y atacar grandes industrias con nuevas tecnologías, inventos, formas de desarrollo, plataformas, etc.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Una forma de incentivar a estas personas es construir un ambiente tech: juntar a las personas que ya están interesadas con las que podrían interesarse, para crear un espacio que a su vez atraiga a más personas. Lograr que la genialidad colectiva termine ejecutando nuevas ideas.
        </p>
      </div>

      {/* Comienza Platanus */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Comienza Platanus
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Con este diagnóstico creamos Platanus.
      </p>

      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">
          Invertimos <span className="bg-[#FFEC40] px-1">US$200,000</span> en las primeras etapas de equipos excepcionales, priorizando los intereses de los fundadores y el éxito de la startup.
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          {[
            "No pedimos información innecesaria para esta etapa.",
            "Decidimos en semanas (y no meses) si invertir o no.",
            "No pedimos un puesto en el directorio que entorpezca la operación.",
            "No generamos una dilución que complique a la startup en el futuro.",
            "Damos un monto suficiente para que la startup logre PMF sin levantar más capital.",
          ].map((item) => (
            <li key={item} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
      </Callout>

      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6 mt-2">
        Además de nuestra inversión, apoyamos a aquellas que van por buen camino para levantar con otros inversionistas, sea a través de los Demo Days o con apoyo 1:1.
      </p>

      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        A estas startups las sumamos a un <span className="font-sans font-medium text-black">programa de aceleración</span>.
      </p>

      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">
          Tres meses en donde las startups se rodean de otros fundadores ambiciosos y se enfocan 100% en sus proyectos para pasar de 0 a 1. Fundadores experimentados los aconsejan y generan accountability para cumplir sus metas semanales.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-2">Dos cosas nos distinguen de otras aceleradoras:</p>
        <ul className="list-disc list-outside pl-5 space-y-2">
          <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            <span className="bg-[#FFEC40] px-1  text-black">"Quod natura non dat, Platanus non praestat"</span>. Este no es un programa educativo. Lo que busca es que los fundadores se potencien entre ellos y construyan sus negocios recibiendo consejos y accountability.
          </li>
          <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            No cobramos. Esto es parte del valor agregado a nuestra inversión.
          </li>
        </ul>
      </Callout>

      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4 mt-6">
        Invertimos en varias startups para construir una comunidad de los mejores fundadores latinoamericanos, bien curada y con un fuerte componente técnico.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-8">
        Hoy contamos con <span className="bg-[#FFEC40] px-1  text-black">+120 startups</span> en el portafolio, <span className="bg-[#FFEC40] px-1  text-black">+350 fundadores</span> repartidos en <span className="bg-[#FFEC40] px-1  text-black">+10 países</span> y una amplia red de mentores.
      </p>

      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Por último, incentivamos el ambiente tech organizando eventos y espacios para juntar a fundadores, inversionistas y personas ligadas a la tecnología:
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["Platanus Hack", "Platanus Forum", "Demo Devs", "Demo Days", "Build Nights", "AI Native", "Kernel Club", "Comidas entre fundadores"].map((event) => (
          <div key={event} className="border border-black/10 px-4 py-2.5 bg-black/5">
            <span className="font-mono font-medium text-black/60 text-sm">{event}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

export function SectionComunidad() {
  const events = [
    { name: "Platanus Forum", desc: "Un evento anual donde reunimos a nuestros fundadores, inversionistas y cercanos que comparten una característica común: la curiosidad por conocer gente haciendo cosas interesantes y entender mejor lo que está pasando en el mundo." },
    { name: "Platanus Hack", desc: "De 0 a producto en 36 horas. Juntamos a más de 100 programadores en una oficina por un fin de semana. Este 2026 lo haremos en cinco capitales de Latam: Bogotá, Buenos Aires, Caracas, Ciudad de México y Santiago." },
    { name: "AI Native", desc: "Pequeñas charlas mensuales sobre aplicación práctica de la AI en startups." },
    { name: "Cenas de fundadores", desc: "Reuniones informales entre los fundadores de la comunidad y los del batch actual para fomentar el networking en un ambiente relajado." },
    { name: "Desayunos", desc: "Desayunos temáticos diseñados para que los fundadores del portafolio conecten con otros fundadores que forman parte del ecosistema." },
    { name: "Charlas técnicas y no técnicas", desc: "Sesiones donde se abordan temas relevantes para parte o toda la comunidad, presentadas por miembros de Platanus." },
    { name: "Demo Devs", desc: "Instancia donde las startups de Platanus presentan sobre lo que hacen y sus stacks tecnológicos o desafíos técnicos que hayan tenido." },
  ];

  const slackChannels = [
    {
      group: "Tech",
      channels: [
        { name: "#pv-ux-ui", desc: "Feedback y ayuda general en torno a UX/UI." },
        { name: "#pv-techie", desc: "Conversaciones de todo tipo de temas técnicos, preguntas específicas y pedidas de ayuda." },
        { name: "#pv-growth", desc: "Growth de producto." },
        { name: "#pv-products", desc: "Conversaciones en torno a productos en general." },
        { name: "#pv-releases", desc: "Lanzamiento de features o productos nuevos de las startups." },
      ],
    },
    {
      group: "Founders",
      channels: [
        { name: "#pv-founders", desc: "Canal exclusivo para el portafolio y mentores. Espacio seguro para preguntar lo que necesiten para mejorar su startup y el camino como fundador." },
        { name: "#pv-gen-xxx", desc: "Canales exclusivos para cada batch con temática libre." },
      ],
    },
    {
      group: "Comunidades diversas",
      channels: [
        { name: "#crypto", desc: "Temas relativos al mundo de las cryptos y sus avances." },
        { name: "#pv-news", desc: "Conversaciones sobre noticias del mundo startupero." },
        { name: "#pv-promote", desc: "Los fundadores pueden pedir apoyo a la comunidad para promocionar contenido relevante de su startup." },
        { name: "#pv-random", desc: "Canal misceláneo donde se puede hablar de absolutamente cualquier cosa." },
        { name: "#pv-sales", desc: "Conversaciones sobre ventas en general." },
        { name: "#pv-jobs", desc: "Canal para compartir posiciones de trabajo abiertas en las startups, o recomendar CVs a la comunidad." },
      ],
    },
  ];

  return (
    <section id="comunidad" className="py-16 border-b border-black/10">
      <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-base hover:bg-[#FFEC40]/90 border-transparent mb-4">02</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Comunidad
      </h2>

      <blockquote className="border-l-2 border-[#FFEC40] pl-5 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3 italic">
          "Most people don't know how ambitious to be, especially when they're young. They don't know what's hard, or what they're capable of. When you take [ambitious] people like this and put them together with other ambitious people, they bloom like dying plants given water."
        </p>
        <p className="font-mono font-medium text-black text-sm uppercase tracking-wider">— Paul Graham</p>
      </blockquote>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Un factor importante para que una startup tenga éxito es las personas que te rodean.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Para construir algo gigante se debe tener curiosidad para hacer las preguntas correctas, ambición para solucionar problemas difíciles, sentido de urgencia y determinación para ejecutar los planes.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Rodearte de personas excepcionales potencia todas esas cualidades. Uno tiende a adaptarse al ambiente en que se mueve y estar rodeado de otros fundadores excelentes aumenta la curiosidad, creatividad, productividad y rapidez.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          En Platanus consideramos que la comunidad es la piedra angular para nuestros objetivos.
        </p>
      </div>

      {/* Impulsar a fundadores */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Impulsar a fundadores de Platanus
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        A través de nuestra comunidad, nuestros fundadores logran rodearse de otros pares en etapas similares o un poco más avanzados, todos construyendo startups.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">Esta comunidad apoya de varias formas:</p>
      <ul className="list-disc list-outside pl-5 space-y-2 mb-8">
        {[
          "Poner metas más altas. Escuchando a otros fundadores puedes darte cuenta que estabas apuntando muy bajo y que tenías el potencial para mirar más lejos.",
          "La gran mayoría de las startups en etapas iniciales pivotean. Es fundamental para un buen cambio de rumbo buscar y masticar nuevas ideas con otras personas brillantes.",
          "Para pasar de 0 a 1 hay muchos problemas iniciales que son solucionables si tienes los contactos y redes adecuadas.",
          "Mientras más grande es la comunidad de fundadores, los primeros clientes de las startups comienzan a ser otras startups del portafolio. Esto ya se da en Platanus.",
          "Se da un efecto de estar dispuesto a proporcionar ayuda a quien sea parte de la comunidad. Uno está más dispuesto a presentar contactos, invertir o prestar todo tipo de apoyo si tenemos un vínculo previo con la persona.",
        ].map((item) => (
          <li key={item} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{item}</li>
        ))}
      </ul>

      {/* Bajar el riesgo */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Bajar el riesgo de la inversión
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Desde el punto de vista de nuestra inversión, lo anterior baja el riesgo de nuestras inversiones. Platanus cuenta con el apoyo de terceros para aumentar las posibilidades de éxito de las startups invertidas, permitiendo tener portafolios más grandes.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Además, la comunidad tiene un efecto sustancial en la atracción de nuevas startups. Los fundadores externos comienzan a asociar el éxito con pertenecer a la comunidad. Quieren ser parte y no quedarse afuera de lo que se está armando.
      </p>
      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          El valor agregado que aporta una buena comunidad permite invertir a <span className="bg-[#FFEC40] px-1">menores valorizaciones que el mercado</span>.
        </p>
      </Callout>

      {/* Paciencia y dedicación */}
      <h3 className="font-sans font-medium text-black/40 mb-4 mt-10" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Paciencia y dedicación
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Para que una comunidad sea útil, los individuos que la componen deben ser excepcionales y compartir una similar cultura de formar empresas. Deben sentir que pueden compartir con otras personas tan o más ambiciosas e inteligentes que ellos, además de sentirse reflejados y querer imitar la forma en que los demás construyen sus startups.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        La comunidad debe ser lo suficientemente grande para que cada integrante pueda llegar indirectamente a otras personas que le agreguen valor. Los grupos pequeños no logran cumplir con todos los propósitos de una buena comunidad.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-10">
        En definitiva, armar una buena comunidad no se logra en un par de años. Requiere tiempo, paciencia e ingeniería social.
      </p>

      {/* Cómo la construimos */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Cómo la construimos
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Desde que partimos el 2020 hemos sido conscientes de que cada inversión eran fundadores sumados a la comunidad. En nuestra decisión tomamos en cuenta que sean excepcionales y un aporte para Platanus.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        A lo largo de estos años hemos invertido en <span className="bg-[#FFEC40] px-1  text-black">121 startups</span> con más de <span className="bg-[#FFEC40] px-1  text-black">350 fundadores</span> repartidos en <span className="bg-[#FFEC40] px-1  text-black">+10 países</span> de América.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-10">
        Desde el 2024 la comunidad comienza a tomar una inercia propia y el efecto flywheel se hace presente. Los fundadores comparten constantemente datos, ideas, experiencias con inversionistas y clientes. Los trabajadores de startups del portfolio han comenzado a formar otras startups a las que les hemos invertido. Fundadores externos comienzan a buscar la inversión de Platanus para acceder a su comunidad, dispuestos a bajar su valorización para que seamos parte de su cap table.
      </p>

      {/* Cómo la incentivamos */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Cómo la incentivamos
      </h3>

      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">Foco en tech</h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-8">
        La esencia que queremos transmitir es una comunidad fuertemente vinculada a la tecnología. Por eso desde un principio solo invertimos y seleccionamos startups que cuenten con un cofundador técnico. Es este nicho — fundadores adictos a la tecnología — al que queremos apuntar. Queremos lograr que las personas techis encuentren en Platanus el grupo de personas del que quieren rodearse y asociarse.
      </p>

      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">Programa de aceleración en batches</h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        La inversión por sí sola no es suficiente para hacer sentir a los fundadores parte de una comunidad. En Platanus tenemos dos tipos de inversiones: a través del programa de aceleración y las opportunities.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Las opportunities son startups que están levantando una ronda con distintos fondos y Platanus es un fondo más. Estos fundadores por lo general no aprovechan la comunidad y no se sienten identificados como parte de ella.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Por el contrario, las startups que invertimos a través del programa de aceleración se sienten parte de un grupo de fundadores y de algo más grande. La magia está en los batches.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Los fundadores generan vínculos estrechos al tener la misma experiencia de pasar por un proceso de postulación, recibir el mismo ticket de inversión y estar tres meses construyendo juntos.
      </p>
      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Cada startup comienza a definirse como <span className="bg-[#FFEC40] px-1">"soy parte de la generación X de Platanus"</span>, en vez de "me invirtió tal y tal fondo." Esta es una lealtad que no vemos hacia otros fondos.
        </p>
      </Callout>

      <figure className="mt-6 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/tribupv.png"
          alt="Batch del 2° semestre 2024 de Platanus Ventures"
          className="w-full border border-black/10"
        />
        <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
          Antes Platanus era Platanus Ventures, por eso el "PV". Batch del 2° semestre 2024.
        </figcaption>
      </figure>

      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3 mt-10">Espacios</h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Las mejores conversaciones se dan en contextos donde las personas pueden interactuar frente a frente.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6">
        Para fomentar este ambiente, ofrecemos espacios físicos en Santiago y (prontamente) Ciudad de México. En CDMX, teníamos una casa oficina llamada <span className="bg-[#FFEC40] px-1  text-black">La Banana House</span>, donde los fundadores de otras regiones de Latam pueden alojarse gratuitamente mientras se establecen en México. La idea es volver a abrir esa Banana House a finales del 2026, principios 2027 y explorar abrir Banana Houses en otras ciudades.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dessyunobananahouse.jpeg"
            alt="Desayuno de fundadores en el rooftop de la Banana House"
            className="w-full border border-black/10 object-cover aspect-[4/3]"
          />
          <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
            Desayuno de fundadores en el rooftop de la Banana House.
          </figcaption>
        </figure>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bananahouse3.webp"
            alt="La habitación Nest, donde duermen los fundadores"
            className="w-full border border-black/10 object-cover aspect-[4/3]"
          />
          <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
            La habitación "Nest", donde duermen los fundadores.
          </figcaption>
        </figure>
      </div>

      <figure className="mb-8 flex flex-col items-center">
        <video
          src="/bananahousecdmx.mov"
          controls
          className="w-1/2 border border-black/10"
        />
        <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
          La oficina dentro de la Banana House en CDMX.
        </figcaption>
      </figure>

      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-4">Eventos</h4>
      <div className="space-y-0 mb-10">
        {events.map((e) => (
          <div key={e.name} className="flex gap-4 py-4 border-b border-black/10 last:border-0">
            <span className="font-sans font-medium text-black/60 text-sm w-52 shrink-0">{e.name}</span>
            <span className="font-sans font-medium text-black/60 text-sm leading-relaxed">{e.desc}</span>
          </div>
        ))}
      </div>

      <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-4">Comunidades digitales activas en Slack</h4>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-6">
        A través de Slack organizamos la comunicación de nuestra comunidad. Distintos canales conectan a los fundadores en los temas relevantes de su día a día. Nos preocupamos de tenerlos activos para que agreguen valor.
      </p>
      <div className="space-y-6 mb-10">
        {slackChannels.map((group) => (
          <div key={group.group}>
            <p className="font-mono font-medium text-black text-sm uppercase tracking-wider mb-3">{group.group}</p>
            <div className="space-y-0">
              {group.channels.map((ch) => (
                <div key={ch.name} className="flex gap-4 py-2.5 border-b border-black/10 last:border-0">
                  <span className="font-mono uppercase font-medium text-black/60 text-sm w-36 shrink-0">{ch.name}</span>
                  <span className="font-sans font-medium text-black/60 text-sm leading-relaxed">{ch.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ejemplo Bemmbo */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Ejemplo de Bemmbo
      </h3>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        La startup Bemmbo puede ejemplificar lo que se logra con una comunidad.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Rodrigo y Cristóbal se conocieron en un Build Sprint de Platanus, un programa de pre-aceleración que nos genera buen deal flow. Trabajando juntos en el Build Sprint, decidieron formar Bemmbo.
      </p>
      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-4">
        Dado que veíamos sus avances en el Build Sprint, decidimos invertirles a principios del 2022 y pasaron por el programa de aceleración. Jaime Arrieta, el CEO de Buk, fue mentor de ellos. Jaime vio algo en los fundadores y decidió seguirles la pista, continuando el apoyo y mentoría aún después de que terminara el programa.
      </p>
      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Tres años y medio después, <span className="bg-[#FFEC40] px-1">Buk adquirió Bemmbo</span>, generando un retorno para Platanus. Un caso perfecto de cómo funciona la comunidad.
        </p>
      </Callout>
    </section>
  );
}

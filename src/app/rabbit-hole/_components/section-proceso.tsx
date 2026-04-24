import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

const formQuestions = [
  {
    group: "Información Básica",
    items: ["Nombre de startup", "Página web", "Geografía", "Industria", "Descripción corta (50 caracteres)", "¿Qué hace o va a hacer tu startup?"],
  },
  {
    group: "Fundadores",
    items: [
      "¿Cuáles son sus roles y cuál es la historia de cada uno?",
      "¿Quién escribe el código o hace el trabajo técnico en el producto? ¿Es fundador?",
      "Por cada founder: RRSS, experiencia, historial en startups, nivel técnico, compromisos pendientes, y cuéntanos de algún proyecto interesante o algo que hayas hackeado a tu favor.",
    ],
  },
  {
    group: "Progreso",
    items: [
      "Estado actual de la startup.",
      "Tamaño del equipo, demo/URL del producto.",
      "Meses trabajando en la idea, usuarios e ingresos si los tienen.",
      "¿Han participado en otro programa de startups?",
    ],
  },
  {
    group: "Idea",
    items: [
      "¿Por qué eligieron esta idea? ¿Son expertos en el tema?",
      "¿Quiénes son sus competidores? ¿A quién le tienen más miedo?",
      "¿Qué saben o tienen que hará su producto exitoso y único?",
      "¿Por qué nadie lo ha hecho hasta ahora?",
      "¿Cómo generan o generarán ingresos y a qué nivel podrían llegar?",
    ],
  },
  {
    group: "Legal",
    items: [
      "¿Tienen empresa constituida?",
      "¿Han aceptado inversión? ¿Cuánto porcentaje han cedido?",
      "Cap table detallado, runway/burn.",
      "¿Hay algo más que debamos saber de la empresa?",
    ],
  },
  {
    group: "Otros & Curiosidad",
    items: [
      "¿Qué stack tecnológico utilizas o planeas utilizar?",
      "¿Pensaron en postular con otra idea? Explícala.",
      "¿Por qué decidiste postular a Platanus? ¿Cómo supiste de nosotros?",
    ],
  },
];

export function SectionProceso() {
  return (
    <section id="proceso" className="py-16 border-b border-black/10">
      <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-base hover:bg-[#FFEC40]/90 border-transparent mb-4">06</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Proceso de selección
      </h2>

      {/* Resumen */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Resumen y espíritu
      </h3>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Diseñamos nuestro proceso para seleccionar a los mejores equipos dentro de un gran volumen de postulaciones.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Como invertimos tan temprano, nos enfocamos mayoritariamente en encontrar características del equipo que creemos que son necesarias para llevar adelante su idea y convertir su negocio en algo gigante.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Este proceso es una parte clave de nuestra operación. Desde el 2020 hemos recibido más de <span className="bg-[#FFEC40] px-1  text-black">9.549 aplicaciones</span> y seleccionado <span className="bg-[#FFEC40] px-1  text-black">121 startups</span> a través de este proceso.
        </p>
      </div>

      {/* Overview stats */}
      <h3 className="font-sans font-medium text-black/40 mb-4" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Etapas
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Postulaciones revisadas", value: "+9.549" },
          { label: "Entrevistas realizadas", value: "+1.600" },
          { label: "Tasa de aceptación", value: "~1%" },
        ].map((s) => (
          <div key={s.label} className="border border-black/10 p-5 bg-black/5">
            <p className="font-mono font-medium text-black mb-1" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>{s.value}</p>
            <p className="font-sans font-medium text-black/60 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Hemos revisado todas esas aplicaciones y tenido más de 1.600 entrevistas con startups en las distintas fases. Esto ha decantado en que nuestra tasa de aceptación es de alrededor del 1%.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Desde que una startup es llamada a entrevista, apuntamos a que reciba una respuesta en <span className="bg-[#FFEC40] px-1  text-black">15 días</span>, manteniendo flexibilidad en caso de necesitar más información para mantener la calidad de la selección.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Nuestro proceso consta de algunas etapas asíncronas y síncronas, online y presenciales. En cada una de ellas filtramos el funnel para llegar a la selección final.
        </p>
      </div>

      {/* Process stages */}
      <div className="space-y-0">

        {/* 1 — Formulario */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">1</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Formulario</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Lo primero que tiene que hacer una startup que aplica a Platanus es llenar un formulario en Kalio que busca obtener información del equipo fundador y de su idea.
              </p>

              {/* Collapsible-style questions */}
              <details className="border border-black/10 bg-black/5">
                <summary className="font-sans font-medium text-black text-sm px-5 py-3 cursor-pointer select-none hover:bg-black/5 transition-colors">
                  Ver las preguntas en detalle
                </summary>
                <div className="px-5 pb-5 pt-2 space-y-4 border-t border-black/10">
                  {formQuestions.map((section) => (
                    <div key={section.group}>
                      <p className="font-mono font-medium text-black text-sm uppercase tracking-wider mb-2">{section.group}</p>
                      <ul className="list-disc list-outside pl-5 space-y-2">
                        {section.items.map((q) => (
                          <li key={q} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{q}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="font-sans font-medium text-black/60 text-sm leading-relaxed pt-2 border-t border-black/10">
                    Lo anterior es un compendio de las preguntas que hemos realizado en los últimos procesos de selección. Estamos iterando constantemente según los enfoques del fondo y los aprendizajes que hemos tenido.
                  </p>
                </div>
              </details>

              <Callout>
                <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                  Desde Q3 2023, además del formulario les pedimos a las startups que realicen una <span className="bg-[#FFEC40] px-1">entrevista automatizada</span> como paso previo.
                </p>
              </Callout>

              <figure className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/entrevistaautomatizada.png"
                  alt="Entrevista automatizada de Kalio"
                  className="w-full border border-black/10"
                />
                <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
                  Esta es la entrevista automatizada a la que se enfrentan los fundadores. Junto con entender más en profundidad lo que están resolviendo, nos ayuda a evaluar la relación del equipo, su capacidad de comunicar bien y su compromiso.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* 2 — Primer filtro */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">2</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Primer filtro</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Una vez que recibimos una postulación, nuestro software la asigna automáticamente a cada uno de los partners. La primera revisión busca ver que se cumplan algunos requisitos básicos:
              </p>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                {[
                  "Que estén construyendo una startup tecnológica.",
                  "Que uno de los fundadores pueda construir el producto.",
                  "Que el equipo esté o pueda estar full time.",
                ].map((item) => (
                  <li key={item} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{item}</li>
                ))}
              </ol>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Y revisamos cualquier otro indicador evidente de que son un fit para Platanus por calzar con nuestra tesis de inversión.
              </p>
              <figure className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/primerfiltro.png"
                  alt="Vista general de revisión de startups en Kalio"
                  className="w-full border border-black/10"
                />
                <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
                  Así es la vista general de revisión de startups en Kalio, con el video de la entrevista automatizada, insights generados por IA y toda la información del formulario de postulación.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* 3 — Primera entrevista */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">3</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Primera entrevista</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Cada partner revisa sus aplicaciones asignadas y las puede marcar como prometedoras o interesantes. A ellas se les invita a una entrevista con Platanus.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Como requisito para agendar se les solicita ingresar referencias, que son automáticamente contactadas por nuestro software.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                A la entrevista van 2 partners de Platanus y deben ir todos los fundadores de la compañía postulante. El objetivo es analizar la capacidad y experiencia del equipo, así como su conocimiento del ambiente y mercado en el que se enmarca su producto. La entrevista dura alrededor de 25 minutos.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Tras la entrevista los partners se juntan, llenan preguntas que les hace Kalio y votan para decidir si nos parece un buen fit con Platanus y si pasa a una segunda entrevista.
              </p>
              <figure className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/primeraentrevista.png"
                  alt="Vista de votos y decisión de entrevista en Kalio"
                  className="w-full border border-black/10"
                />
                <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
                  Los partners votan simultáneamente y dejan la decisión registrada en Kalio.
                </figcaption>
              </figure>
              <Callout>
                <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                  Utilizamos un modelo de <span className="bg-[#FFEC40] px-1">convicción fuerte</span>: al menos uno de los partners debe votar "Sí fuerte" para que continúen en el proceso. Históricamente hemos entrevistado en esta primera etapa a alrededor del <span className="bg-[#FFEC40] px-1">14%</span> de las startups que aplican.
                </p>
              </Callout>
            </div>
          </div>
        </div>

        {/* 4 — Segunda entrevista */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">4</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Segunda entrevista</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Si llegaron a esta etapa, se les solicita agendar una segunda entrevista, esta vez con al menos 3 partners de Platanus.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                El objetivo aquí es estresar las convicciones del equipo fundador, con preguntas más detalladas tanto de su producto y mercado como del equipo, para revelar sus planes de escalamiento rápido, estrategia de ejecución y su visión de futuro.
              </p>
              <Callout>
                <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                  Al igual que en la primera entrevista, al menos uno de los partners debe votar "sí fuerte" para pasar a la siguiente etapa. Históricamente hemos entrevistado en esta segunda etapa a alrededor del <span className="bg-[#FFEC40] px-1">4%</span> de las startups que aplican.
                </p>
              </Callout>
            </div>
          </div>
        </div>

        {/* 5 — Chequeo de referencias */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">5</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Chequeo de referencias</h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                A pesar de que a esta altura ya hicimos un chequeo de referencias preliminar, en esta etapa más selectiva contactamos a las referencias de los fundadores para poder profundizar más. En ciertos casos contactamos personas relacionadas, distintas a las ingresadas por ellos.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Además de ayudarnos a descartar posibles red flags de los fundadores, cada chequeo queda respaldado en nuestro software.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Si las referencias no levantan ninguna alerta, procedemos con la entrevista presencial.
              </p>
            </div>
          </div>
        </div>

        {/* 6 — Entrevista en persona */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">6</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">
              Entrevista en persona <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-xs hover:bg-[#FFEC40]/90 border-transparent ml-1">nuevo</Badge>
            </h4>
            <div className="space-y-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Como última instancia con los founders, los invitamos a alguna de nuestras oficinas para una reunión en persona con al menos 2 partners.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                El objetivo de esta última etapa es obtener información que creemos que es difícil de obtener a través de videollamadas. Buscamos crear un entorno distinto al de una entrevista y nos enfocamos en detectar señales fuertes de su ambición, de su auténtico interés por construir una startup gigante, de su nivel de involucramiento con el producto y de su dominio de todo lo relacionado.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                La convicción adquirida durante las etapas anteriores debe mantenerse y si vemos red flags o se diluye la certeza, no seleccionaremos al equipo.
              </p>
            </div>
          </div>
        </div>

        {/* 7 — Selección */}
        <div className="flex gap-6 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">7</span>
            </div>
            <div className="w-px bg-black/10 flex-1 mt-2" />
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Selección</h4>
            <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
              Si la startup pasa exitosamente la entrevista en persona, es seleccionada. Nuestro software realiza un onboarding a los founders y los agrega a nuestras bases de datos.
            </p>
          </div>
        </div>

        {/* 8 — Due diligence */}
        <div className="flex gap-6 pb-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#FFEC40] flex items-center justify-center shrink-0">
              <span className="font-mono font-medium text-black text-sm">8</span>
            </div>
          </div>
          <div className="pb-4 flex-1">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">Due diligence</h4>
            <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
              Tras la selección, pero previo al inicio del programa, se realiza un due diligence general. Si bien el proceso avanza en paralelo, la inversión está sujeta al resultado de esta etapa.
            </p>
          </div>
        </div>

      </div>

      {/* Deal sourcing */}
      <h3 className="font-sans font-medium text-black/40 mb-4 mt-10" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Deal sourcing
      </h3>
      <div className="space-y-4">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          En un inicio las startups que postularon llegaron absolutamente de forma orgánica. Debido a la comunidad de fundadores tecnológicos que rodea a Platanus y el apoyo de startups chilenas exitosas, los nuevos fundadores de startups digitales sienten un gran interés por participar del programa de aceleración.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Desde el 2022 comenzamos una búsqueda activa de fundadores técnicos de startups en etapas iniciales que pudieran ser buenos postulantes al programa.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Dentro de nuestro esfuerzo por mejorar el contexto en el que se desenvuelven las startups, hemos creado una serie de actividades complementarias al programa de aceleración para dar visibilidad a Platanus, generar comunidad de desarrolladores e incentivar a que estudiantes armen startups.
        </p>
        <Callout>
          <ul className="list-disc list-outside pl-5 space-y-2">
            {[
              { title: "Visibilidad", body: "Charlas, Ask Me Anythings, Live Office Hours, Platanus Forum." },
              { title: "Comunidad técnica", body: "Demo Dev, Build Night, Platanus Hack — para generar comunidad de desarrolladores y gente técnica." },
              { title: "Nuevos fundadores", body: "Clases de startups en las universidades más importantes de Latam para incentivar a que estudiantes armen startups." },
            ].map((item) => (
              <li key={item.title} className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                <span className="text-black">{item.title}:</span> {item.body}
              </li>
            ))}
          </ul>
        </Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Esas actividades no solo buscan mantener a Platanus en el <span className="italic">top of mind</span> de buenos fundadores, sino que generar un entorno cada vez mejor para que aparezcan más fundadores latinoamericanos con agencia. Queremos incentivar el espíritu de creación, de iniciativa, de ownership. Con ese entorno, naturalmente se genera el camino para que apliquen a Platanus cuando armen startups que se puedan convertir en negocios gigantes.
        </p>
      </div>
    </section>
  );
}

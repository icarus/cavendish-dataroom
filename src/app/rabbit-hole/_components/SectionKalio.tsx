import { Badge } from "@/components/ui/badge";
import { Callout } from "./Callout";

export function SectionKalio() {
  return (
    <section id="kalio" className="py-16 border-b border-black/10">
      <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-base hover:bg-[#FFEC40]/90 border-transparent mb-4">07</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Kalio
      </h2>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Kalio es el <span className="bg-[#FFEC40] px-1">centro de la operación de Platanus</span>. Somos un VC con base tecnológica y nuestro equipo puede ser tan pequeño porque delegamos gran parte de nuestros procesos al software que construimos.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Así como creemos que un cofundador técnico es esencial para que las startups puedan construir su software y escalar, nuestra operación funciona de la misma manera: gracias al software podemos escalar.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Kalio es una aplicación web que ayuda a que Platanus funcione.{" "}
          <span className="font-sans font-medium text-black">Ha sido construido en su totalidad por el equipo dev de Platanus durante los años, ahora liderado por Raimundo.</span>
        </p>
      </div>

      {/* Aplicando */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Kalio para startups aplicando
        </h4>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Lo primero que debe hacer una startup que quiere ser parte de Platanus es aplicar a nuestro programa a través de Kalio.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Tenemos un formulario que está pensado para obtener toda la información que necesitamos de los founders y de su idea, para poder evaluarlos después.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Además de eso, les hacemos una entrevista automatizada que ocurre en Kalio a la que se conectan todos los fundadores y responden en vivo.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Las startups también pueden ver el estado de su postulación en Kalio, descargar sus respuestas y reciben distintas notificaciones de las etapas del proceso en su correo.</li>
          </ul>
          <figure className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aplicacionkalio.png"
              alt="Vista de la postulación de una startup en Kalio"
              className="w-full border border-black/10"
            />
            <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
              Las startups pueden ver el estado de su postulación en tiempo real dentro de Kalio.
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Selección */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Kalio para selección
        </h4>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Todo el proceso de selección lo llevamos en Kalio.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Reparte las postulaciones para un screening inicial a cada partner, nos permite tener un overview de todas las postulaciones y saber en qué estado está cada una.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Para asistir la revisión genera un resumen, nos muestra toda la información relevante y notifica los plazos a cada encargado.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">También gestiona todo el ciclo de vida de una postulación, realizando las acciones al momento de mover una aplicación de una etapa a otra.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Notifica a los fundadores si requerimos acciones suyas (como agendar una entrevista o rellenar referencias).</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Nos permite guardar la información de cada entrevista y las votaciones de los partners.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Nos permite contactar automáticamente a sus referencias y guardar tanto esa información como la del due diligence.</li>
          </ul>
          <figure className="mt-4">
            <video
              src="/tutorialkalio.mov"
              controls
              className="w-full border border-black/10"
            />
            <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
              Tour de lo que ve un partner al revisar una postulación en particular (en este caso, una que ya fue seleccionada).
            </figcaption>
          </figure>
          <Callout>
            <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
              Como parte de Kalio tenemos a <span className="bg-[#FFEC40] px-1">Frank</span>, un bot conectado a Slack que nos permite realizar seguimiento detallado y nos notifica los cambios de cada aplicación. Evita que olvidemos postulaciones y mantiene al equipo al tanto de las etapas.
            </p>
          </Callout>
        </div>
      </div>

      {/* Programa */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Kalio para el programa
        </h4>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Kalio también lleva el programa. Es lo que nos ayuda a llevar el ritmo y la comunicación con los founders y mentores.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Las startups deben subir sus updates semanales con métricas, desafíos, insights, etc.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Los mentores y las startups se conectan a los "Coliseos": reuniones periódicas donde los fundadores aprovechan al máximo su tiempo con los mentores para que los ayuden con su negocio.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Tenemos reuniones con las startups periódicamente; la coordinación y la reunión misma pasan en Kalio.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Hay contenido, eventos y su feedback, perks, etc., todos disponibles en Kalio.</li>
          </ul>
          <figure className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kalioprograma.png"
              alt="Interfaz del Coliseo en Kalio"
              className="w-full border border-black/10"
            />
            <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
              La interfaz del coliseo con los turnos por startup. Se conectan los fundadores y mentores.
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Demo Day */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Kalio para el Demo Day
        </h4>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            También desarrollamos una plataforma para llevar nuestros Demo Days en Kalio.
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Los inversionistas pueden postular para asistir al Demo Day.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Tenemos un Demo Day exclusivo para la comunidad, antes del Demo Day para inversionistas invitados generales.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Las startups conectan con los inversionistas y reciben commitments de inversión.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Los inversionistas pueden ver los pitches de cada startup, información de los fundadores, de las rondas, etc.</li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/kaliodemoday.png"
                alt="Streaming del Demo Day 2024-2 en Kalio"
                className="w-full border border-black/10 object-cover aspect-video"
              />
              <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
                Parte de la plataforma que ven los inversionistas invitados al Demo Day.
              </figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tweetkalio.png"
                alt="Tweet de Enzo Cavalie sobre el Demo Day de Platanus"
                className="w-full border border-black/10 object-cover aspect-video"
              />
              <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
                La interfaz del Demo Day no pasó desapercibida.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Alumni */}
      <div className="border border-black/10 p-5 bg-black/5 mb-8">
        <h4 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Kalio para alumni
        </h4>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Para los fundadores de un batch en curso el valor más inmediato está en el programa, pero apenas son parte de la comunidad, pueden acceder a muchas otras cosas a través de Kalio:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Pueden ver el listado de fundadores y de personas relacionadas a la comunidad.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Pueden ver los inversionistas históricos del Demo Day, junto con evaluaciones y comentarios de sus experiencias levantando rondas con ellos.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Existe una amplia oferta de Office Hours que los founders aprovechan para hablar con founders de la comunidad.</li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Nos mandan updates y llevamos el tracking de startups del portafolio a través de Kalio.</li>
          </ul>
          <figure className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kalioalumni.png"
              alt="Office Hours en Kalio Alumni"
              className="w-full border border-black/10"
            />
            <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
              Algunas de las personas a las que se les puede pedir Office Hours con un par de clicks.
            </figcaption>
          </figure>
        </div>
      </div>

      <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
        Kalio evoluciona constantemente y cada proceso que vemos que se beneficiaría de estar en software pasa por Kalio. Seguirá dictando el ritmo de Platanus y es probable que incorporemos más procesos en el tiempo. Si tienen alguna recomendación, felices de recibirla.
      </p>
    </section>
  );
}

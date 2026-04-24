import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

export function SectionComputin() {
  const reasons: { title: string; paragraphs: string[] }[] = [
    {
      title: "El producto nunca está terminado",
      paragraphs: [
        "Algunos emprendedores creen que el producto se desarrolla completamente y después se pueden ir todos a relajar mientras llegan los ingresos.",
        "¿Cuántos ingenieros de software crees que trabajan en Uber? Al principio fueron muy pocos. Ahora son miles. Miles de ingenieros de software.",
        "Cuando uno lo piensa por primera vez, no es tan intuitivo. La aplicación de Uber se ve bien sencilla. Pero la realidad es que por debajo es extremadamente compleja. Siempre hay que desarrollar nuevas funcionalidades, herramientas internas, hacer optimizaciones para escalar, arreglar errores y muchas cosas más que es difícil imaginar a priori.",
        "Por más simple que se vea, el producto de una startup nunca está terminado.",
      ],
    },
    {
      title: "AI es un catalizador",
      paragraphs: [
        "Por el momento la AI es un tremendo catalizador para los buenos devs. Un fundador con conocimientos técnicos será mil veces mejor que un vibe coder sin estos conocimientos.",
        "Además, dadas las capacidades de la AI de crear software, comienzan a ser otras industrias y negocios los que puedan generar los retornos atractivos de VC. Estos negocios siempre requerirán de nuevas tecnologías para ser gigantes en relativamente poco tiempo. Da una gran ventaja competitiva tener entre los fundadores una persona que conozca o explore estas nuevas tecnologías.",
      ],
    },
    {
      title: "Atraer talento tech",
      paragraphs: [
        "Como el desarrollo de un producto solo aumenta con el tiempo y la AI es un catalizador, las startups van a tener que contratar ingenieros. Ojalá los mejores ingenieros.",
        "El problema es que la competencia por talento tech es gigante.",
        "El hack: incluir al mejor desarrollador en el equipo fundador. La gente ambiciosa y talentosa quiere trabajar donde hay personas que admiran.",
        "Finalmente, la atracción de buen talento es una bola de nieve. Más y mejores programadores atrae más talento y así sucesivamente.",
      ],
    },
    {
      title: "La tecnología es clave en el negocio",
      paragraphs: [
        "¿Harían una empresa de biotecnología sin tener a un socio que sepa de biotecnología? Probablemente no. Con el resto de las tecnologías es lo mismo.",
        "Si el producto es tecnológico, más temprano que tarde se necesitará a una o más personas que sepan de esa tecnología. Ojalá lo más temprano posible, dentro del equipo fundador.",
        "Esto es importante para la ejecución y también porque es mucho más probable que el técnico tenga una sensibilidad más desarrollada sobre lo que hay o no que hacer en un producto tech.",
        "Las personas cercanas a la tecnología están usando productos de punta mucho más seguido que la media de las personas, por lo que tienen ciertas intuiciones estratégicas que son más difíciles de encontrar en alguien que está metido en el ambiente.",
      ],
    },
    {
      title: "Se necesita algo más que tomar pedidos",
      paragraphs: [
        "Cuando se construye un negocio propio, no dejas de pensar en eso. En la ducha, en el metro, antes de dormir, mientras duermes.",
        "Si solo eres un trabajador no te desvives igual por la empresa que un fundador. Hay menos apego al proyecto. Quieres recibir tu sueldo, trabajar de 9 a 6, tener buenos beneficios y listo.",
        "Lo ideal es que el CTO esté pensando todo el tiempo posible en la tecnología, el negocio y el producto. Si no es así, habrá menos ideas y todo va a avanzar más lento.",
        "Al no darle la profundidad de pensamiento necesaria, todo termina siendo \"tomar pedidos\". Los fundadores dicen qué hacer y el desarrollador lo hace.",
        "Mejor tener entre el equipo fundador al desarrollador alineado con las ideas, visión e incentivos del resto y pensando constantemente en lo que quieren lograr como startup.",
      ],
    },
    {
      title: "Bajar el riesgo de la inversión",
      paragraphs: [
        "Sabemos que hay startups que han tenido éxito sin cofundadores técnicos. No hay duda de eso. Pero también vemos que las startups que comienzan con un cofundador técnico avanzan más rápido y dan menos tropiezos.",
        "Además del rol de reducir el riesgo de nuestras inversiones, mantener la tesis de invertir en startups con cofundador técnico cumple otro rol muy importante. Posicionarnos en un nicho tech.",
        "Nuestra comunidad se llena de fundadores techis, lo que atrae a otras personas con esas características. Esto nos deja como un fondo cercano a este tipo de personas. Constantemente personas externas recomiendan a Platanus como un fondo para conectar al fundador comercial con el técnico, cosa que hacemos regularmente.",
      ],
    },
  ];

  return (
    <section id="computin" className="py-16 border-b border-black/10">
      <Badge className="bg-[#FFEC40] text-black font-mono font-medium text-base hover:bg-[#FFEC40]/90 border-transparent mb-4">03</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        El cofundador técnico es fundamental
      </h2>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Uno de los requisitos para entrar a Platanus es contar con un cofundador que sea el "adicto a la tecnología". Alguien que pueda construir el producto internamente con mentalidad de fundador y atraer talento.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Confiamos en que la probabilidad de éxito de una startup tecnológica es significativamente mayor si hay un fundador que entienda y pueda desarrollar la tecnología. Además debe tener una participación relevante de la empresa.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          A los equipos sin cofundadores técnicos que postulan a Platanus les recomendamos buscar a un CTO que se sume al proyecto con una participación similar a los demás socios.
        </p>
      </div>

      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Para esta tesis de inversión nos basamos en las siguientes razones.
        </p>
      </Callout>

      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res-2.cloudinary.com/ha0mfd5dh/image/upload/q_auto/v1/ghost-blog-images/steves-apple.jpg"
          alt="Steve y Steve. CTO y CEO."
          className="w-full border border-black/10 object-cover max-h-72"
        />
        <figcaption className="font-sans font-medium text-black/40 text-sm leading-relaxed mt-2">
          Steve y Steve. CTO y CEO.
        </figcaption>
      </figure>

      <div className="space-y-20">
        {reasons.map((r, i) => (
          <div key={r.title} className="flex gap-6">
            <span className="inline-flex items-start justify-center bg-[#FFEC40] text-black font-mono font-medium text-sm w-8 h-7  shrink-0 mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="font-sans font-medium text-black/40 text-sm mb-3">{r.title}</h4>
              <div className="space-y-3">
                {r.paragraphs.map((p, j) => (
                  <p key={j} className="font-sans font-medium text-black/60 text-sm leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

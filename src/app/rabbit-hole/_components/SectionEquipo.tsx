import Image from "next/image";

const integrantes = [
  {
    name: "Paula Enei",
    role: "Co-founder & Managing Partner",
    country: "Chile",
    photo: "/team/paula.png",
    linkedin: "https://www.linkedin.com/in/paulaenei/",
    bio: "Psicóloga de formación, toda su carrera se ha dedicado a la industria del emprendimiento. Co-fundó \"El Vaso Medio Lleno\", plataforma de contenidos positivos que llegó a 24 millones de vistas mensuales y fue parte de Start-Up Chile Gen 15. Luego se unió al equipo de Start-Up Chile, donde lideró las áreas de comunidad, scouting, estrategia internacional y negocios, trabajando con 500+ emprendedores.",
  },
  {
    name: "Joaquín Stephens",
    role: "Co-founder & General Partner",
    country: "Chile",
    photo: "/team/joaquin.png",
    linkedin: "https://www.linkedin.com/in/joaquin-stephens-baa016154/",
    bio: null,
  },
  {
    name: "Raimundo Herrera",
    role: "General Partner & CTO",
    country: "Chile",
    photo: "/team/raimundo.png",
    linkedin: "https://www.linkedin.com/in/raimundo-herrera-s/",
    bio: "Ingeniero Civil en Computación con Magíster en Criptografía por la PUC. Profesor de cátedra en la PUC y la Universidad de Chile. Lideró el área de desarrollo de Platanus Software Factory como CEO, con más de 20 desarrolladores. Hoy está a cargo de todo el software que sustenta la selección de startups y la operación del programa.",
  },
  {
    name: "Aldo",
    role: "Visiting Partner",
    country: "México",
    photo: "/team/aldo.png",
    linkedin: "https://www.linkedin.com/in/aldojaja/",
    bio: "Emprendedor desde los 17 años. Fundador de Apprecio, solución todo en uno para tiendas de abarrotes en Latam con más de 30k tiendas en México, apoyada por Y Combinator. Antes fundó Lytica, empresa de IA que automatizaba la investigación de mercado con cámaras. Como Visiting Partner apoya a los nuevos fundadores en estrategia y crecimiento.",
  },
  {
    name: "Rafael Fernandez",
    role: "Software Engineer",
    country: "Chile",
    photo: "/team/rafael.png",
    linkedin: "https://www.linkedin.com/in/rafafdzs/",
    bio: null,
  },
];

const strategicPartners = [
  {
    name: "Agustín Feuerhake",
    role: "Strategic Partner",
    country: "Chile",
    photo: null,
    linkedin: "https://www.linkedin.com/in/agustinfeuerhake/",
    bio: "Junto a Jaime lleva más de 14 años emprendiendo. Co-crearon QueHambre!, el primer portal para pedir comida online en Chile, que fue vendido a PedidosYa. Co-fundador de Buda.com, exchange de criptomonedas. Como strategic partner participa de la estrategia general de Platanus y las decisiones de inversión.",
  },
  {
    name: "Jaime Bünzli",
    role: "Strategic Partner",
    country: "Chile",
    photo: "/team/jaime.png",
    linkedin: "https://www.linkedin.com/in/jaime-b%C3%BCnzli-81a33920/",
    bio: "Ingeniero de software, PUC. Junto a Agustín lleva más de 14 años emprendiendo. Co-crearon Voxound (reproductor de música) y QueHambre!, primer portal para pedir comida online en Chile, vendido a PedidosYa. Co-fundador de Buda.com, exchange de criptomonedas. Participa en la estrategia general y en las decisiones de inversión.",
  },
];

function MemberCard({
  name,
  role,
  country,
  photo,
  linkedin,
  bio,
}: {
  name: string;
  role: string;
  country: string;
  photo: string | null;
  linkedin: string;
  bio: string | null;
}) {
  return (
    <div className="border border-white/10 bg-white/5">
      {photo ? (
        <div className="relative w-full aspect-square overflow-hidden border-b border-white/10">
          <Image src={photo} alt={name} fill className="object-cover object-top" />
        </div>
      ) : (
        <div className="w-full aspect-square border-b border-white/10 bg-white/5 flex items-center justify-center">
          <span className="font-mono font-medium text-white/20 text-4xl">{name[0]}</span>
        </div>
      )}
      <div className="p-5">
        <p className="font-sans font-medium text-white text-sm mb-0.5">{name}</p>
        <p className="font-sans font-medium text-white/40 text-xs mb-1">{role}</p>
        <p className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider mb-4">{country}</p>
        {bio && (
          <p className="font-sans font-medium text-white/70 text-xs leading-relaxed mb-4">{bio}</p>
        )}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono font-medium text-white/40 text-xs uppercase tracking-wider hover:text-white transition-colors"
        >
          LinkedIn →
        </a>
      </div>
    </div>
  );
}

export function SectionEquipo() {
  return (
    <section id="equipo" className="py-16 border-b border-white/10">
      <span className="inline-block bg-[#FFEC40] text-black font-mono font-medium text-base px-2 py-0.5 mb-4">08</span>
      <h2 className="font-sans font-medium text-white mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Equipo
      </h2>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          La máxima de Platanus es crecer mediante tecnología, manteniendo el equipo lo más pequeño posible y con foco en apoyo a los fundadores.
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Entre el equipo hay tres General Partners, un Visiting Partner y un Software Engineer.{" "}
          <span className="bg-[#FFEC40] px-1 text-black">El 50% del equipo permanente programa.</span>
        </p>
        <p className="font-sans font-medium text-white/70 text-sm leading-relaxed">
          Los "strategic partners" son parte del equipo fundador de Platanus y sirven de advisors, pero no están en el día a día de la empresa.
        </p>
      </div>

      <h3 className="font-sans font-medium text-white/40 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Integrantes
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {integrantes.map((m) => (
          <MemberCard key={m.name} {...m} />
        ))}
      </div>

      <h3 className="font-sans font-medium text-white/40 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Strategic Partners
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {strategicPartners.map((m) => (
          <MemberCard key={m.name} {...m} />
        ))}
      </div>
    </section>
  );
}

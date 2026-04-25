"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Member = {
  name: string;
  role: string;
  country: string;
  photo: string | null;
  linkedin: string;
  bio: string | null;
};

const integrantes: Member[] = [
  {
    name: "Paula Enei",
    role: "Co-founder & Managing Partner",
    country: "🇨🇱 Chile",
    photo: "/team/paula.png",
    linkedin: "https://www.linkedin.com/in/paulaenei/",
    bio: "Psicóloga de formación, toda su carrera se ha dedicado a la industria del emprendimiento.\n\nCo-fundó \"El Vaso Medio Lleno\", plataforma de contenidos positivos que llegó a 24 millones de vistas mensuales y fue parte de Start-Up Chile Gen 15.\n\nLuego se unió al equipo de Start-Up Chile, donde lideró las áreas de comunidad, scouting, estrategia internacional y negocios, trabajando con 500+ emprendedores.",
  },
  {
    name: "Joaquín Stephens",
    role: "Co-founder & General Partner",
    country: "🇨🇱 Chile",
    photo: "/team/joaquin.png",
    linkedin: "https://www.linkedin.com/in/joaquin-stephens-baa016154/",
    bio: "Derecho, Pontificia Universidad Católica de Chile.\n\nTrabajó como abogado y analista de cumplimiento en Buda.com.\n\nLuego entró a trabajar para CMS Carey & Allende en el área corporativa, impulsando la creación del área de Venture Capital, emprendimiento e innovación.\n\nHace trail running, con ATH de 110km.",
  },
  {
    name: "Raimundo Herrera",
    role: "General Partner & CTO",
    country: "🇨🇱 Chile",
    photo: "/team/raimundo.png",
    linkedin: "https://www.linkedin.com/in/raimundo-herrera-s/",
    bio: "Ingeniero Civil en Computación con Magíster en Criptografía por la PUC.\n\nProfesor de cátedra en la PUC y la Universidad de Chile.\n\nLideró el área de desarrollo de Platanus Software Factory como CEO, con más de 20 desarrolladores. Hoy está a cargo de todo el software que sustenta la selección de startups y la operación del programa.",
  },
  {
    name: "Aldo",
    role: "Visiting Partner",
    country: "🇲🇽 México",
    photo: "/team/aldo.png",
    linkedin: "https://www.linkedin.com/in/aldojaja/",
    bio: "Emprendedor desde los 17 años.\n\nFundador de Apprecio, solución todo en uno para tiendas de abarrotes en Latam con más de 30k tiendas en México, apoyada por Y Combinator.\n\nAntes fundó Lytica, empresa de IA que automatizaba la investigación de mercado con cámaras.\n\nComo Visiting Partner apoya a los nuevos fundadores en estrategia y crecimiento.",
  },
  {
    name: "Rafael Fernandez",
    role: "Software Engineer",
    country: "🇨🇱 Chile",
    photo: "/team/rafael.png",
    linkedin: "https://www.linkedin.com/in/rafafdzs/",
    bio: null,
  },
];

const strategicPartners: Member[] = [
  {
    name: "Agustín Feuerhake",
    role: "Strategic Partner",
    country: "🇨🇱 Chile",
    photo: "/team/agustin.jpg",
    linkedin: "https://www.linkedin.com/in/agustinfeuerhake/",
    bio: "Junto a Jaime lleva más de 14 años emprendiendo.\n\nCo-crearon QueHambre!, el primer portal para pedir comida online en Chile, que fue vendido a PedidosYa.\n\nCo-fundador de Buda.com, exchange de criptomonedas.\n\nComo strategic partner participa de la estrategia general de Platanus y las decisiones de inversión.",
  },
  {
    name: "Jaime Bünzli",
    role: "Strategic Partner",
    country: "🇨🇱 Chile",
    photo: "/team/jaime.png",
    linkedin: "https://www.linkedin.com/in/jaime-b%C3%BCnzli-81a33920/",
    bio: "Ingeniero de software, PUC.\n\nJunto a Agustín lleva más de 14 años emprendiendo. Co-crearon Voxound (reproductor de música) y QueHambre!, primer portal para pedir comida online en Chile, vendido a PedidosYa.\n\nCo-fundador de Buda.com, exchange de criptomonedas.\n\nParticipa en la estrategia general y en las decisiones de inversión.",
  },
];

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="border border-black/10 bg-white w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "1 / 1", maxHeight: 260 }}>
          {member.photo ? (
            <Image src={member.photo} alt={member.name} fill className="object-cover object-top" />
          ) : (
            <div className="w-full h-full bg-black/5 flex items-center justify-center">
              <span className="font-mono font-medium text-black/20 text-6xl">{member.name[0]}</span>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-black/10">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="font-sans font-medium text-black text-sm mb-0.5">{member.name}</p>
              <p className="font-sans font-medium text-black/40 text-xs mb-1">{member.role}</p>
              <p className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider">{member.country}</p>
            </div>
            <button
              onClick={onClose}
              className="font-mono font-medium text-black/30 text-sm hover:text-black transition-colors shrink-0 mt-0.5"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          {member.bio ? (
            <div className="space-y-3 mb-5">
              {member.bio.split("\n\n").map((para, i) => (
                <p key={i} className="font-sans font-medium text-black/60 text-xs leading-relaxed">{para}</p>
              ))}
            </div>
          ) : (
            <p className="font-sans font-medium text-black/30 text-xs leading-relaxed mb-5 italic">Sin bio disponible.</p>
          )}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-medium text-black/40 text-xs uppercase tracking-wider hover:text-black transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MemberCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <div
      className="border border-black/10 bg-black/5 cursor-pointer hover:bg-black/10 hover:border-black/20 transition-colors group"
      onClick={onClick}
    >
      {member.photo ? (
        <div className="relative w-full aspect-square overflow-hidden border-b border-black/10">
          <Image src={member.photo} alt={member.name} fill className="object-cover object-top" />
        </div>
      ) : (
        <div className="w-full aspect-square border-b border-black/10 bg-black/5 flex items-center justify-center">
          <span className="font-mono font-medium text-black/20 text-4xl">{member.name[0]}</span>
        </div>
      )}
      <div className="p-5">
        <p className="font-sans font-medium text-black text-sm mb-0.5">{member.name}</p>
        <p className="font-sans font-medium text-black/40 text-sm mb- text-balance">{member.role}</p>
        <p className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider my-3">{member.country}</p>
        <span className="font-mono font-medium text-black/20 text-sm uppercase tracking-wider group-hover:text-black/40 transition-colors">
          Ver bio →
        </span>
      </div>
    </div>
  );
}

export function TeamGrid() {
  const [selected, setSelected] = useState<Member | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <h3 className="font-sans font-medium text-black mt-10 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Integrantes
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
        {integrantes.map((m) => (
          <MemberCard key={m.name} member={m} onClick={() => setSelected(m)} />
        ))}
      </div>
      <h3 className="font-sans font-medium text-black mt-10 mb-6" style={{ fontSize: "clamp(14px, 1.5vw, 20px)" }}>
        Strategic Partners
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {strategicPartners.map((m) => (
          <MemberCard key={m.name} member={m} onClick={() => setSelected(m)} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <MemberModal member={selected} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

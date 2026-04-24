export function SectionEquipo() {
  return (
    <section id="equipo" className="py-16 border-b border-white/10">
      <span className="inline-block bg-[#FFEC40] text-black font-mono font-medium text-base px-2 py-0.5 mb-4">08</span>
      <h2 className="font-sans font-medium text-white mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Equipo
      </h2>
      <div className="border border-white/10 border-dashed p-10 flex flex-col items-center justify-center text-center">
        <p className="font-mono font-medium text-white/40 text-sm uppercase tracking-wider">Próximamente</p>
      </div>
    </section>
  );
}

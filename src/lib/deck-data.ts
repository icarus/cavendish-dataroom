export type Mentor = {
  name: string;
  company: string;
  tagline: string;
  image: string;
};

export type PortfolioCompany = {
  name: string;
  tagline: string;
  image: string;
  moic: string;
  badge?: "fund-returner" | "potential-fund-returner" | "rising-star" | "exited";
  investorsAfter?: string[];
  bullets?: string[];
};

export type Fund = {
  name: string;
  year: string;
  amount: string;
  investments: string;
  tupiMultiple: string;
  moicMultiple: string;
  dpiMultiple: string;
  companies: PortfolioCompany[];
};

export type Testimonial = {
  name: string;
  company: string;
  image: string;
  text: string;
};

export const MENTORS: Mentor[] = [
  { name: "Juan Pablo Cuevas", company: "Cornershop", tagline: "Built a unicorn that exited to Uber", image: "/avatars/juan-pablo-cuevas.jpg" },
  { name: "Helena Polyblank", company: "Mendel", tagline: "Series B female led startup", image: "/placeholder-avatar.svg" },
  { name: "Rodolfo Dañino", company: "Crehana", tagline: "Only ed-tech unicorn company in LatAm", image: "/avatars/rodolfo-danino.jpg" },
  { name: "Jaime Arrieta", company: "Buk", tagline: "Fastest growing LatAm SaaS", image: "/avatars/jaime-arrieta.jpeg" },
  { name: "Paulina Aguilar", company: "Mundi", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Janan Knust", company: "Klog", tagline: "", image: "/avatars/janan-knust.jpg" },
  { name: "Agustín Feuerhake", company: "Fintual", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Jaime Bunzli", company: "Buda", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Ignacio Canals", company: "Galgo", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Sebastián Baquero", company: "Ruedata", tagline: "", image: "/avatars/sebastian-baquero.jpg" },
  { name: "Carolina García", company: "Chiper", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Ronni Samir", company: "Directo", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Juan Pablo Montoya", company: "Momentu", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Daniel Guajardo", company: "Dentalink, Health Atom", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Iñigo Rumayor", company: "Arcus", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Antonia San Martín", company: "Plutto", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Nicolás Rossi", company: "Agenda Pro", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Pedro Pineda", company: "Fintual", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Alejandro Matamala", company: "Runway", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Roger Rea", company: "Grupalia", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Cristina Etcheberry", company: "Toku", tagline: "", image: "/avatars/cristina-etcheberry.jpg" },
  { name: "Maite Muñiz", company: "Truora", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Cristóbal Griffero", company: "Fintoc", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Sebastián Villarreal", company: "Super Seguros", tagline: "", image: "/placeholder-avatar.svg" },
  { name: "Alfonso de los Rios", company: "Nowports", tagline: "", image: "/placeholder-avatar.svg" },
];

export const FUNDS: Fund[] = [
  {
    name: "SPV",
    year: "2020",
    amount: "USD $206K",
    investments: "4 STARTUPS",
    tupiMultiple: "4.6X",
    moicMultiple: "4.49X",
    dpiMultiple: "0.02X",
    companies: [
      { name: "Fintoc", tagline: "Direct, fast, and cost-effective transactions.", image: "/avatars/fintoc.png", moic: "12.46x", badge: "potential-fund-returner", investorsAfter: ["YC", "Monashees", "Propel"], bullets: ["We introduced the founders.", "Seed: 6 months later.", "Series A: $7m at 29m"] },
      { name: "Reversso", tagline: "Simple returns and exchanges.", image: "/avatars/reversso.png", moic: "10.77x", investorsAfter: ["Blue Express", "Copec"], bullets: ["280 customers with 560 active stores.", "Operations in Chile, Colombia and Mexico.", "Cash flow positive."] },
      { name: "Cardda", tagline: "", image: "/avatars/cardda.png", moic: "[*]x", investorsAfter: ["YC"] },
    ],
  },
  {
    name: "Genesis Fund",
    year: "2021",
    amount: "USD $650K",
    investments: "11 STARTUPS",
    tupiMultiple: "6.4X",
    moicMultiple: "7.78X",
    dpiMultiple: "1.75X",
    companies: [
      { name: "Toku", tagline: "Platform for enterprise payment collection.", image: "/avatars/toku.png", moic: "93.50x", badge: "fund-returner", investorsAfter: ["Oak HC/FT", "Gradient", "F-Prime", "Wollef", "Y Combinator", "Clocktower Technologies"], bullets: ["Growth average of 37% QoQ from inception to date (2021).", "Operations in Chile, Mexico and Brasil.", "Series B of $40m at $250m."] },
      { name: "Plutto", tagline: "Third-party risk assessment and management.", image: "/avatars/plutto.png", moic: "21x", investorsAfter: ["Y Combinator"], bullets: ["EBITDA of 20% with +$2.5m in ARR.", "Tremendous capital efficiency. Only one round raised after Platanus."] },
      { name: "Cero", tagline: "", image: "/avatars/cero.png", moic: "[*]x", investorsAfter: [] },
    ],
  },
  {
    name: "Fund I",
    year: "2022",
    amount: "USD $15,285,013",
    investments: "98 STARTUPS",
    tupiMultiple: "*1.18X",
    moicMultiple: "*1.53X",
    dpiMultiple: "0.06X",
    companies: [
      { name: "Grupalia", tagline: "", image: "/avatars/grupalia.png", moic: "[*]x", badge: "potential-fund-returner", investorsAfter: [] },
      { name: "Horizon AI", tagline: "", image: "/avatars/horizon-ai.png", moic: "[*]x", badge: "rising-star", investorsAfter: [] },
      { name: "Kunzapp", tagline: "", image: "/avatars/kunzapp.png", moic: "[*]x", investorsAfter: [] },
      { name: "Shinkansen", tagline: "Automates B2B transactions in real time.", image: "/avatars/shinkansen.png", moic: "8.14x", investorsAfter: [], bullets: ["Deal sourced through our network.", "Oversold pre-seed. Oversold Seed Led by 10ventures", "Average growth: 42% MoM"] },
      { name: "Kapso", tagline: "", image: "/avatars/kapso.png", moic: "[*]x", badge: "rising-star", investorsAfter: [] },
      { name: "Carvuk", tagline: "", image: "/avatars/carvuk.png", moic: "[*]x", investorsAfter: [] },
      { name: "Altur", tagline: "", image: "/avatars/altur.ico", moic: "[*]x", investorsAfter: [] },
      { name: "CuidaPet", tagline: "", image: "/avatars/cuidapet.png", moic: "[*]x", investorsAfter: [] },
      { name: "Magnar", tagline: "", image: "/avatars/magnar.png", moic: "[*]x", investorsAfter: [] },
      { name: "Sento", tagline: "", image: "/avatars/sento.png", moic: "[*]x", investorsAfter: [] },
      { name: "Bemmbo", tagline: "", image: "/avatars/bemmbo.webp", moic: "[*]x", badge: "exited", investorsAfter: [] },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Francisco Suarez", company: "CuidaPet", image: "/placeholder-avatar.svg", text: "El monto del financiamiento es muy bueno para early stage y es muy founder friendly. El programa es ligero en horas, pero te ayuda a mantener el foco y ser súper ambicioso. La comunidad es muy potente, estás a un mensaje de Slack de algunos de los mejores fundadores de Latam." },
  { name: "Laura del Castillo", company: "Kunzapp", image: "/placeholder-avatar.svg", text: "No porque te \"enseñen a emprender\", sino por cómo te obligan a operar: más rápido, con más foco, con menos excusas. Para nosotros, fue clave en dos cosas: acelerar muchísimo el ritmo de ejecución y tener feedback constante de gente que ya había pasado por lo mismo." },
  { name: "Natan", company: "Felz", image: "/placeholder-avatar.svg", text: "En Latam no falta talento. Falta capital. Hay miles de founders con ideas reales, resolviendo problemas reales, en mercados enormes. Pero la mayoría nunca arranca porque nadie les da ese primer voto de confianza. Platanus resuelve exactamente eso." },
  { name: "Antonia San Martín", company: "Plutto", image: "/placeholder-avatar.svg", text: "Sin Platanus probablemente nunca habría entrado a este mundo. Fueron los primeros en confiar en que podíamos construir algo como Plutto (YC S22). Si tienes una idea que te obsesiona, el ecosistema necesita personas buenas que se atrevan a armar buenas startups tech." },
  { name: "Andrés Matte", company: "Kapso", image: "/placeholder-avatar.svg", text: "Platanus is the best thing that can happen to a technical founder in LatAm." },
  { name: "Roger Rea", company: "Grupalia", image: "/placeholder-avatar.svg", text: "Cuando me preguntan si vale la pena, siempre digo lo mismo: tener un inversionista como Platanus es un privilegio. Platanus siempre ha estado ahí para apoyar. Desde el inicio y en cada etapa. Por mucho, uno de nuestros mejores inversionistas." },
  { name: "Jan Henivrta", company: "Former founder & VC", image: "/placeholder-avatar.svg", text: "Pocos fondos en latam realmente son tan founder-first como Platanus. Yo no he visto un fondo donde el GP se pone a cocinar para todos sus founders. O donde de repente uno de los partners te recibe para dormir en su depa para que no gastes en hospedaje." },
  { name: "Diego Fernandez", company: "Sento", image: "/placeholder-avatar.svg", text: "Paula Enei y Joaquin Stephens han construido algo muy especial. No es solo un programa, es un grupo de personas que realmente están ahí contigo, en la trinchera, empujando, dando feedback y acompañando en momentos buenos y malos." },
  { name: "Pablo Diaz", company: "", image: "/placeholder-avatar.svg", text: "No puedo recomendar Platanus lo suficiente. Una experiencia de altísimo nivel y exigencia: batch con metas claras, office hours dedicados, mentores de primerísimo nivel y una comunidad increíble a un Slack real, activa todos los días." },
  { name: "Victor Perl", company: "", image: "/placeholder-avatar.svg", text: "Platanus invierte USD 200K pero lo que más vale es la comunidad de gente buena onda, súper dispuesta a ayudarte. Las conversas con ellos me han hecho un mejor founder. Esto vale más que los dólares." },
  { name: "Cris", company: "Puente", image: "/placeholder-avatar.svg", text: "Platanus no te da un cheque y desaparece. Te mete en una red de fundadores que están en las mismas. Y eso vale oro. Mi único consejo: no esperes a sentirte listo. Nosotros no lo estábamos. Y fue la mejor decisión que tomamos." },
  { name: "Juan", company: "Morfy", image: "/placeholder-avatar.svg", text: "Lo que pasó en los tres meses de programa fue increíble. Muchas decisiones difíciles con presión real encima y los mejores operadores de Latam asesorando. Platanus es el mejor fondo early-stage de LATAM." },
  { name: "Cristina Etcheberry", company: "Toku", image: "/avatars/cristina-etcheberry.jpg", text: "" },
  { name: "Nath", company: "Neopausia", image: "/placeholder-avatar.svg", text: "Tiempos entretenidos para emprender, más entretenidos aún en Platanus. 1000% recomendado." },
  { name: "José Domingo", company: "Blar", image: "/placeholder-avatar.svg", text: "Más allá del capital, lo que hace la diferencia es la comunidad. Tener acceso a una red de founders que están a otro nivel, poder pedir ayuda o consejos cuando los necesitas, eso es impagable." },
  { name: "Nico", company: "Lokal", image: "/placeholder-avatar.svg", text: "La eficiencia de resolver problemas completos en una cabeza hace que tener un equipo grande sea una desventaja. Cambiar tu solución mientras construyes es lo más importante en un inicio. Seguro viene una ola de startups que se van a sumar a esa oportunidad con IA." },
];

export const FUND_STATS = {
  ticketSize: "$200K",
  equity: "7%",
  applicationsReviewed: "9,454",
  activeFunds: 3,
  ideaStageEntries: "40%",
  foundersInNetwork: "350+",
  startups: "116",
  firstInterviews: "1,234",
  secondInterviews: "400",
};

export const TEAM = [
  { name: "Paula Enei", role: "Co-Founder, Managing Partner", image: "/avatars/paula-enei.png" },
  { name: "Raimundo Herrera", role: "General Partner, CTO", image: "/placeholder-avatar.svg" },
  { name: "Joaquin Stephens", role: "Co-Founder, General Partner", image: "/avatars/joaquin-stephens.jpg" },
];

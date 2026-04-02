"use client";

import React, { useEffect, useState } from "react";
import { Code2, Zap, Globe, RefreshCw, Lightbulb, TrendingUp } from "lucide-react";

type P = { active: boolean };

function useAnim(active: boolean) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (active) {
      const id = setTimeout(() => setOn(true), 80);
      return () => clearTimeout(id);
    }
    setOn(false);
  }, [active]);
  return on;
}

const f = (on: boolean, d = 0): React.CSSProperties => ({
  opacity: on ? 1 : 0,
  transform: on ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
});

const grow = (on: boolean, d = 0): React.CSSProperties => ({
  transform: on ? "scaleY(1)" : "scaleY(0)",
  transformOrigin: "bottom",
  transition: `transform 0.8s cubic-bezier(0.4,0,0.2,1) ${d}ms`,
});

export function Slide1({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img src="/logo.svg" alt="Platanus" className="h-14 w-auto" style={f(on, 0)} />
      <span className="absolute bottom-10 left-12 font-sans text-white text-base font-light" style={f(on, 200)}>
        Cavendish Fund
      </span>
      <span className="absolute bottom-10 right-12 font-mono text-white/40 text-xs tracking-[0.15em] uppercase" style={f(on, 200)}>
        Backing the best technical teams in Latin America.
      </span>
    </div>
  );
}

export function Slide2({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="relative w-full h-full flex items-center p-[6%]">
      <h1 className="font-sans font-bold text-white leading-[1.2]" style={{ fontSize: "clamp(30px, 4.5vw, 68px)" }}>
        <span style={f(on, 0)} className="block">Forging Latin American</span>
        <span style={f(on, 80)} className="block">technical founders</span>
        <mark className="bg-[#FFEC40] text-black px-2 py-0.5 inline-block not-italic" style={f(on, 160)}>
          into standout startups.
        </mark>
      </h1>
    </div>
  );
}

export function Slide3({ active }: P) {
  const on = useAnim(active);

  const funds = [
    {
      name: "SPV", year: "2020",
      rows: [["AMOUNT","USD $206K"],["INVESTMENTS","4 STARTUPS"],["TUPI","4.6X"],["MOIC","4.49X"],["DPI","0.02X"]],
    },
    {
      name: "Genesis Fund", year: "2021",
      rows: [["AMOUNT","USD $650K"],["INVESTMENTS","11 STARTUPS"],["TUPI","6.4X"],["MOIC","7.78X"],["DPI","1.75X"]],
    },
    {
      name: "Fund I", year: "2022",
      rows: [["AMOUNT","USD $15,285,013"],["INVESTMENTS","98 STARTUPS"],["TUPI","*1.18X"],["MOIC","*1.53X"],["DPI","0.06X"]],
    },
  ];

  const stats = [
    { value: "9.1K", label: "STARTUPS REVIEWED", yellow: false },
    { value: "1.234", label: "FIRST INTERVIEWS", yellow: false },
    { value: "400", label: "SECOND INTERVIEWS", yellow: false },
    { value: "116", label: "INVESTMENTS", yellow: true },
  ];

  return (
    <div className="relative w-full h-full flex flex-col p-[4%_5%]">
      <div className="mb-4" style={f(on, 0)}>
        <h2 className="font-sans font-bold text-white" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          Track <mark className="bg-[#FFEC40] text-black px-1 not-italic">Record</mark>
        </h2>
      </div>

      <div className="flex flex-1 min-h-0 border border-white/10">
        {funds.map((fund, fi) => (
          <div key={fund.name} className="flex-1 border-r border-white/10 last:border-r-0 flex flex-col">
            <div className="flex justify-between px-4 py-3 border-b border-white/10" style={f(on, 80 + fi * 30)}>
              <span className="font-mono text-white text-xs font-bold tracking-widest uppercase">{fund.name}</span>
              <span className="font-mono text-white/40 text-xs">{fund.year}</span>
            </div>
            {fund.rows.map(([label, value], ri) => (
              <div key={label} className="flex justify-between items-center px-4 py-3 border-b border-white/5 last:border-b-0 flex-1" style={f(on, 160 + ri * 50 + fi * 20)}>
                <span className="font-mono text-white/40 text-[10px] tracking-widest uppercase">{label}</span>
                <span className="font-mono text-white text-xs font-medium">{value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex mt-3 gap-1">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex-1 flex flex-col justify-center px-5 py-4 ${stat.yellow ? "bg-[#FFEC40]" : "bg-[#1a1a1a]"}`}
            style={grow(on, 300 + i * 70)}
          >
            <span className={`font-sans font-bold leading-none ${stat.yellow ? "text-black" : "text-white"}`} style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}>
              {stat.value}
            </span>
            <span className={`font-mono text-[10px] tracking-widest uppercase mt-1.5 ${stat.yellow ? "text-black/60" : "text-white/40"}`}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Slide4({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="relative w-full h-full flex">
      <div className="flex-1 flex flex-col justify-between p-[6%_5%]">
        <p className="font-sans text-white leading-relaxed" style={{ fontSize: "clamp(16px, 1.8vw, 26px)", ...f(on, 0) }}>
          In just five years,{" "}
          <mark className="bg-[#FFEC40] text-black px-1 not-italic">
            we&apos;ve assessed more companies than a typical LatAm investor
          </mark>{" "}
          does in an entire lifetime.
        </p>
        <div className="bg-[#1c1c1c] p-10" style={grow(on, 200)}>
          <div className="font-sans text-white font-light leading-none" style={{ fontSize: "clamp(44px, 6vw, 88px)" }}>9.161</div>
          <div className="font-mono text-white/40 text-xs tracking-widest uppercase mt-2">startups reviewed until date</div>
        </div>
      </div>
      <div className="w-[42%] bg-[#FFEC40] flex flex-col justify-between p-[6%_5%]" style={f(on, 100)}>
        <div>
          <div className="font-sans font-bold text-black leading-none" style={{ fontSize: "clamp(52px, 8vw, 120px)" }}>20.000+</div>
          <div className="font-sans text-black text-lg mt-2">startups</div>
        </div>
        <p className="font-mono text-black/50 text-[10px] tracking-[0.1em] uppercase leading-relaxed self-end text-right max-w-[240px]">
          In 4 years, we project to grow our funnel 1.5x year over year.
        </p>
      </div>
    </div>
  );
}

export function Slide5({ active }: P) {
  const on = useAnim(active);

  function Card({ name, tagline, bullets, moic, delay }: { name: string; tagline: string; bullets: string[]; moic: string; delay: number }) {
    return (
      <div className="border border-white/10 p-5 flex flex-col gap-3" style={f(on, delay)}>
        <div>
          <div className="font-sans font-semibold text-white text-sm">{name}</div>
          <div className="font-sans text-white/40 text-xs mt-0.5">{tagline}</div>
        </div>
        <ul className="flex-1 space-y-1">
          {bullets.map((b, i) => (
            <li key={i} className="font-sans text-white/50 text-xs leading-relaxed">• {b}</li>
          ))}
        </ul>
        <div className="inline-block bg-[#FFEC40] text-black font-mono text-[10px] font-bold px-3 py-1 tracking-widest uppercase w-fit">
          MOIC {moic}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full p-[5%]">
      <div className="flex h-full gap-5">
        <div className="flex flex-col gap-4 w-[38%]">
          <div style={f(on, 0)}>
            <div className="font-sans font-bold text-white leading-none" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>Early</div>
            <mark className="font-sans font-bold bg-[#FFEC40] text-black px-2 not-italic inline-block leading-none" style={{ fontSize: "clamp(44px, 7vw, 108px)" }}>
              Winners
            </mark>
          </div>
          <Card name="Fintoc" tagline="Direct, Fast, and cost-effective transactions." bullets={["We were their first institutional ticket in 2021.","We introduced the founders.","Seed: $1M at 42M Led by monashees","Series A: $7M at 29M Led by monashees + Propel"]} moic="12.4x" delay={200} />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <Card name="Toku" tagline="Payments for subscription companies in LatAm." bullets={["We were their first institutional ticket in 2021. (50k investment + 7%)","Seed: $7M at 42M Led by F-PRIME","Series A: $46M at 180M Led by OAK HC/FT + F-PRIME"]} moic="78.81x" delay={300} />
          <Card name="Shinkansen" tagline="Automates B2B transactions in real time." bullets={["Deal sourced through our network.","Oversold pre-seed. Oversold Seed Led by 10ventures","Average growth: 42% MoM"]} moic="8.14x" delay={400} />
        </div>
      </div>
    </div>
  );
}

export function Slide6({ active }: P) {
  const on = useAnim(active);

  const items = [
    { Icon: Code2, title: "TECHNICAL FOUNDER THESIS", desc: "Having a technical founder from day one derails the investment. The company goes faster and avoids high initial expense." },
    { Icon: Zap, title: "ELITE DEVELOPER COMMUNITY", desc: "Before investing, we were a software factory. For 12 years, we've built an elite developer community, uniquely positioning us to fund top tech startups." },
    { Icon: Globe, title: "IN PERSON COMMUNITY-DRIVEN MODEL", desc: "Our tight-knit community is our moat. Founders meet & build at Banana Houses, networking knowledge, capital, and resources. Founder trust drives deal flow." },
    { Icon: RefreshCw, title: "CONSISTENT PRESENCE", desc: "Great founders build when they want. To capture opportunities, you need early capital to stay top-of-mind for founders raising. In 2022, we were LATAM's most active investor." },
    { Icon: Lightbulb, title: "EARLY, SMART INVESTING", desc: "We found a sweetspot. Our value-add allows us to invest at better terms than typical pre-seed funds while attracting top LatAm startups." },
    { Icon: TrendingUp, title: "CLEAR EXIT PATH", desc: "LATAM has a strong VC ecosystem up to Series B. As the first institutional investor, Platanus has a clear exit path through secondary sales and M&As." },
  ];

  return (
    <div className="relative w-full h-full flex flex-col p-[4%]">
      <div className="grid grid-cols-3 gap-px bg-white/5 flex-1">
        {items.slice(0, 3).map(({ Icon, title, desc }, i) => (
          <div key={title} className="bg-black/40 p-6 flex flex-col gap-2.5" style={f(on, 80 + i * 60)}>
            <Icon size={18} className="text-[#FFEC40]" />
            <div className="font-mono text-white text-[10px] font-bold tracking-[0.1em] uppercase leading-tight">{title}</div>
            <p className="font-sans text-white/40 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center py-5" style={f(on, 0)}>
        <h2 className="font-sans font-bold text-white" style={{ fontSize: "clamp(24px, 3.5vw, 52px)" }}>
          How <mark className="bg-[#FFEC40] text-black px-2 not-italic">we win</mark>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/5 flex-1">
        {items.slice(3).map(({ Icon, title, desc }, i) => (
          <div key={title} className="bg-black/40 p-6 flex flex-col gap-2.5" style={f(on, 300 + i * 60)}>
            <Icon size={18} className="text-[#FFEC40]" />
            <div className="font-mono text-white text-[10px] font-bold tracking-[0.1em] uppercase leading-tight">{title}</div>
            <p className="font-sans text-white/40 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Slide7({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex flex-1 min-h-0">
        <div className="w-[46%] flex flex-col justify-center p-[5%_4%_5%_6%]">
          <h2 className="font-sans font-bold text-white mb-4" style={{ fontSize: "clamp(22px, 3vw, 44px)", ...f(on, 0) }}>
            The <mark className="bg-[#FFEC40] text-black px-2 not-italic">Banana</mark> House
          </h2>
          <p className="font-sans text-white/50 leading-relaxed mb-3" style={{ fontSize: "clamp(11px, 1.1vw, 15px)", ...f(on, 100) }}>
            Banana Houses are both offices and residences, fostering real in-person connections beyond Slack. Founders gather here for hackathons, launches, fireside chats, and social events.
          </p>
          <p className="font-sans text-white/50 leading-relaxed" style={{ fontSize: "clamp(11px, 1.1vw, 15px)", ...f(on, 180) }}>
            Each house has beds, promoting early regional expansion, reducing travel costs, and enabling quick access to local networks.
          </p>
        </div>
        <div className="flex-1 relative" style={f(on, 100)}>
          <div className="absolute" style={{ top: "18%", left: "42%" }}>
            <div className="font-mono text-white text-[10px] font-bold tracking-widest uppercase border border-white/40 px-3 py-1.5 bg-black/60 mb-1.5 w-fit">
              MEXICO CITY
            </div>
            <div className="font-mono text-[#FFEC40] text-[8px] font-bold tracking-widest uppercase border border-[#FFEC40] px-2 py-0.5 w-fit">
              COMING SOON
            </div>
          </div>
          <div className="absolute" style={{ bottom: "32%", right: "20%" }}>
            <div className="font-mono text-white text-[10px] font-bold tracking-widest uppercase border border-white/40 px-3 py-1.5 bg-black/60 w-fit">
              SANTIAGO
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[34%]" style={f(on, 280)}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 border-r border-white/5 last:border-r-0 bg-white/5 flex items-center justify-center">
            <span className="font-mono text-white/15 text-[9px] tracking-widest uppercase">Photo</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Slide8({ active }: P) {
  const on = useAnim(active);

  const events = [
    { title: "PLATANUS HACK", desc: "A 36-hour hackathon where 120 software engineers participate, first in its kind in LatAm." },
    { title: "PLATANUS FORUM", desc: "An annual community gathering to discuss new technologies and strengthen connections." },
    { title: "BREAKFASTS, LUNCHES & DINNERS", desc: "Weekly founder gatherings with top founders sharing unfiltered, off-the-record experiences." },
    { title: "DEMO DEV", desc: "10 CTOs showcase how they use code to build businesses. Attendance of over 600+ developers." },
    { title: "IN-PERSON FUNDRAISING", desc: "Bi-annual event in CDMX with top VC decision-makers, from firms like Monashees, Kaszek & Softbank." },
    { title: "AI SUMMIT WITH OPENAI", desc: "We are co-organizers of the first OpenAI Summit in Mexico City, aiming to promote technology in the region." },
  ];

  return (
    <div className="relative w-full h-full flex">
      <div className="flex items-center justify-center w-14 border-r border-white/10 shrink-0">
        <h2 className="font-sans font-bold text-white rotate-[-90deg] whitespace-nowrap" style={{ fontSize: "clamp(16px, 2vw, 28px)", ...f(on, 0) }}>
          Our <mark className="bg-[#FFEC40] text-black px-1 not-italic">events</mark>
        </h2>
      </div>
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-px bg-white/5">
        {events.map(({ title, desc }, i) => (
          <div key={title} className="bg-[#0d0d0d] flex flex-col justify-end p-5 gap-1.5" style={f(on, 100 + i * 60)}>
            <div className="font-mono text-white text-[9px] font-bold tracking-widest uppercase">{title}</div>
            <p className="font-sans text-white/40 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Slide9({ active }: P) {
  const on = useAnim(active);

  const mentors = [
    { name: "Juan Pablo Cuevas", company: "Cornershop", desc: "Built a unicorn that exited to Uber" },
    { name: "Helena Polyblank", company: "Mendel", desc: "Series B female led startup" },
    { name: "Rodolfo Dañino", company: "Crehana", desc: "Only ed-tech unicorn in LatAm" },
    { name: "Agustín Feuerhake", company: "Fintual", desc: "Sequoia backed LatAm Fintech" },
    { name: "Alejandro Matamala", company: "Runway", desc: "$3B Chilean unicorn" },
    { name: "Jaime Arrieta", company: "Buk", desc: "Fastest growing LatAm HR Series B" },
  ];

  const investors = ["Bessemer Venture Partners","monashees+","General Catalyst","Gradient","F/Prime","Propel","Wollef","hi ventures","Clocktower Technology Ventures","Y Combinator","Oak HC/FT"];

  return (
    <div className="relative w-full h-full p-[4%_6%]">
      <h2 className="font-sans font-bold text-white mb-5" style={{ fontSize: "clamp(20px, 2.8vw, 42px)", ...f(on, 0) }}>
        Who&apos;s in <mark className="bg-[#FFEC40] text-black px-2 not-italic">our orbit?</mark>
      </h2>
      <div className="flex gap-8 h-[calc(100%-4.5rem)]">
        <div className="w-[170px] shrink-0 flex flex-col gap-5" style={f(on, 80)}>
          <div>
            <p className="font-mono text-white text-[9px] font-bold uppercase tracking-[0.1em] leading-relaxed mb-1.5">WE OFFER ADVICE FROM EXPERIENCED FOUNDERS.</p>
            <p className="font-sans text-white/35 text-xs leading-relaxed">Our mentors are founders who invest 1+ hour biweekly in our portfolio.</p>
          </div>
          <div>
            <p className="font-mono text-white text-[9px] font-bold uppercase tracking-[0.1em] leading-relaxed mb-1.5">WE ARE GREAT AT EARNING BUSY PEOPLE&apos;S TIME.</p>
            <p className="font-sans text-white/35 text-xs leading-relaxed">Matt Mochary coaches legendary founders like Sam Altman and Brian Armstrong — we&apos;re the only LatAm VC to secure his team&apos;s time pro bono.</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 overflow-hidden">
          <div className="grid grid-cols-3 gap-x-6 gap-y-4">
            {mentors.map((m, i) => (
              <div key={m.name} style={f(on, 150 + i * 50)}>
                <div className="font-sans text-white text-xs font-medium">{m.name}</div>
                <div className="font-sans text-[#FFEC40] text-[10px] mt-0.5">{m.company}</div>
                <div className="font-sans text-white/30 text-[10px] mt-0.5 leading-relaxed">{m.desc}</div>
              </div>
            ))}
            <div className="col-span-3 font-sans text-white/20 text-[10px]" style={f(on, 460)}>+ 15 other experienced founders.</div>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex gap-4 items-start" style={f(on, 380)}>
            <span className="shrink-0 font-mono text-white/25 text-[8px] font-bold uppercase tracking-[0.15em] whitespace-nowrap leading-[1.8]">WE INVEST<br />WITH THE BEST</span>
            <div className="w-px self-stretch bg-white/5" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {investors.map((inv) => (
                <span key={inv} className="font-sans text-white/25 text-[10px] whitespace-nowrap">{inv}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Slide10({ active }: P) {
  const on = useAnim(active);

  const gps = [
    {
      initials: "PE", name: "Paula Enei", role: "Co-Founder, Managing Partner",
      bullets: ["Founded her first company in 2014.","Worked with over 500 companies through Start-Up Chile.","Recognized as a top woman investor by LatCA for the last 3 years.","Notable investments: Fintoc, Toku, and Shinkansen."],
    },
    {
      initials: "RH", name: "Raimundo Herrera", role: "General Partner, CTO",
      bullets: ["Engineer from Universidad Católica de Chile.","Master's in Cryptography.","Led a team of 25+ software engineers at Platanus' software factory."],
    },
    {
      initials: "JS", name: "Joaquin Stephens", role: "Co-Founder, General Partner",
      bullets: ["Unconventional lawyer from Universidad Católica de Chile.","Structured the VC arm for CHS Carey & Allende in Chile.","He trail runs, his ATH is 110km.","Notable investments: Toku, Examedi and Grupalia."],
    },
  ];

  return (
    <div className="relative w-full h-full p-[5%_6%]">
      <h2 className="font-sans text-white mb-8 leading-snug" style={{ fontSize: "clamp(16px, 2vw, 30px)", ...f(on, 0) }}>
        GPs have all the necessary skills to attract and select the best startups:{" "}
        <mark className="bg-[#FFEC40] text-black px-1 not-italic font-semibold">founders, operators, software, and legal.</mark>
      </h2>
      <div className="flex gap-10">
        {gps.map((gp, i) => (
          <div key={gp.name} className="flex-1" style={f(on, 120 + i * 100)}>
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center font-mono text-white/50 text-xs font-bold mb-3">
              {gp.initials}
            </div>
            <div className="font-sans font-semibold text-white text-sm mb-0.5">{gp.name}</div>
            <div className="font-mono text-white/40 text-[9px] tracking-widest uppercase mb-3">{gp.role}</div>
            <ul className="space-y-1.5">
              {gp.bullets.map((b, j) => (
                <li key={j} className="font-sans text-white/45 text-xs leading-relaxed">• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Slide11({ active }: P) {
  const on = useAnim(active);

  const left = [["FUND SIZE","USD $15M ($20M CAP)"],["SCOPE","PRE-SEED & SEED"],["PORTFOLIO","~40 STARTUPS"],["OWNERSHIP","5%–7% THROUGH POST-MONEY SAFE"],["TICKET SIZE","USD $50,000–$500,000"],["GEOGRAPHY","SPANISH SPEAKING LATIN AMERICA"]];
  const right = [["FUND DURATION","10 YEARS"],["FEES","2% MANAGEMENT FEE"],["CARRY","20% CARRY"],["CAPITAL CALLS","2 OR 3, ONE PER SEMESTER"],["FUND JURISDICTION","CANADA"]];

  return (
    <div className="relative w-full h-full p-[5%_6%]">
      <div style={f(on, 0)}>
        <div className="font-sans text-white leading-tight" style={{ fontSize: "clamp(26px, 3.5vw, 54px)" }}>Built for</div>
        <mark className="font-sans font-semibold bg-[#FFEC40] text-black px-2 not-italic inline-block" style={{ fontSize: "clamp(26px, 3.5vw, 54px)" }}>
          speed and adaptability
        </mark>
      </div>
      <div className="flex gap-16 mt-10">
        <div className="flex-1">
          {left.map(([l, v], i) => (
            <div key={l} className="flex justify-between items-baseline py-3.5 border-b border-white/5" style={f(on, 140 + i * 55)}>
              <span className="font-mono text-white/30 text-[10px] tracking-widest uppercase">{l}</span>
              <span className="font-mono text-white text-xs font-medium tracking-wider uppercase">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          {right.map(([l, v], i) => (
            <div key={l} className="flex justify-between items-baseline py-3.5 border-b border-white/5" style={f(on, 200 + i * 55)}>
              <span className="font-mono text-white/30 text-[10px] tracking-widest uppercase">{l}</span>
              <span className="font-mono text-white text-xs font-medium tracking-wider uppercase">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Slide12({ active }: P) {
  const on = useAnim(active);
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="font-mono text-white text-center" style={{ fontSize: "clamp(22px, 4vw, 62px)", ...f(on, 0) }}>
        paula<span className="text-[#FFEC40]">@</span>platan.us
      </div>
      <div className="absolute bottom-10 flex items-center gap-2" style={f(on, 200)}>
        <img src="/logo.svg" alt="Platanus" className="h-7 w-auto" />
      </div>
    </div>
  );
}

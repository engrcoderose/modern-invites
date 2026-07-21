interface FooterProps {
  bride: string;
  groom: string;
  dateDisplay: string;
  hashtag: string;
}

export default function Footer({ bride, groom, dateDisplay, hashtag }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#1f050b] px-5 pb-9 pt-24 text-center text-[#f7ede2] sm:px-8 sm:pt-32">
      <div className="hero-grain absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-[0.58rem] uppercase tracking-[0.38em] text-[#d8bd83]">We cannot wait to celebrate with you</p>
        <p className="mt-8 font-instrumentSerif text-[clamp(3.8rem,10vw,9rem)] leading-none tracking-[-0.055em]">{bride} <span className="font-meaCulpa text-[0.55em] text-[#d8bd83]">and</span> {groom}</p>
        <div className="mx-auto mt-10 h-14 w-px bg-gradient-to-b from-[#d8bd83] to-transparent" />
        <p className="mt-7 text-[0.62rem] uppercase tracking-[0.3em] text-white/55">{dateDisplay} · Antipolo</p>
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[0.56rem] uppercase tracking-[0.22em] text-white/35 sm:flex-row">
          <span>{hashtag}</span><a href="#top" className="transition-colors hover:text-[#d8bd83]">Return to the beginning ↑</a>
        </div>
      </div>
    </footer>
  );
}

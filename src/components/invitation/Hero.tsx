
"use client";

import { ArrowRight } from "lucide-react";

type HeroProps = {
  onOpenAction: () => void;
};

function CoastalCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`pointer-events-none absolute h-19 w-19 text-[#D2A52A] sm:h-25 sm:w-25 ${className}`}
      fill="none"
    >
      <path
        d="M7 94 V34 Q7 7 34 7 H94"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".8"
      />

      <path
        d="M14 94 V36 Q14 14 36 14 H94"
        stroke="currentColor"
        strokeWidth=".55"
        opacity=".5"
      />

      {/* Estrela-do-mar */}
      <path
        d="M50 22
          C54 22 56 35 60 38
          C64 41 77 34 80 39
          C83 43 72 51 73 57
          C74 63 84 72 81 76
          C78 81 65 72 59 74
          C54 76 54 90 49 90
          C44 90 44 76 39 74
          C33 72 21 81 18 76
          C15 72 26 63 27 57
          C28 51 17 43 20 39
          C23 34 36 41 40 38
          C44 35 46 22 50 22 Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        opacity=".95"
      />

      {/* Detalhes internos */}
      <g
        stroke="currentColor"
        strokeWidth=".7"
        strokeLinecap="round"
        opacity=".7"
      >
        <path d="M50 54 L50 25" />
        <path d="M50 54 L77 40" />
        <path d="M50 54 L77 74" />
        <path d="M50 54 L49 86" />
        <path d="M50 54 L22 74" />
        <path d="M50 54 L23 40" />
      </g>

      <circle cx="50" cy="54" r="2" fill="currentColor" />

      {/* Ondas */}
      <g
        stroke="currentColor"
        strokeWidth=".9"
        strokeLinecap="round"
        opacity=".8"
      >
        <path d="M16 82 Q25 76 34 82 T52 82" />
        <path d="M24 89 Q33 83 42 89 T60 89" />
      </g>

      <circle cx="82" cy="84" r="1.5" fill="currentColor" opacity=".8" />
    </svg>
  );
}

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 180 20"
      aria-hidden="true"
      className="h-5 w-40 text-[#D2A52A] sm:w-48"
      fill="none"
    >
      <path
        d="M2 10 Q15 1 28 10 T54 10 T80 10"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".8"
      />
      <path
        d="M100 10 Q113 1 126 10 T152 10 T178 10"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".8"
      />
      <path
        d="M88 10 L92 6 L96 10 L92 14 Z"
        stroke="currentColor"
        strokeWidth=".8"
      />
      <circle cx="92" cy="10" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function Hero({ onOpenAction }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-[#163D52] text-white">

      {/* Imagem alternativa enquanto o vídeo carrega */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")',
        }}
      />

      {/* Vídeo do oceano */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/videos/ocean.mp4" type="video/mp4" />
      </video>

      {/* Camada de profundidade e contraste */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#102F39]/65 via-[#163D52]/35 to-[#102F39]/75" />

      {/* Textura sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(#F1EBDD 0.6px, transparent 0.6px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Moldura externa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 z-10 border border-[#D2A52A]/90 sm:inset-5 md:inset-8"
      />

      {/* Moldura interna */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 z-10 border border-[#D2A52A]/45 sm:inset-7 md:inset-10"
      />

      {/* Ornamentos dos quatro cantos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      >
        <CoastalCorner className="left-3 top-3 sm:left-5 sm:top-5 md:left-8 md:top-8" />
        <CoastalCorner className="right-3 top-3 rotate-90 sm:right-5 sm:top-5 md:right-8 md:top-8" />
        <CoastalCorner className="bottom-3 left-3 -rotate-90 sm:bottom-5 sm:left-5 md:bottom-8 md:left-8" />
        <CoastalCorner className="bottom-3 right-3 rotate-180 sm:bottom-5 sm:right-5 md:bottom-8 md:right-8" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 mx-auto flex min-h-svh w-full max-w-7xl flex-1 flex-col items-center justify-between px-8 py-12 text-center sm:px-14 sm:py-14">

        {/* Identidade central */}
        <main className="flex w-full flex-1 flex-col items-center justify-center">

          {/* Ornamento superior */}
          <div className="mb-7 flex flex-col items-center gap-3 sm:mb-9">
            <span className="text-[9px] font-medium uppercase tracking-[0.48em] text-[#D2A52A] sm:text-[10px]">
              A special invitation
            </span>

            <WaveDivider />
          </div>

          {/* Nome da aniversariante - Italianno */}
          <h1 className="script-font whitespace-nowrap text-[clamp(4.5rem,15vw,10rem)] font-normal leading-[0.9] text-[#F1EBDD] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            Juliana&apos;s
          </h1>

          {/* Título da comemoração - Italianno */}
          <div className="mt-6 flex flex-col items-center sm:mt-8">
            <span className="mb-2 h-px w-12 bg-[#D2A52A]/90" />

            <p className="script-font text-5xl font-normal leading-none text-[#F1EBDD] sm:text-6xl md:text-7xl">
              23rd Birthday
            </p>

            <span className="mt-2 h-px w-12 bg-[#D2A52A]/90" />
          </div>

          {/* Data - Poppins */}
          <div className="mt-9 flex items-center gap-5 border-y border-[#D2A52A]/60 px-7 py-4 sm:mt-11 sm:gap-8 sm:px-10">
            <span className="h-1 w-1 rotate-45 bg-[#D2A52A]" />

            <div className="flex flex-col items-center gap-1">
              <span className="text-[8px] font-medium uppercase tracking-[0.38em] text-[#D2A52A] sm:text-[9px]">
                Save the date
              </span>

              <span
                className="text-[10px] font-medium tracking-[0.2em] text-[#F1EBDD] sm:text-xs sm:tracking-[0.25em]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                15 NOVEMBER 2026
              </span>
            </div>

            <span className="h-1 w-1 rotate-45 bg-[#D2A52A]" />
          </div>
        </main>

        {/* Botão de abertura */}
        <footer className="flex flex-col items-center gap-5 pb-12 sm:pb-16">
          <button
            type="button"
            onClick={onOpenAction}
            className="group inline-flex min-h-14 items-center justify-center gap-5 border border-[#D2A52A]/90 bg-[#163D52]/45 px-10 py-4 text-[9px] font-semibold uppercase tracking-[0.32em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#F2F7F6] hover:bg-[#F2F7F6] hover:text-[#163D52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7E4EC] sm:px-14 sm:text-[10px]"
          >
            <span>Abrir convite</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D2A52A]/80 transition-all duration-300 group-hover:border-[#163D52]/40 group-hover:bg-[#163D52] group-hover:text-white">
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </button>

          <div className="flex items-center gap-3">
            <span className="h-px w-7 bg-[#D2A52A]/70" />

            <span className="text-[8px] uppercase tracking-[0.3em] text-[#F1EBDD]/80">
              Let&apos;s celebrate together
            </span>

            <span className="h-px w-7 bg-[#D2A52A]/70" />
          </div>
        </footer>
      </div>
    </section>
  );
}

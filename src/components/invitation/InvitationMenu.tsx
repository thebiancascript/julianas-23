"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import TopicCard from "./TopicCard";
import { topics, type TopicId } from "./topics";

type InvitationMenuProps = {
  onSelectTopicAction: (id: TopicId) => void;
};

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EVENT_DATE = new Date("2026-11-15T00:00:00-03:00").getTime();

function calculateCountdown(): CountdownTime {
  const difference = Math.max(0, EVENT_DATE - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

/* =====================================
ELEMENTO SOLAR
===================================== */

function SunOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />

      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M24 3 V13" />
        <path d="M24 35 V45" />
        <path d="M3 24 H13" />
        <path d="M35 24 H45" />
        <path d="M9.2 9.2 L16.2 16.2" />
        <path d="M31.8 31.8 L38.8 38.8" />
        <path d="M38.8 9.2 L31.8 16.2" />
        <path d="M16.2 31.8 L9.2 38.8" />
      </g>
    </svg>
  );
}

/* =====================================
ESTRELA-DO-MAR
===================================== */

function Starfish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M60 7
        C68 7 70 30 74 43
        C85 34 105 28 111 35
        C117 42 100 57 89 66
        C103 73 113 88 107 96
        C101 104 81 92 69 86
        C68 101 63 115 56 115
        C48 115 46 95 44 83
        C31 94 13 102 7 94
        C1 86 19 70 30 63
        C20 53 10 38 16 31
        C23 23 42 39 51 47
        C52 30 54 7 60 7Z"
        fill="#D2A52A"
        fillOpacity=".13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".75"
      >
        <path d="M60 59 Q53 38 57 17" />
        <path d="M60 59 Q82 48 103 38" />
        <path d="M60 59 Q84 76 99 89" />
        <path d="M60 59 Q58 85 59 105" />
        <path d="M60 59 Q36 76 17 88" />
        <path d="M60 59 Q37 46 23 34" />
      </g>

      <g fill="currentColor">
        <circle cx="59" cy="27" r="1.7" />
        <circle cx="55" cy="39" r="1.4" />
        <circle cx="80" cy="49" r="1.6" />
        <circle cx="91" cy="43" r="1.3" />
        <circle cx="85" cy="78" r="1.7" />
        <circle cx="73" cy="72" r="1.3" />
        <circle cx="57" cy="90" r="1.7" />
        <circle cx="43" cy="78" r="1.5" />
        <circle cx="29" cy="85" r="1.3" />
        <circle cx="35" cy="51" r="1.6" />
        <circle cx="25" cy="40" r="1.3" />
      </g>
    </svg>
  );
}

/* =====================================
RAMO DE CORAL DELICADO
===================================== */

function CoralBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M48 112 C47 91 50 70 47 48 C46 34 39 22 31 10" />

        <path d="M47 83 C36 75 25 65 17 49" />
        <path d="M34 68 C23 67 14 61 7 52" />
        <path d="M28 61 C29 49 27 39 20 29" />
        <path d="M47 57 C35 48 31 37 31 25" />

        <path d="M48 96 C60 85 70 72 76 57" />
        <path d="M62 82 C75 81 84 74 92 63" />
        <path d="M69 72 C68 59 73 47 83 38" />
        <path d="M47 46 C57 37 62 26 62 14" />

        <path d="M17 49 L10 39" />
        <path d="M20 29 L12 23" />
        <path d="M31 25 L26 14" />
        <path d="M76 57 L80 44" />
        <path d="M92 63 L96 52" />
        <path d="M83 38 L84 26" />
        <path d="M62 14 L58 5" />
        <path d="M7 52 L3 43" />
      </g>

      <g fill="currentColor">
        <circle cx="31" cy="10" r="1.5" />
        <circle cx="20" cy="29" r="1.4" />
        <circle cx="17" cy="49" r="1.4" />
        <circle cx="7" cy="52" r="1.4" />
        <circle cx="31" cy="25" r="1.4" />
        <circle cx="62" cy="14" r="1.5" />
        <circle cx="76" cy="57" r="1.4" />
        <circle cx="92" cy="63" r="1.4" />
        <circle cx="83" cy="38" r="1.4" />
      </g>
    </svg>
  );
}

/* =====================================
CONCHA DELICADA
===================================== */

function BeachShell({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 29 C7 17 14 8 24 7 C34 8 41 17 41 29 C41 36 33 41 24 41 C15 41 7 36 7 29Z" />

        <path d="M24 40 L24 8" />
        <path d="M24 40 L13 13" />
        <path d="M24 40 L35 13" />
        <path d="M24 40 L8 25" />
        <path d="M24 40 L40 25" />

        <path d="M15 36 Q24 40 33 36" />
      </g>
    </svg>
  );
}

/* =====================================
DIVISOR DE ONDAS
===================================== */

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      aria-hidden="true"
      className="mx-auto h-6 w-full max-w-65 text-[#00A6CB] sm:max-w-75 md:max-w-[320px]"
    >
      <path
        d="M2 8 Q22 0 42 8 T82 8 T122 8 T162 8 T202 8 T242 8 T282 8 T318 8"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".8"
      />
      <path
        d="M2 16 Q22 8 42 16 T82 16 T122 16 T162 16 T202 16 T242 16 T282 16 T318 16"
        stroke="currentColor"
        strokeWidth=".8"
        opacity=".5"
      />
    </svg>
  );
}

/* =====================================
MENU PRINCIPAL
===================================== */

export default function InvitationMenu({
  onSelectTopicAction,
}: InvitationMenuProps) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [eventStarted, setEventStarted] = useState(false);
  const [oceanSoundPlaying, setOceanSoundPlaying] = useState(false);
  const oceanAudioRef = useRef<HTMLAudioElement | null>(null);

  async function toggleOceanSound() {
    const audio = oceanAudioRef.current;

    if (!audio) return;

    if (oceanSoundPlaying) {
      audio.pause();
      setOceanSoundPlaying(false);
      return;
    }

    audio.volume = 0.18;

    try {
      await audio.play();
      setOceanSoundPlaying(true);
    } catch (error) {
      console.error("Não foi possível reproduzir o som do mar:", error);
      setOceanSoundPlaying(false);
    }
  }

  useEffect(() => {
    const audio = oceanAudioRef.current;

    return () => {
      audio?.pause();
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(calculateCountdown());
      setEventStarted(Date.now() >= EVENT_DATE);
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdownItems = [
    { value: countdown.days, label: "Dias" },
    { value: countdown.hours, label: "Horas" },
    { value: countdown.minutes, label: "Minutos" },
    { value: countdown.seconds, label: "Segundos" },
  ];

  return (
    <main className="invitation-menu-enter relative isolate min-h-screen w-full overflow-hidden bg-[#F1EBDD] text-[#163D52]">
      <audio
        ref={oceanAudioRef}
        src="https://sfxmint.com/dl/ambience-ocean-04.mp3"
        loop
        preload="none"
      />

      {/* FUNDO COM TEXTURA SUAVE DE AREIA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(rgba(130,111,78,.10) .55px, transparent .55px),
            radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.55), transparent 65%)
          `,
          backgroundSize: "8px 8px, 100% 100%",
        }}
      />

      {/* CORAIS DELICADOS NAS BORDAS DO CONVITE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 overflow-hidden"
      >
        {/* LATERAL ESQUERDA */}
        <CoralBranch className="absolute -left-10 top-[0%] h-24 w-10 -rotate-12 text-[#00A6CB]/40 sm:-left-8 sm:h-32 sm:w-24" />

        <CoralBranch className="absolute -left-10 top-[25%] h-24 w-18 rotate-[8deg] text-[#00A6CB]/35 sm:-left-8 sm:h-32 sm:w-24" />

        <CoralBranch className="absolute -left-10 top-[0%] h-24 w-18 -rotate-12 text-[#00A6CB]/40 sm:-left-8 sm:h-32 sm:w-24" />

        <CoralBranch className="absolute -left-10 bottom-[1%] h-24 w-18 rotate-12 text-[#00A6CB]/35 sm:-left-8 sm:h-32 sm:w-24" />

        {/* LATERAL DIREITA */}
        <CoralBranch className="absolute -right-10 top-[3%] h-24 w-18 rotate-12 scale-x-[-1] text-[#00A6CB]/35 sm:-right-8 sm:h-32 sm:w-24" />
        <CoralBranch className="absolute -right-10 bottom-[2%] h-24 w-18 rotate-12 scale-x-[-1] text-[#00A6CB]/35 sm:-right-8 sm:h-32 sm:w-24" />
        <CoralBranch className="absolute -right-10 top-[29%] h-24 w-18 -rotate-8 scale-x-[-1] text-[#00A6CB]/40 sm:-right-8 sm:h-32 sm:w-24" />

      </div>

      {/* ESTRELAS-DO-MAR NO FUNDO */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-2 overflow-hidden"
      >
        <Starfish className="absolute -right-3 top-167.5 h-24 w-24 rotate-18 text-[#C99524]/55 sm:right-[3%] sm:top-180 sm:h-32 sm:w-32" />

        {/* ESTRELA MOVIDA PARA O LADO ESQUERDO */}
        <Starfish className="absolute bottom-68.25 left-[5%] h-14 w-14 rotate-[-15deg] text-[#00A6CB]/45 sm:left-[12%] sm:h-20 sm:w-20" />
      </div>

      <div className="relative z-10">
        {/* CABEÇALHO */}
        <header className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-8 pt-12 text-center sm:pt-16">
          <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#00A6CB] sm:text-[10px]">
            Seja bem-vindo(a) ao meu convite de aniversário!
          </p>

          {/* ORNAMENTO SOLAR */}
          <div className="my-6 flex items-center gap-5 text-[#D2A52A]">
            <span className="h-px w-16 bg-[#D2A52A]/90" />
            <SunOrnament className="h-8 w-8" />
            <span className="h-px w-16 bg-[#D2A52A]/90" />
          </div>

          {/* ESTRELAS-DO-MAR AO REDOR DO TÍTULO */}
          <Starfish className="pointer-events-none absolute left-[1%] top-[48%] h-14 w-14 rotate-[-18deg] text-[#C99524]/75 sm:left-[9%] sm:h-20 sm:w-20 md:left-[13%]" />

          <Starfish className="pointer-events-none absolute right-[1%] top-[51%] h-14 w-14 rotate-20 text-[#00A6CB]/65 sm:right-[9%] sm:h-20 sm:w-20 md:right-[13%]" />

          <h1 className="script-font relative z-10 mt-2 text-[2.75rem] min-[375px]:text-6xl font-normal leading-[1.05] text-[#00A6CB] sm:text-7xl md:text-9xl">
              The Celebration
          </h1>

          <p className="mt-5 text-[1px] font-medium uppercase tracking-[0.3em] text-[#00A6CB] sm:text-xs">
            15 · 11 · 2026
          </p>

          <div className="mt-7 w-full">
            <WaveDivider />
          </div>
        </header>

        {/* CONTAGEM REGRESSIVA */}
        <section className="mx-auto w-full max-w-4xl px-5 pb-12 sm:pb-16">
          <div className="relative border-y border-[#D2A52A]/80 py-7 text-center sm:py-9">
            <Starfish className="pointer-events-none absolute -right-1 top-1/2 hidden h-12 w-12 translate-x-full -translate-y-1/2 rotate-12 text-[#C99524]/55 sm:block" />

            <p className="mb-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#00A6CB] sm:text-[10px]">
              {eventStarted
                ? "Hoje é dia de celebrar!"
                : "A contagem regressiva já começou"}
            </p>

            <div className="grid grid-cols-4 gap-2 sm:gap-5">
              {countdownItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative flex flex-col items-center"
                >
                  <span className="script-font text-5xl font-normal leading-none tabular-nums text-[#00A6CB] sm:text-7xl md:text-8xl">
                    {formatNumber(item.value)}
                  </span>

                  <span className="mt-2 text-[8px] font-medium uppercase tracking-[0.15em] text-[#00A6CB] sm:text-[10px] sm:tracking-[0.25em]">
                    {item.label}
                  </span>

                  {index !== 3 && (
                    <span className="absolute -right-1 top-3 h-1 w-1 rounded-full bg-[#D2A52A] sm:top-6 sm:h-1.5 sm:w-1.5" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <WaveDivider />
            </div>
          </div>
        </section>

        {/* MENU DE TÓPICOS */}
        <section className="relative isolate mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="relative z-10 mb-7 flex flex-col gap-3 sm:mb-9">
            <div className="flex items-center gap-3">
              <SunOrnament className="h-7 w-7 text-[#D2A52A]" />

              <p className="script-font text-4xl font-normal leading-none text-[#00A6CB] sm:text-6xl">
                Explore o convite
              </p>
            </div>
          </div>

          {/* CARTÕES DOS TÓPICOS E ONDAS RECORTADAS */}
          <div className="relative isolate grid grid-cols-2 auto-rows-fr gap-3 overflow-hidden sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {/* ONDAS LIMITADAS À ÁREA DOS CARTÕES */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            >
              <svg
                viewBox="0 0 1200 900"
                preserveAspectRatio="none"
                fill="none"
                className="h-full w-full"
              >
                <g stroke="#00A6CB" strokeWidth="1.5" opacity=".25">
                  <path d="M-80 180 C80 120 190 240 350 180 S620 120 790 180 S1080 240 1280 165" />
                  <path d="M-80 205 C80 145 190 265 350 205 S620 145 790 205 S1080 265 1280 190" />
                  <path d="M-80 230 C80 170 190 290 350 230 S620 170 790 230 S1080 290 1280 215" />

                  <path d="M-80 355 C8₀ 295 19₀ 415 35₀ 355 S62₀ 295 79₀ 355 S1₀8₀ 415 1₂8₀ 34₀" />
                  <path d="M-80 380 C80 320 190 440 350 380 S620 320 790 380 S1080 440 1280 365" />
                  <path d="M-80 405 C80 345 190 465 350 405 S620 345 790 405 S1080 465 1280 390" />

                  <path d="M-80 530 C80 470 190 590 350 530 S620 470 790 530 S1080 590 1280 515" />
                  <path d="M-80 555 C80 495 190 615 350 555 S620 495 790 555 S1080 615 1280 540" />
                  <path d="M-80 580 C80 520 190 640 350 580 S620 520 790 580 S1080 640 1280 565" />

                  <path d="M-80 705 C80 645 190 765 350 705 S620 645 790 705 S1080 765 1280 690" />
                  <path d="M-80 730 C80 670 190 790 350 730 S620 670 790 730 S1080 790 1280 715" />
                  <path d="M-80 755 C80 695 190 815 350 755 S620 695 790 755 S1080 815 1280 740" />

                  <path d="M-80 845 C80 785 190 905 350 845 S620 785 790 845 S1080 905 1280 830" />
                  <path d="M-80 870 C80 810 190 930 350 870 S620 810 790 870 S1080 930 1280 855" />
                </g>
              </svg>
            </div>

            {/* CARDS: SEM CONCHAS OU CORAIS*/}
            {topics.map((topic) => (
              <div key={topic.id} className="relative z-10 h-full [&>button]:h-full">
                <TopicCard
                  topic={topic}
                  onClickAction={onSelectTopicAction}
                />
              </div>
            ))}
          </div>

          {/* CONTROLE DO SOM DO MAR */}
          <div className="relative z-10 mt-5 flex justify-center">
            <button
              type="button"
              onClick={toggleOceanSound}
              aria-label={oceanSoundPlaying ? "Pausar som do mar" : "Ouvir o som do mar"}
              aria-pressed={oceanSoundPlaying}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D2A52A]/70 bg-[#FAF9F6]/90 px-5 py-3 text-[#00A6CB] shadow-sm transition hover:bg-[#F1F5F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6CB] focus-visible:ring-offset-2"
            >
              {oceanSoundPlaying ? <Volume2 size={17} /> : <VolumeX size={17} />}
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em]">
                {oceanSoundPlaying ? "Pausar som do mar" : "Ouvir o mar"}
              </span>
            </button>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="relative border-t border-[#D2A52A]/65 px-5 py-8 text-center">
          <p className="font-serif text-lg italic text-[#00A6CB] sm:text-[16px]">
            Let&apos;s make beautiful memories together.
          </p>

          {/* CONCHA DELICADA */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#D2A52A]/80" />

            <BeachShell className="h-9 w-9 text-[#C99524]" />

            <span className="h-px w-10 bg-[#D2A52A]/80" />
          </div>

          <p className="mt-3 text-[8px] uppercase tracking-[0.25em] text-[#00A6CB] sm:text-[9px]">
            23rd Birthday · 2026
          </p>
        </footer>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState, type KeyboardEvent } from "react";

type BirthdayPeriod = "before" | "birthday" | "after";

function getBirthdayPeriod(): BirthdayPeriod {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Fortaleza",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const dateParts = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  const today = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;

  if (today < "2026-11-15") return "before";
  if (today === "2026-11-15") return "birthday";

  return "after";
}

// 23 velinhas distribuídas em três fileiras
const candles = [
  { x: 113, y: 128 },
  { x: 137, y: 121 },
  { x: 161, y: 117 },
  { x: 185, y: 115 },
  { x: 209, y: 117 },
  { x: 233, y: 121 },
  { x: 257, y: 128 },

  { x: 100, y: 137 },
  { x: 125, y: 129 },
  { x: 150, y: 123 },
  { x: 175, y: 120 },
  { x: 200, y: 120 },
  { x: 225, y: 123 },
  { x: 250, y: 129 },
  { x: 275, y: 137 },

  { x: 108, y: 143 },
  { x: 132, y: 139 },
  { x: 156, y: 135 },
  { x: 180, y: 133 },
  { x: 204, y: 135 },
  { x: 228, y: 139 },
  { x: 252, y: 143 },
  { x: 276, y: 143 },
];

// Paleta das velinhas
const candleColors = [
  "#168FA8",
  "#89B6C2",
  "#4D8293",
  "#DDEBED",
];

function BirthdayCake({
  candlesLit,
  interactive,
  onBlow,
}: {
  candlesLit: boolean;
  interactive: boolean;
  onBlow: () => void;
}) {
  function handleKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onBlow();
    }
  }

  return (
    <svg
      viewBox="0 0 360 285"
      className="mx-auto block w-full max-w-97.5 overflow-visible"
      role="img"
      aria-label="Bolo azul de aniversário com 23 velinhas"
    >
      <defs>
        {/* Gradiente azul do bolo */}
        <linearGradient id="cakeBlue" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#A8D0DA" />
          <stop offset="55%" stopColor="#89B6C2" />
          <stop offset="100%" stopColor="#4D8293" />
        </linearGradient>

        {/* Gradiente da cobertura */}
        <linearGradient
          id="cakeFrosting"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#F2F7F6" />
          <stop offset="100%" stopColor="#DDEBED" />
        </linearGradient>

        {/* Gradiente do prato */}
        <linearGradient
          id="cakePlate"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D9C18F" />
        </linearGradient>

        {/* Brilho das chamas */}
        <filter id="candleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Brilhinhos dourados */}
      <g fill="#C6A76D">
        <path
          d="M45 61 l3 8 8 3 -8 3 -3 8 -3-8 -8-3 8-3z"
          opacity=".8"
        />

        <path
          d="M308 69 l2 6 6 2 -6 2 -2 6 -2-6 -6-2 6-2z"
          opacity=".8"
        />

        <circle cx="73" cy="99" r="2" />
        <circle cx="292" cy="111" r="2.5" />
        <circle cx="63" cy="132" r="1.8" />
        <circle cx="300" cy="40" r="2" />
      </g>

      {/* Pequenos detalhes ciano */}
      <g
        fill="none"
        stroke="#89B6C2"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".9"
      >
        <path d="M82 52 v10 M77 57 h10" />
        <path d="M286 91 v9 M281.5 95.5 h9" />
      </g>

      {/* Sombra */}
      <ellipse
        cx="180"
        cy="254"
        rx="139"
        ry="13"
        fill="#163D52"
        opacity=".09"
      />

      {/* Prato do bolo */}
      <ellipse
        cx="180"
        cy="244"
        rx="137"
        ry="20"
        fill="url(#cakePlate)"
      />

      <ellipse
        cx="180"
        cy="239"
        rx="128"
        ry="15"
        fill="#F2F7F6"
      />

      <ellipse
        cx="180"
        cy="237"
        rx="112"
        ry="9"
        fill="none"
        stroke="#C6A76D"
        strokeWidth="1.2"
      />

      {/* Corpo azul do bolo */}
      <path
        d="M55 143
          C55 132 111 119 180 119
          C249 119 305 132 305 143
          L305 215
          C305 229 294 237 280 237
          L80 237
          C66 237 55 229 55 215 Z"
        fill="url(#cakeBlue)"
      />

      {/* Camada de recheio */}
      <path
        d="M57 194
          C105 201 137 198 180 201
          C224 204 265 199 303 194
          L303 207
          C259 216 218 213 180 214
          C138 213 98 216 57 207 Z"
        fill="#F2F7F6"
      />

      {/* Cobertura azul clarinha */}
      <path
        d="M55 143
          C55 125 111 110 180 110
          C249 110 305 125 305 143
          C305 153 297 159 289 153
          C280 146 273 151 273 161
          C272 172 257 174 252 163
          C247 152 235 153 230 164
          C225 175 210 174 206 163
          C201 152 188 151 183 163
          C178 175 163 175 158 164
          C153 153 141 152 136 163
          C131 174 116 172 114 161
          C112 151 103 147 95 155
          C86 164 72 158 70 149
          C62 154 55 151 55 143 Z"
        fill="url(#cakeFrosting)"
      />

      {/* Acabamento da cobertura */}
      <path
        d="M58 143
          C88 128 133 120 180 120
          C227 120 272 128 302 143"
        fill="none"
        stroke="#89B6C2"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Detalhes decorativos no corpo */}
      <path
        d="M67 183 Q180 194 293 183"
        fill="none"
        stroke="#DDEBED"
        strokeWidth="2"
        opacity=".8"
      />

      <g fill="#F2F7F6" opacity=".95">
        <circle cx="79" cy="173" r="2.5" />
        <circle cx="105" cy="211" r="2" />
        <circle cx="132" cy="188" r="2.5" />
        <circle cx="228" cy="188" r="2.5" />
        <circle cx="255" cy="211" r="2" />
        <circle cx="280" cy="173" r="2.5" />
      </g>

      {/* Área interativa das velinhas */}
      <g
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : -1}
        aria-label={
          candlesLit
            ? "Apagar as 23 velinhas"
            : "Acender as 23 velinhas"
        }
        onClick={interactive ? onBlow : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        style={{
          cursor: interactive ? "pointer" : "default",
          pointerEvents: "all",
          outline: "none",
        }}
      >
        {/* Área invisível para facilitar o clique */}
        <rect
          x="88"
          y="74"
          width="190"
          height="88"
          fill="#FFFFFF"
          opacity="0.001"
        />

        {candles.map((candle, index) => {
          const color = candleColors[index % candleColors.length];

          return (
            <g key={index}>
              {/* Corpo da vela */}
              <rect
                x={candle.x - 2.5}
                y={candle.y - 19}
                width="5"
                height="19"
                rx="2"
                fill={color}
              />

              {/* Detalhe branco */}
              <path
                d={`M${candle.x - 1.5} ${candle.y - 14} l3 3`}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity=".85"
              />

              {/* Pavio */}
              <path
                d={`M${candle.x} ${candle.y - 19} v-3`}
                stroke="#8D624D"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Chama */}
              {candlesLit && (
                <g>
                  {/* Brilho suave */}
                  <path
                    d={`M${candle.x} ${candle.y - 23}
                      C${candle.x - 5} ${candle.y - 29}
                      ${candle.x - 2} ${candle.y - 34}
                      ${candle.x} ${candle.y - 36}
                      C${candle.x + 5} ${candle.y - 29}
                      ${candle.x + 4} ${candle.y - 26}
                      ${candle.x} ${candle.y - 23} Z`}
                    fill="#E9A94F"
                    opacity=".35"
                    filter="url(#candleGlow)"
                  />

                  <path
                    d={`M${candle.x} ${candle.y - 23}
                      C${candle.x - 5} ${candle.y - 29}
                      ${candle.x - 2} ${candle.y - 34}
                      ${candle.x} ${candle.y - 36}
                      C${candle.x + 5} ${candle.y - 29}
                      ${candle.x + 4} ${candle.y - 26}
                      ${candle.x} ${candle.y - 23} Z`}
                    fill="#E9A94F"
                    className="origin-bottom animate-pulse"
                  />

                  <path
                    d={`M${candle.x} ${candle.y - 24}
                      C${candle.x - 2} ${candle.y - 28}
                      ${candle.x} ${candle.y - 30}
                      ${candle.x + 1} ${candle.y - 31}
                      C${candle.x + 3} ${candle.y - 27}
                      ${candle.x + 2} ${candle.y - 25}
                      ${candle.x} ${candle.y - 24} Z`}
                    fill="#FFF1C7"
                  />
                </g>
              )}
            </g>
          );
        })}
      </g>

      {/* Plaquinha dos 23 anos */}
      <rect
        x="147"
        y="179"
        width="66"
        height="37"
        rx="10"
        fill="#F2F7F6"
        stroke="#C6A76D"
        strokeWidth="1.5"
      />

      <text
        x="180"
        y="205"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="25"
        fill="#163D52"
      >
        23
      </text>

      {/* Flor lateral esquerda */}
      <g transform="translate(91 181)">
        <circle cx="0" cy="-5" r="4" fill="#F2F7F6" />
        <circle cx="5" cy="0" r="4" fill="#F2F7F6" />
        <circle cx="0" cy="5" r="4" fill="#F2F7F6" />
        <circle cx="-5" cy="0" r="4" fill="#F2F7F6" />
        <circle cx="0" cy="0" r="3" fill="#C6A76D" />
      </g>

      {/* Flor lateral direita */}
      <g transform="translate(269 181)">
        <circle cx="0" cy="-5" r="4" fill="#F2F7F6" />
        <circle cx="5" cy="0" r="4" fill="#F2F7F6" />
        <circle cx="0" cy="5" r="4" fill="#F2F7F6" />
        <circle cx="-5" cy="0" r="4" fill="#F2F7F6" />
        <circle cx="0" cy="0" r="3" fill="#C6A76D" />
      </g>

      {/* Acabamento inferior */}
      <path
        d="M74 225 Q180 240 286 225"
        fill="none"
        stroke="#168FA8"
        strokeWidth="2"
        opacity=".7"
      />
    </svg>
  );
}

export default function BirthdaySurprise() {
  const [period, setPeriod] = useState<BirthdayPeriod>("before");
  const [candlesLit, setCandlesLit] = useState(true);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const updatePeriod = () => {
      setPeriod(getBirthdayPeriod());

      const params = new URLSearchParams(window.location.search);
      setPreview(params.get("birthdayPreview") === "1");
    };

    updatePeriod();

    const interval = window.setInterval(updatePeriod, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  // O modo de pré-visualização simula o aniversário
  const isBirthday = preview || period === "birthday";
  const isAfterBirthday = !preview && period === "after";
  const interactive = isBirthday;

  function toggleCandles() {
    if (!interactive) return;

    setCandlesLit((current) => !current);
  }

  return (
    <section className="mx-auto w-full max-w-3xl overflow-hidden rounded-[28px] border border-[#B7CED3] bg-[#F2F7F6]">
      <div className="relative px-5 py-9 text-center sm:px-10 sm:py-12">

        {/* Identificação */}
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#168FA8]">
          {isAfterBirthday
            ? "Uma lembrança especial"
            : isBirthday
              ? "Um dia para celebrar"
              : "Guarde essa data"}
        </span>

        {/* Título */}
        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#163D52] sm:text-4xl">
          {isAfterBirthday
            ? "Foi lindo celebrar você, Ju!"
            : isBirthday
              ? "Hoje é dia de celebrar a Ju!"
              : "Juliana faz 23!"}
        </h2>

        {/* Mensagem */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#71838A] sm:text-base">
          {isAfterBirthday
            ? "Obrigada por fazer parte dessa comemoração. Que os 23 anos da Ju sejam repletos de momentos inesquecíveis!"
            : isBirthday
              ? "Que seus 23 anos sejam cheios de amor, alegrias, novas histórias e muitos motivos para sorrir. Feliz aniversário!"
              : "No dia 15 de novembro, vamos nos reunir para apagar as velinhas desse bolo!"}
        </p>

        {/* Data */}
        <div className="mx-auto mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#C6A76D]" />

          <span className="text-xs font-medium tracking-[0.2em] text-[#168FA8]">
            15 · 11 · 2026
          </span>

          <span className="h-px w-10 bg-[#C6A76D]" />
        </div>

        {/* Bolo */}
        <div className="mx-auto mt-5 max-w-97.5">
          <BirthdayCake
            candlesLit={interactive && candlesLit}
            interactive={interactive}
            onBlow={toggleCandles}
          />
        </div>

        {/* Interação */}
        {interactive && (
          <div className="mt-2">
            <button
              type="button"
              onClick={toggleCandles}
              className="rounded-full bg-[#24586D] px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#163D52] focus:outline-none focus:ring-2 focus:ring-[#168FA8] focus:ring-offset-2"
              aria-pressed={!candlesLit}
            >
              {candlesLit ? "Apagar as velinhas" : "Acender novamente"}
            </button>

            {!candlesLit && (
              <p className="mt-4 font-serif text-lg text-[#168FA8]">
                Faça um pedido, Ju! Que seu novo ciclo seja incrível.
              </p>
            )}

            <p className="mt-3 text-[10px] text-[#71838A]">
              Você também pode clicar diretamente nas velinhas.
            </p>
          </div>
        )}

        {/* Mensagem antes do aniversário */}
        {period === "before" && !preview && (
          <p className="mt-1 text-xs tracking-wide text-[#71838A]">
            As velinhas estão esperando para serem apagadas quando chegar o momento.
          </p>
        )}
      </div>
    </section>
  );
}

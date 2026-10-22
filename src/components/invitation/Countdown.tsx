
"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-11-15T19:00:00-03:00").getTime();

    const updateCountdown = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "DIAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEG", value: timeLeft.seconds },
  ];

  return (
    <section className="relative flex min-h-97.5 w-full flex-col items-center justify-center overflow-hidden bg-[#F8F3E9] px-5 py-14 text-center sm:px-8">

      {/* Textura decorativa */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-24 top-0 h-full w-1/3 rounded-full bg-[#8FCAC8] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-2/3 w-1/3 rounded-full bg-[#E8D5B9] blur-3xl" />
      </div>

      {/* Título */}
      <p className="script-font relative z-10 mb-12 text-6xl text-[#397F8C] md:text-7xl">
        Faltam
      </p>

      {/* Números */}
      <div className="relative z-10 mx-auto grid w-full max-w-162.5 grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`flex min-w-0 flex-col items-center justify-center px-2 sm:px-5 ${
              index !== 0 ? "border-l border-[#9ABFC0]" : ""
            }`}
          >
            <span className="font-serif text-4xl font-normal leading-none text-[#286477] sm:text-5xl md:text-6xl">
              {String(item.value).padStart(2, "0")}
            </span>

            {/* Legendas com espaçamento maior */}
            <span className="mt-9 text-[9px] font-semibold tracking-[0.25em] text-[#548D98] sm:mt-10 sm:text-[10px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Ondas decorativas */}
      <svg
        className="relative z-10 mb-12 mt-14 h-7 w-16 text-[#548D98]"
        viewBox="0 0 64 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 7C7 2 12 2 17 7C22 12 27 12 32 7C37 2 42 2 47 7C52 12 57 12 62 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <path
          d="M2 17C7 12 12 12 17 17C22 22 27 22 32 17C37 12 42 12 47 17C52 22 57 22 62 17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      {/* Frase final */}
      <p className="relative z-10 mt-4 text-[10px] font-semibold tracking-[0.25em] text-[#548D98]">
        ATÉ O NOSSO ENCONTRO!
      </p>

      {/* Elemento decorativo */}
      <span className="pointer-events-none absolute bottom-5 right-6 rotate-[-25deg] text-4xl text-[#C7A77D]">
        ✳
      </span>
    </section>
  );
}

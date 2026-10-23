import { useState, type FormEvent, type ReactNode } from "react";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Sun,
  Utensils,
  CakeSlice,
  Martini,
} from "lucide-react";

import { topics, type TopicId } from "./topics";
import Guestbook from "./Guestbook";
import GiftList from "./GiftList";
import BirthdaySurprise from "./BirthdaySurprise";

type TopicPageProps = {
  topicId: TopicId;
  onBackAction: () => void;
};

export default function TopicPage({
  topicId,
  onBackAction,
}: TopicPageProps) {
  const topic = topics.find((item) => item.id === topicId);

  if (!topic) return null;

  return (
    <main className="min-h-screen bg-[#F8F6F0] text-[#163D52]">
      <div className="mx-auto min-h-screen w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">

        {/* NAVEGAÇÃO */}
        <button
          type="button"
          onClick={onBackAction}
          className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4D8293] transition-colors hover:text-[#168FA8]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Voltar ao menu
        </button>

        {/* CABEÇALHO */}
        <header className="mb-10 mt-14 border-b border-[#C6A76D]/50 pb-8 sm:mb-14 sm:mt-20">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#168FA8] sm:text-[11px]">
            Juliana&apos;s 23rd Birthday · {topic.number}
          </p>

          <h1 className="font-serif text-4xl font-normal leading-tight text-[#168FA8] sm:text-5xl md:text-6xl">
            {topic.title}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#168FA8] sm:text-base">
            {topic.description}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="h-px w-8 bg-[#C6A76D]" />
            <span className="h-1 w-1 rounded-full bg-[#C6A76D]" />
            <span className="h-px w-8 bg-[#C6A76D]" />
          </div>
        </header>

        {/* CONTEÚDO DOS TÓPICOS */}
        <section className="pb-16">

          {/* 01 - O EVENTO */}
          {topicId === "event" && (
            <div className="space-y-8">

              <div className="space-y-3">
                <Heart
                  size={28}
                  strokeWidth={1.3}
                  className="text-[#168FA8]"
                />

                <h2 className="font-serif text-2xl text-[#163D52] sm:text-3xl">
                  Um dia para celebrar!
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-[#71838A]">
                  Prepare-se para o dia.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoBlock
                  icon={<CalendarDays />}
                  label="Data"
                  value="15 de novembro de 2026"
                />

                <InfoBlock
                  icon={<MapPin />}
                  label="Local"
                  value="AFRAFEP · Ponta do Seixas, João Pessoa/PB"
                />

                <InfoBlock
                  icon={<Clock3 />}
                  label="Horário"
                  value="A partir das 10h"
                />
              </div>
            </div>
          )}

          {/* 02 - LOCALIZAÇÃO */}
          {topicId === "location" && (
            <div className="mx-auto max-w-3xl space-y-7">

              <div className="text-center">

                <MapPin
                  size={32}
                  strokeWidth={1.3}
                  className="mx-auto mb-4 text-[#168FA8]"
                />

                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#4D8293]">
                  The place to be
                </p>

                <h2 className="mt-3 font-serif text-3xl text-[#163D52] sm:text-4xl">
                  AFRAFEP — Balneário
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#71838A]">
                </p>
              </div>

              <div className="border border-[#B7CED3] bg-white p-5 text-center sm:p-7">

                <MapPin
                  size={22}
                  className="mx-auto mb-3 text-[#168FA8]"
                />

                <p className="font-serif text-xl text-[#163D52]">
                  Rua da Falésia, S/N
                </p>

                <p className="mt-2 text-sm text-[#71838A]">
                  Ponta do Seixas · João Pessoa/PB
                </p>

                <p className="mt-1 text-xs text-[#4D8293]">
                  CEP 58045-550
                </p>

                <div className="mx-auto mt-5 h-px w-12 bg-[#C6A76D]/70" />
              </div>

              <div className="overflow-hidden border border-[#B7CED3] bg-[#DDEBED]">
                <iframe
                  title="Localização da AFRAFEP"
                  src="https://www.google.com/maps?q=-7.1638573,-34.7970486&z=16&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="block w-full"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                <a
                  href="https://maps.app.goo.gl/QYLXFjoYG11rpzd66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#24586D] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#163D52]"
                >
                  Google Maps
                  <ArrowUpRight size={17} />
                </a>

                <a
                  href="https://waze.com/ul?ll=-7.1638573%2C-34.7970486&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-[#C6A76D] bg-white px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#24586D] transition hover:bg-[#DDEBED]"
                >
                  Abrir no Waze
                  <ArrowUpRight size={17} />
                </a>

              </div>

              <p className="text-center text-[10px] leading-relaxed text-[#71838A]">
                Todos os detalhes do local se encontram no mapa acima!
              </p>
            </div>
          )}

          {/* 03 - CONFIRMAR PRESENÇA */}
          {topicId === "rsvp" && <RSVPForm />}

          {/* 04 - LISTA DE PRESENTES */}
          {topicId === "gifts" && <GiftList />}

          {/* 05 - MURAL DE CARINHO */}
          {topicId === "messages" && <Guestbook />}

          {/* 06 - DRESS CODE */}
          {topicId === "dress-code" && (
            <div className="space-y-6">

              <Sun
                size={30}
                strokeWidth={1.3}
                className="text-[#168FA8]"
              />

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4D8293]">
                  Tropical Summer
                </p>

                <h2 className="mt-3 font-serif text-3xl text-[#163D52] sm:text-4xl">
                  Praiano & Verão
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#71838A]">
                  A proposta é um visual leve e confortável,
                  inspirado no clima tropical e na atmosfera
                  descontraída de um dia de verão.
                </p>
              </div>

              <div className="border-l-2 border-[#D2A52A] bg-white py-3 pl-5 pr-4">
                <p className="font-serif text-lg italic text-[#24586D]">
                  Vista-se para aproveitar o dia!
                </p>
              </div>
            </div>
          )}

          {/* 07 - COMES E BEBES */}
          {topicId === "schedule" && (
            <div className="mx-auto max-w-3xl space-y-8">

              {/* APRESENTAÇÃO */}
              <div className="text-center">

                <Martini
                  size={34}
                  strokeWidth={1.3}
                  className="mx-auto mb-5 text-[#168FA8]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4D8293]">
                  A little taste of celebration
                </p>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#71838A]">
                </p>
              </div>

              {/* INFORMAÇÕES */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="flex flex-col items-center border border-[#B7CED3] bg-white p-6 text-center transition-colors hover:border-[#C6A76D]">

                  <Utensils
                    size={30}
                    strokeWidth={1.3}
                    className="mb-5 text-[#168FA8]"
                  />

                  <h3 className="font-serif text-2xl text-[#163D52]">
                    Feijoada
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#71838A]">
                    Feijoada de Tia Taís para todo mundo aproveitar.
                  </p>
                </div>

                <div className="flex flex-col items-center border border-[#B7CED3] bg-white p-6 text-center transition-colors hover:border-[#C6A76D]">

                  <CakeSlice
                    size={30}
                    strokeWidth={1.3}
                    className="mb-5 text-[#168FA8]"
                  />

                  <h3 className="font-serif text-2xl text-[#163D52]">
                    Bolo
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#71838A]">
                    E, claro, não poderia faltar um bolinho da Alê Pessoa.
                  </p>
                </div>

                <div className="flex flex-col items-center border border-[#B7CED3] bg-white p-6 text-center transition-colors hover:border-[#C6A76D]">

                  <Martini
                    size={30}
                    strokeWidth={1.3}
                    className="mb-5 text-[#168FA8]"
                  />

                  <h3 className="font-serif text-2xl text-[#163D52]">
                    Bebidas
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#71838A]">
                    Quer trazer sua bebida fav? Beats? Vinho? Cerveja? Fique à vontade!
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* 08 - SURPRESA DE ANIVERSÁRIO */}
          {topicId === "information" && <BirthdaySurprise />}

        </section>

        {/* RODAPÉ */}
        <footer className="border-t border-[#D2A52A]/50 pt-7 text-center">

          <p className="font-serif text-lg italic text-[#168FA8]">
            Let&apos;s make beautiful memories together.
          </p>

          <div className="mx-auto my-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-[#D2A52A]" />
            <span className="h-1 w-1 rounded-full bg-[#D2A52A]" />
            <span className="h-px w-6 bg-[#D2A52A]" />
          </div>

          <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#168FA8] sm:text-[10px]">
            23rd Birthday · 2026
          </p>
        </footer>
      </div>
    </main>
  );
}

/* =====================================
   BLOCO DE INFORMAÇÕES
===================================== */

type InfoBlockProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function InfoBlock({ icon, label, value }: InfoBlockProps) {
  return (
    <div className="border border-[#B7CED3] bg-white p-5 transition-colors duration-300 hover:border-[#D2A52A] sm:p-6">

      <div className="mb-4 text-[#168FA8]">
        {icon}
      </div>

      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4D8293]">
        {label}
      </p>

      <p className="mt-2 font-serif text-xl text-[#163D52]">
        {value}
      </p>
    </div>
  );
}

/* =====================================
   FORMULÁRIO DE CONFIRMAÇÃO
===================================== */

type Attendance = "yes" | "no";

const WHATSAPP_NUMBER = "5583986387937";

function RSVPForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("yes");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const guestName = name.trim();

    if (!guestName) return;

    const heart = "\uD83D\uDC99";
    const party = "\uD83C\uDF89";
    const smile = "\uD83E\uDD73";
    const sparkle = "\u2728";

    let message = "";

    if (attendance === "yes") {
      message = `Olá, Ju! ${heart} Aqui é ${guestName}.

Confirmo a minha presença na comemoração dos seus 23 anos :) ${party}

Vai ser uma alegria celebrar esse momento com você. ${smile}${sparkle}

Até lá!`;
    } else {
      message = `Olá, Ju! ${heart} Aqui é ${guestName}.

Infelizmente, não poderei comparecer ao seu aniversário de 23 anos.

Desejo uma comemoração maravilhosa!`;
    }

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL =
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto max-w-2xl">

      <div className="mb-8 text-center">

        <Heart
          size={30}
          strokeWidth={1.3}
          className="mx-auto mb-5 text-[#168FA8]"
        />

        <h2 className="font-serif text-3xl text-[#163D52] sm:text-4xl">
          Preencha o formulário abaixo:
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#71838A]">
          O dia será ainda mais especial com você por perto. Vem comemorar!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-7 border border-[#B7CED3] bg-white p-5 sm:p-8"
      >

        <div className="space-y-2">
          <label
            htmlFor="guest-name"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4D8293]"
          >
            Seu nome completo
          </label>

          <input
            id="guest-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Digite seu nome"
            required
            maxLength={100}
            className="h-12 w-full border border-[#B7CED3] bg-[#F2F7F6] px-4 text-sm text-[#163D52] outline-none placeholder:text-[#71838A]/70 focus:border-[#168FA8] focus:ring-1 focus:ring-[#168FA8]/20"
          />
        </div>

        <fieldset className="space-y-3">
          <legend className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4D8293]">
            Você estará presente?
          </legend>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label
              className={`flex cursor-pointer items-center gap-3 border p-4 transition ${
                attendance === "yes"
                  ? "border-[#168FA8] bg-[#DDEBED]"
                  : "border-[#B7CED3] bg-[#F2F7F6]"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
                className="accent-[#168FA8]"
              />

              <span className="text-sm font-medium text-[#163D52]">
                Sim, estarei!
              </span>
            </label>

            <label
              className={`flex cursor-pointer items-center gap-3 border p-4 transition ${
                attendance === "no"
                  ? "border-[#168FA8] bg-[#DDEBED]"
                  : "border-[#B7CED3] bg-[#F2F7F6]"
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
                className="accent-[#168FA8]"
              />

              <span className="text-sm font-medium text-[#163D52]">
                Não poderei ir
              </span>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!name.trim()}
          className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#4D8293] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#163D52] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar confirmação pelo WhatsApp

          <ArrowUpRight size={17} />
        </button>

        <p className="text-center text-[10px] leading-relaxed text-[#71838A]">
          Sua confirmação será encaminhada diretamente para Juliana
          pelo WhatsApp.
        </p>
      </form>
    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Gift } from "lucide-react";

type GiftItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  url: string;
  linkLabel?: string;
};

const gifts: GiftItem[] = [
  {
    id: "lip-candy",
    name: "Lip Candy Brigadeiro",
    brand: "Mari Maria Makeup",
    category: "Maquiagem",
    image:
      "https://m.media-amazon.com/images/I/5123ojKGcLL._AC_SL1000_.jpg",
    url:
      "https://www.amazon.com.br/MARI-MARIA-LIP-CANDY-BRIGADEIRO/dp/B0GKQFRYBJ",
  },
  {
    id: "glossy-blush",
    name: "Glossy Blush Rose Pink",
    brand: "Océane Edition",
    category: "Maquiagem",
    image:
      "https://m.media-amazon.com/images/I/410R-FS5J6L._AC_SL1000_.jpg",
    url:
      "https://www.amazon.com.br/Oc%C3%A9ane-Glossy-Rose-Blush-Cintilante/dp/B0CYJ9Z6SZ",
  },
  {
    id: "berestick-marrom",
    name: "Berêstick Marrom Avelã",
    brand: "Quem Disse, Berenice?",
    category: "Maquiagem",
    image:
      "https://m.media-amazon.com/images/I/512V6O3IOxL._AC_SL1500_.jpg",
    url:
      "https://www.amazon.com.br/Ber%C3%AAstick-Marrom-Chandler-Berenice-Friends/dp/B0H6NR3P2Y",
  },
  {
    id: "berestick-rosa",
    name: "Berêstick Rosa Pêssego",
    brand: "Quem Disse, Berenice?",
    category: "Maquiagem",
    image:
      "https://m.media-amazon.com/images/I/51z7t8AJteL._AC_SL1500_.jpg",
    url:
      "https://www.amazon.com.br/Friends-Ber%C3%AAstick-P%C3%AAssego-Phoebe-Berenice/dp/B0H6NS2KBG",
  },
  {
    id: "egeo-choc",
    name: "Egeo Choc Suflê",
    brand: "O Boticário",
    category: "Corpo e banho",
    image:
      "https://cdn.gbmedia.com.br/images/w_1500%2Cf_webp%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/B71815/1ef2264c-a78c-4fa2-ad75-e9f2aa01c41d-sufle-hidratante-desodorante-corporal-egeo-choc-250g.png",
    url:
      "https://www.boticario.com.br/produto/sufle-hidratante-desodorante-corporal-egeo-choc-250g/",
  },
  {
    id: "instance-baunilha",
    name: "Kit Instance Baunilha",
    brand: "Eudora",
    category: "Corpo e banho",
    image:
      "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500%2Cf_avif%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/E2026010216/39930c82-ea79-4de2-9d63-f0801868face-e2026010216.jpg",
    url:
      "https://www.amazon.com.br/s?k=Kit+Eudora+Instance+Baunilha+Creme+Body+Splash+2+produtos",
    linkLabel: "Buscar na Amazon",
  },
  {
    id: "liz-aura",
    name: "Liz Aura Hidratante",
    brand: "O Boticário",
    category: "Corpo e banho",
    image:
      "https://cdn.gbmedia.com.br/images/w_1500%2Cf_webp%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/B86988/5a4d46a8-8a18-4f29-a109-80803c4722be-bot-86988-liz-vanilla-creme-hidratante-01.jpg",
    url:
      "https://www.boticario.com.br/produto/creme-hidratante-desodorante-corporal-novo-liz-250g/",
  },
  {
    id: "pocket-secrets",
    name: "Kit Minipincéis Pocket",
    brand: "Niina Secrets · Eudora",
    category: "Acessórios",
    image:
      "https://cdn.gbmedia.com.br/images/w_1500%2Cf_webp%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/E89648/54ae6f27-564b-4871-bc9c-68de6a402867-89648-niina-kit-mini-pinceis-01.jpg",
    url:
      "https://www.amazon.com.br/s?k=Kit+Minipinc%C3%A9is+Pocket+Secrets+Niina+Secrets+6+itens",
    linkLabel: "Buscar na Amazon",
  },
  {
    id: "necessaire-vhs",
    name: "Nécessaire VHS",
    brand: "Quem Disse, Berenice?",
    category: "Acessórios",
    image:
      "https://cdn.gbmedia.com.br/images/w_1500%2Cf_webp%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/Q89870/fe113baa-bbca-4322-b40c-d875e43b2a15-qdb-09-26-89870-x-friends-case-vhs-6.jpg",
    url:
      "https://www.quemdisseberenice.com.br/produto/necessaire-com-ziper-vhs-temporada-especial-quem-disse-berenice-friends/",
  },

  // NOVOS PRESENTES

  {
    id: "niina-secrets-celebration",
    name: "Niina Secrets Celebration",
    brand: "Eudora · Niina Secrets",
    category: "Maquiagem",
    image:
      "https://cdn.gbmedia.com.br/images/w_1500%2Cf_webp%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/E56659/d95c39d0-8513-4621-9a37-64709c9acb61-56659-niina-secrets-kit-lip-celebration-natal-1.jpg",
    url:
      "https://www.eudora.com.br/produto/niina-secrets-celebration-hidra-balm-32g-lip-oil-shine-flowers-7ml/",
    linkLabel: "Ver na Eudora",
  },
  {
    id: "sheglam-medusa",
    name: "Sunkissed Body Highlighter Medusa",
    brand: "SHEGLAM",
    category: "Corpo e banho",
    image:
      "https://napy.com.py/userfiles/images/productos/600/6959886707883.png",
    url:
      "https://br.shein.com/SUNKISSED-Body-Highlighter-103-MEDUSA-p-1230503-cat-2258.html",
    linkLabel: "Ver na SHEIN",
  },
  {
    id: "sheglam-gogo-glow",
    name: "Go Go Glow Body Mist Gold",
    brand: "SHEGLAM",
    category: "Corpo e banho",
    image:
      "https://cdnpt2.primor.eu/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/6/9/6971870595955_4cc5.JPG",
    url:
      "https://br.shein.com/Go-Go-Glow-Highlighting-Body-Mist-Highlighter-Powder-High-Shine-Finish-Multi-Use-Glow-Highlighter-Face-Makeup-p-15635602-cat-2258.html",
    linkLabel: "Ver na SHEIN",
  },
  {
    id: "hello-hello",
    name: "Hello Hello · 50ml",
    brand: "Ciclo Cosméticos · Nah Cardoso",
    category: "Perfumes",
    image:
      "https://images2.marisa.com.br/medias/sys_master/images/images/h75/h3e/26751080792094/Deo-Colonia-Nah-Hello-Hello-Ciclo-NICA-MP00000483994-C2.jpg",
    url:
      "https://www.amazon.com.br/s?k=Deo+Col%C3%B4nia+Hello+Hello+Nah+Cardoso+by+Ciclo+50ml",
    linkLabel: "Buscar na Amazon",
  },
  {
    id: "bt-blush-quartzo",
    name: "BT Blush Shimmer Quartzo",
    brand: "Bruna Tavares",
    category: "Maquiagem",
    image:
      "https://cdn.gbmedia.com.br/images/w_1500%2Cf_webp%2Cfl_progressive%2Cq_auto%3Aeco%2Cw_800/v1/imagens/product/20082935/3bdc9560-dadd-4e41-ab2b-77700cc22e52-20082935-bruna-tavares-blush-shimmer-quartzo-8g.png",
    url: "https://www.amazon.com.br/dp/B0HJXWD6W1",
    linkLabel: "Ver na Amazon",
  },
  {
    id: "oceane-blush-rose-gold",
    name: "Glossy Blush Rose Gold",
    brand: "Océane Edition",
    category: "Maquiagem",
    image:
      "https://oceane.vtexassets.com/arquivos/ids/205496/kit_blush_cintilante_lip_oil_blossom_oceane_edition_3.jpg?v=638908753876400000",
    url: "https://www.amazon.com.br/dp/B0BWRY743X",
    linkLabel: "Ver na Amazon",
  },
  {
    id: "book-diabo-veste-cor-de-rosa",
    name: "O diabo veste cor-de-rosa",
    brand: "Alexandria Bellefleur · Harlequin",
    category: "Livros",
    image:
      "https://m.media-amazon.com/images/P/6559705927.01._SCLZZZZZZZ_.jpg",
    url: "https://www.amazon.com.br/dp/6559705927",
    linkLabel: "Ver na Amazon",
  },
];

export default function GiftList() {
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  const categories = useMemo(
    () => [
      "Todos",
      ...Array.from(new Set(gifts.map((gift) => gift.category))),
    ],
    []
  );

  const filteredGifts =
    selectedCategory === "Todos"
      ? gifts
      : gifts.filter(
          (gift) => gift.category === selectedCategory
        );

  return (
    <section className="mx-auto min-h-screen w-full max-w-6xl px-5 py-12 text-[#163D52] sm:px-8 sm:py-16">

      {/* CABEÇALHO */}
      <header className="mx-auto mb-12 max-w-2xl text-center">

        <Gift
          size={34}
          strokeWidth={1.2}
          className="mx-auto mb-5 text-[#168FA8]"
        />

        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#4D8293]">
          A special something
        </p>

        <h2 className="font-serif text-4xl font-normal text-[#163D52] sm:text-5xl md:text-6xl">
          A Gift for Juliana
        </h2>

        {/* Detalhe dourado */}
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#C6A76D]" />
          <span className="h-1 w-1 rounded-full bg-[#C6A76D]" />
          <span className="h-px w-8 bg-[#C6A76D]" />
        </div>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#71838A]">
          Sua presença já será um presente especial!
          Mas, caso queira me presentear, aqui abaixo tem
          algumas sugestões escolhidas.
        </p>
      </header>

      {/* FILTROS DE CATEGORIAS */}
      <div className="mb-9 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`rounded-full border px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.15em] transition ${
              selectedCategory === category
                ? "border-[#24586D] bg-[#24586D] text-white"
                : "border-[#B7CED3] bg-white text-[#4D8293] hover:border-[#C6A76D] hover:bg-[#DDEBED]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* GRADE DE PRESENTES */}
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGifts.map((gift) => (
          <article
            key={gift.id}
            className="group flex h-full flex-col overflow-hidden border border-[#B7CED3] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#C6A76D] hover:shadow-[0_8px_24px_rgba(22,61,82,0.08)]"
          >

            {/* FOTOGRAFIA */}
            <div className="relative flex aspect-4/3 shrink-0 items-center justify-center overflow-hidden border-b border-[#DDEBED] bg-[#F2F7F6] p-5">

              <Image
                src={gift.image}
                alt={gift.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
                className="object-contain transition duration-700 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              {/* Categoria */}
              <span className="absolute left-4 top-4 border border-[#C6A76D]/50 bg-[#F2F7F6]/95 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#24586D]">
                {gift.category}
              </span>

            </div>

            {/* INFORMAÇÕES E BOTÃO */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

              <p className="flex min-h-8 items-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#168FA8]">
                {gift.brand}
              </p>

              <h3 className="mt-2 min-h-14 font-serif text-2xl leading-tight text-[#163D52]">
                {gift.name}
              </h3>

              {/* Linha decorativa */}
              <div className="mb-5 mt-3 h-px w-9 bg-[#C6A76D]/70" />

              {/* BOTÃO */}
              <a
                href={gift.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-3 border border-[#24586D] bg-transparent px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-[#24586D] transition hover:border-[#24586D] hover:bg-[#24586D] hover:text-white"
              >
                {gift.linkLabel ?? "Ver presente"}

                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
"use client";

import {
  ArrowUpRight,
  CalendarDays,
  CalendarCheck,
  CakeSlice,
  Gift,
  Info,
  MapPin,
  MessageCircleHeart,
  Sun,
  Clock,
  Martini,
  type LucideIcon,
} from "lucide-react";

import type { InvitationTopic, TopicIcon } from "./topics";

type TopicCardProps = {
  topic: InvitationTopic;
  onClickAction: (id: InvitationTopic["id"]) => void;
};

const iconMap: Record<TopicIcon, LucideIcon> = {
  "calendar-days": CalendarDays,
  "map-pin": MapPin,
  "calendar-check": CalendarCheck,
  gift: Gift,
  "message-circle-heart": MessageCircleHeart,
  sun: Sun,
  clock: Clock,
  info: Info,
  "cake-slice": CakeSlice,
  martini: Martini,
};

export default function TopicCard({
  topic,
  onClickAction,
}: TopicCardProps) {
  const Icon = iconMap[topic.icon];

  return (
    <button
      type="button"
      onClick={() => onClickAction(topic.id)}
      aria-label={`Abrir tópico: ${topic.title}`}
      className="group relative flex min-h-43 w-full flex-col justify-between overflow-hidden border border-[#20B7C5] bg-white p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A76D] hover:bg-[#F2F7F6] hover:shadow-[0_8px_24px_rgba(22,61,82,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2A52A] focus-visible:ring-offset-2 sm:min-h-47.5 sm:p-5 md:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-0.5 w-0 bg-[#D2A52A] transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm tracking-wider text-[#168FA8]">
            {topic.number}
          </span>

          <span
            aria-hidden="true"
            className="h-px w-5 bg-[#D2A52A]/60"
          />
        </div>

        <ArrowUpRight
          size={19}
          strokeWidth={1.3}
          className="text-[#D2A52A]/75 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#168FA8]"
        />
      </div>

      <div className="my-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D2A52A]/30 bg-[#F2F7F6] transition-all duration-300 group-hover:border-[#D2A52A]/60 group-hover:bg-[#DDEBED]">
          <Icon
            size={25}
            strokeWidth={1.35}
            className="text-[#20B7C5] transition-all duration-300 group-hover:scale-110 group-hover:text-[#168FA8]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-serif text-lg leading-tight text-[#163D52] transition-colors duration-300 group-hover:text-[#168FA8] sm:text-xl">
          {topic.title}
        </h3>

        <p className="text-[11px] leading-relaxed text-[#71838A] sm:text-xs">
          {topic.description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -right-4 h-14 w-14 rounded-full border border-[#D2A52A]/15 transition-transform duration-500 group-hover:scale-150"
      />
    </button>
  );
}
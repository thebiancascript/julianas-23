
export type TopicId =
  | "event"
  | "location"
  | "rsvp"
  | "gifts"
  | "messages"
  | "dress-code"
  | "schedule"
  | "information";

export type TopicIcon =
  | "calendar-days"
  | "map-pin"
  | "calendar-check"
  | "gift"
  | "message-circle-heart"
  | "sun"
  | "clock"
  | "info"
  | "cake-slice"
  | "martini";

export type InvitationTopic = {
  id: TopicId;
  number: string;
  title: string;
  description: string;
  icon: TopicIcon;
};

export const topics: InvitationTopic[] = [
  {
    id: "event",
    number: "01",
    title: "O evento",
    description: "Uma celebração leve, repleta de alegria e boas energias.",
    icon: "calendar-days",
  },
  {
    id: "location",
    number: "02",
    title: "Localização",
    description: "Confira no mapa onde será a minha comemoração.",
    icon: "map-pin",
  },
  {
    id: "rsvp",
    number: "03",
    title: "Confirme sua presença",
    description: "Não deixe de confirmar a sua presença.",
    icon: "calendar-check",
  },
  {
    id: "gifts",
    number: "04",
    title: "Lista de presentes",
    description: "Caso queiram me presentear, deixei aqui algumas ideias na lista.",
    icon: "gift",
  },
  {
    id: "messages",
    number: "05",
    title: "Mural de carinho",
    description: "Aproveite para deixar uma mensagem para a aniversariante.",
    icon: "message-circle-heart",
  },
  {
    id: "dress-code",
    number: "06",
    title: "Dress code",
    description: "Confira as informações sobre o traje para a comemoração.",
    icon: "sun",
  },
  {
    id: "schedule",
    number: "07",
    title: "Comes e Bebes",
    description: "Mas e aí, o que vai rolar? Veja o que não vai faltar na festa!",
    icon: "martini",
  },
  {
    id: "information",
    number: "08",
    title: "Parabéns para Juju!",
    description: "Um bolinho virtual para comemorar o niver da diva.",
    icon: "cake-slice",
  },
];

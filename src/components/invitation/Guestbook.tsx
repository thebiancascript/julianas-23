
"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";

import {
  Heart,
  Send,
  MessageCircle,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { createClient } from "../../lib/supabase/client";

type GuestMessage = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  user_id: string | null;
};

export default function Guestbook() {
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [likedMessageIds, setLikedMessageIds] = useState<Set<string>>(
    new Set()
  );

  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [likingId, setLikingId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================
  // AUTENTICAÇÃO E CARREGAMENTO
  // =====================================

  useEffect(() => {
    let active = true;

    async function initializeGuestbook() {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        let session = sessionData.session;

        // Criar uma identidade anônima caso necessário
        if (!session) {
          const { data, error } =
            await supabase.auth.signInAnonymously();

          if (error) throw error;

          session = data.session;
        }

        if (!session?.user) {
          throw new Error("Não foi possível identificar o visitante.");
        }

        if (!active) return;

        const currentUserId = session.user.id;

        setUserId(currentUserId);
        setAuthReady(true);

        // Buscar mensagens e curtidas do visitante
        const [messagesResult, likesResult] = await Promise.all([
          supabase
            .from("birthday_messages")
            .select("id, name, message, created_at, user_id")
            .order("created_at", { ascending: false })
            .limit(50),

          supabase
            .from("birthday_message_likes")
            .select("message_id")
            .eq("user_id", currentUserId),
        ]);

        if (messagesResult.error) throw messagesResult.error;
        if (likesResult.error) throw likesResult.error;

        if (active) {
          setMessages(
            (messagesResult.data ?? []) as GuestMessage[]
          );

          setLikedMessageIds(
            new Set(
              (likesResult.data ?? []).map((like) => like.message_id)
            )
          );

          setError("");
        }
      } catch (err) {
        console.error("Erro ao inicializar mural:", err);

        if (active) {
          setError(
            "Não foi possível conectar ao mural. Atualize a página e tente novamente."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    initializeGuestbook();

    return () => {
      active = false;
    };
  }, [supabase]);

  // =====================================
  // PUBLICAR MENSAGEM
  // =====================================

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!authReady || !userId) {
      setError("Não foi possível identificar sua sessão.");
      return;
    }

    if (
      cleanName.length < 2 ||
      cleanName.length > 60 ||
      cleanMessage.length < 3 ||
      cleanMessage.length > 500
    ) {
      setError("Confira seu nome e sua mensagem antes de publicar.");
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const { data, error } = await supabase
        .from("birthday_messages")
        .insert({
          name: cleanName,
          message: cleanMessage,
          user_id: userId,
        })
        .select("id, name, message, created_at, user_id")
        .single();

      if (error) throw error;

      if (data) {
        setMessages((previous) => [
          data as GuestMessage,
          ...previous,
        ]);
      }

      setName("");
      setMessage("");

      setSuccess("Sua mensagem foi publicada com sucesso!");
    } catch (err) {
      console.error("Erro ao publicar mensagem:", err);

      setError(
        "Não conseguimos publicar sua mensagem. Tente novamente."
      );
    } finally {
      setSending(false);
    }
  }

  // =====================================
  // CURTIR E REMOVER CURTIDA
  // =====================================

  async function handleLike(item: GuestMessage) {
    if (!userId || !authReady || likingId) return;

    // Impedir curtida na própria mensagem
    if (item.user_id === userId) return;

    const alreadyLiked = likedMessageIds.has(item.id);

    setLikingId(item.id);
    setError("");
    setSuccess("");

    try {
      if (alreadyLiked) {
        // Remover curtida
        const { error } = await supabase
          .from("birthday_message_likes")
          .delete()
          .eq("message_id", item.id)
          .eq("user_id", userId);

        if (error) throw error;

        setLikedMessageIds((previous) => {
          const updated = new Set(previous);
          updated.delete(item.id);
          return updated;
        });
      } else {
        // Registrar curtida
        const { error } = await supabase
          .from("birthday_message_likes")
          .insert({
            message_id: item.id,
            user_id: userId,
          });

        if (error) throw error;

        setLikedMessageIds((previous) => {
          const updated = new Set(previous);
          updated.add(item.id);
          return updated;
        });
      }
    } catch (err) {
      console.error("Erro ao atualizar curtida:", err);

      setError(
        "Não foi possível atualizar sua curtida. Tente novamente."
      );
    } finally {
      setLikingId(null);
    }
  }

  // =====================================
  // EXCLUIR PRÓPRIA MENSAGEM
  // =====================================

  async function handleDelete(item: GuestMessage) {
    if (!userId || item.user_id !== userId) {
      setError("Você só pode excluir suas próprias mensagens.");
      return;
    }

    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir esta mensagem? Essa ação não poderá ser desfeita."
    );

    if (!confirmed) return;

    setDeletingId(item.id);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase
        .from("birthday_messages")
        .delete()
        .eq("id", item.id)
        .eq("user_id", userId);

      if (error) throw error;

      setMessages((previous) =>
        previous.filter((message) => message.id !== item.id)
      );

      setLikedMessageIds((previous) => {
        const updated = new Set(previous);
        updated.delete(item.id);
        return updated;
      });

      setSuccess("Sua mensagem foi excluída com sucesso.");
    } catch (err) {
      console.error("Erro ao excluir mensagem:", err);

      setError(
        "Não foi possível excluir a mensagem. Tente novamente."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">

      {/* APRESENTAÇÃO */}
      <header className="mb-9 text-center">

        <Heart
          size={32}
          strokeWidth={1.3}
          className="mx-auto mb-5 text-[#168FA8]"
        />

        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#4D8293]">
          A little love for Juliana
        </p>

        <h2 className="font-serif text-4xl font-normal text-[#163D52] sm:text-5xl">
          Wall of Love
        </h2>

        {/* Acabamento dourado */}
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-[#C6A76D]" />
          <span className="h-1 w-1 rounded-full bg-[#C6A76D]" />
          <span className="h-px w-8 bg-[#C6A76D]" />
        </div>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#71838A]">
        </p>
      </header>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-[#B7CED3] bg-white p-5 sm:p-8"
      >

        {/* Nome */}
        <div className="space-y-2">
          <label
            htmlFor="message-name"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4D8293]"
          >
            Seu nome
          </label>

          <input
            id="message-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Como devemos identificar você?"
            required
            minLength={2}
            maxLength={60}
            className="h-12 w-full border border-[#B7CED3] bg-[#F2F7F6] px-4 text-sm text-[#163D52] outline-none placeholder:text-[#71838A]/70 focus:border-[#168FA8] focus:ring-1 focus:ring-[#168FA8]/20"
          />
        </div>

        {/* Mensagem */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="guest-message"
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4D8293]"
            >
              Sua mensagem para Juliana
            </label>

            <span className="text-[10px] text-[#71838A]">
              {message.length}/500
            </span>
          </div>

          <textarea
            id="guest-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Escreva seus votos de felicidade, carinho e boas energias..."
            required
            minLength={3}
            maxLength={500}
            rows={5}
            className="w-full resize-y border border-[#B7CED3] bg-[#F2F7F6] p-4 text-sm leading-7 text-[#163D52] outline-none placeholder:text-[#71838A]/70 focus:border-[#168FA8] focus:ring-1 focus:ring-[#168FA8]/20"
          />
        </div>

        {/* Mensagens de estado */}
        {error && (
          <p
            role="alert"
            className="text-sm leading-relaxed text-red-700"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="text-sm leading-relaxed text-[#168FA8]"
          >
            {success} ♡
          </p>
        )}

        {/* Botão de publicação */}
        <button
          type="submit"
          disabled={
            sending ||
            loading ||
            !authReady ||
            !name.trim() ||
            !message.trim()
          }
          className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#24586D] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#163D52] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              Publicando...
            </>
          ) : (
            <>
              Publicar mensagem
              <Send size={16} />
            </>
          )}
        </button>

        <p className="text-center text-[10px] leading-relaxed text-[#71838A]">
          Sua mensagem ficará visível para os convidados do aniversário.
        </p>
      </form>

      {/* MURAL DE MENSAGENS */}
      <section className="mt-12">

        <div className="mb-6 flex items-center justify-between gap-3 border-b border-[#C6A76D]/50 pb-4">

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#4D8293]">
              Guestbook
            </p>

            <h3 className="mt-2 font-serif text-2xl text-[#163D52]">
              Mensagens dos convidados
            </h3>
          </div>

          <MessageCircle
            size={24}
            strokeWidth={1.3}
            className="text-[#168FA8]"
          />
        </div>

        {/* Carregamento */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-10 text-sm text-[#71838A]">
            <LoaderCircle size={19} className="animate-spin" />
            Carregando mensagens...
          </div>
        )}

        {!loading && (
          <div className="space-y-4">

            {messages.length > 0 ? (
              messages.map((item) => {
                const isOwner = item.user_id === userId;
                const isLiked = likedMessageIds.has(item.id);
                const isLiking = likingId === item.id;
                const isDeleting = deletingId === item.id;

                return (
                  <article
                    key={item.id}
                    className="border border-[#B7CED3] bg-white p-5 transition-colors duration-300 hover:border-[#C6A76D] sm:p-6"
                  >

                    {/* Identificação do convidado */}
                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#C6A76D]/40 bg-[#DDEBED] font-serif text-lg text-[#163D52]">
                          {item.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h4 className="truncate font-serif text-xl text-[#163D52]">
                            {item.name}
                          </h4>

                          <time
                            dateTime={item.created_at}
                            className="text-[10px] text-[#71838A]"
                          >
                            {new Date(item.created_at).toLocaleDateString("pt-BR")}
                          </time>
                        </div>
                      </div>

                      {/* Ações da mensagem */}
                      <div className="flex shrink-0 items-center gap-2">

                        {/* Curtida */}
                        <button
                          type="button"
                          onClick={() => handleLike(item)}
                          disabled={
                            !authReady ||
                            isOwner ||
                            isLiking ||
                            Boolean(likingId)
                          }
                          aria-label={
                            isOwner
                              ? "Você não pode curtir sua própria mensagem"
                              : isLiked
                                ? "Remover curtida"
                                : "Curtir mensagem"
                          }
                          aria-pressed={isLiked}
                          title={
                            isOwner
                              ? "Sua própria mensagem"
                              : isLiked
                                ? "Remover curtida"
                                : "Curtir mensagem"
                          }
                          className="inline-flex size-9 items-center justify-center rounded-full transition hover:bg-[#DDEBED] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Heart
                            size={19}
                            strokeWidth={1.7}
                            className={`transition-all duration-200 ${
                              isLiked
                                ? "scale-110 fill-[#168FA8] text-[#168FA8]"
                                : "text-[#4D8293]"
                            }`}
                          />
                        </button>

                        {/* Exclusão da própria mensagem */}
                        {isOwner && (
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={isDeleting}
                            title="Excluir minha mensagem"
                            aria-label={`Excluir mensagem de ${item.name}`}
                            className="inline-flex size-9 items-center justify-center rounded-full text-[#71838A] transition hover:bg-[#DDEBED] hover:text-[#163D52] disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={17} strokeWidth={1.6} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Texto da mensagem */}
                    <p className="mt-4 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-[#71838A]">
                      {item.message}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="h-px w-5 bg-[#C6A76D]/70" />

                      <p className="font-serif text-sm italic text-[#168FA8]">
                        Com carinho ♡
                      </p>
                    </div>

                  </article>
                );
              })
            ) : (
              <div className="border border-dashed border-[#B7CED3] bg-white px-5 py-10 text-center">

                <Heart
                  size={25}
                  strokeWidth={1.2}
                  className="mx-auto mb-4 text-[#168FA8]"
                />

                <p className="font-serif text-xl text-[#163D52]">
                  Seja a primeira pessoa a deixar uma mensagem!
                </p>

                <p className="mt-2 text-xs text-[#71838A]">
                  O mural está esperando pelo seu carinho.
                </p>

              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
}

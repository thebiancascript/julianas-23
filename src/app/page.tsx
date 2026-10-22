"use client";

import { useState } from "react";

import Hero from "@/components/invitation/Hero";
import InvitationMenu from "@/components/invitation/InvitationMenu";
import TopicPage from "@/components/invitation/TopicPage";

import type { TopicId } from "@/components/invitation/topics";

type Screen = "cover" | "menu" | "topic";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("cover");
  const [selectedTopic, setSelectedTopic] = useState<TopicId | null>(null);

  function handleOpenInvitation() {
    setScreen("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectTopic(topicId: TopicId) {
    setSelectedTopic(topicId);
    setScreen("topic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToMenu() {
    setSelectedTopic(null);
    setScreen("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {screen === "cover" && (
        <Hero onOpenAction={handleOpenInvitation} />
      )}

      {screen === "menu" && (
        <InvitationMenu onSelectTopicAction={handleSelectTopic} />
      )}

      {screen === "topic" && selectedTopic && (
        <TopicPage
          topicId={selectedTopic}
          onBackAction={handleBackToMenu}
        />
      )}
    </div>
  );
}
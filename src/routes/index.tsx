import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { BackgroundScene } from "@/components/dreamy/BackgroundScene";
import { CursorSparkles } from "@/components/dreamy/CursorSparkles";
import { MusicToggle } from "@/components/dreamy/MusicToggle";
import { Hero } from "@/components/dreamy/Hero";
import { FloatingPlacards } from "@/components/dreamy/FloatingPlacards";
import { Constellation } from "@/components/dreamy/Constellation";
import { HiddenLetters } from "@/components/dreamy/HiddenLetters";
import { ReasonsCards } from "@/components/dreamy/ReasonsCards";
import { MemoryAlbum } from "@/components/dreamy/MemoryAlbum";
import { MoonEnding } from "@/components/dreamy/MoonEnding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Everything Soft — A Universe Made For You" },
      {
        name: "description",
        content:
          "A handcrafted emotional universe of floating placards, hidden letters, and a private constellation — a slow, gentle apology built piece by piece.",
      },
      { property: "og:title", content: "Everything Soft — A Universe Made For You" },
      {
        property: "og:description",
        content:
          "Open the placards. Touch the stars. Unfold the letters. An interactive apology, made softly.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const placardsRef = useRef<HTMLDivElement>(null);
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BackgroundScene />
      <CursorSparkles />
      <MusicToggle />

      <Hero
        onBegin={() =>
          placardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      />

      <div ref={placardsRef}>
        <FloatingPlacards />
      </div>

      <Constellation />
      <HiddenLetters />
      <ReasonsCards />
      <MemoryAlbum />
      <MoonEnding />

      <footer className="relative z-10 py-12 text-center text-xs uppercase tracking-[0.35em] text-muted-foreground/60">
        Handcrafted, quietly, for you.
      </footer>
    </main>
  );
}

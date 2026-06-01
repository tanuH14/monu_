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

export default function App() {
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

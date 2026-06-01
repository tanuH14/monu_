import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { placards, type Placard } from "@/lib/placard-data";

function rand(seed: number) {
  const x = Math.sin(seed * 9.13) * 10000;
  return x - Math.floor(x);
}

const accentColor: Record<NonNullable<Placard["accent"]>, string> = {
  rose: "oklch(0.82 0.12 15)",
  gold: "oklch(0.85 0.12 80)",
  lavender: "oklch(0.82 0.08 300)",
  peach: "oklch(0.86 0.10 45)",
};

export function FloatingPlacards() {
  const [active, setActive] = useState<Placard | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());

  // Lay out in a soft grid spanning a tall canvas; jitter each cell.
  const items = useMemo(() => {
    const cols = 7;
    const cellW = 100 / cols;
    return placards.map((p, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = (rand(p.id) - 0.5) * cellW * 0.55;
      const jitterY = (rand(p.id + 50) - 0.5) * 60;
      const rot = (rand(p.id + 100) - 0.5) * 10;
      const dx = (rand(p.id + 200) - 0.5) * 24;
      const dy = (rand(p.id + 300) - 0.5) * 24;
      const dur = 6 + rand(p.id + 400) * 6;
      const delay = rand(p.id + 500) * 4;
      return {
        ...p,
        leftPct: col * cellW + cellW / 2 + jitterX,
        topPx: row * 180 + 60 + jitterY,
        rot,
        dx,
        dy,
        dur,
        delay,
      };
    });
  }, []);

  const totalRows = Math.ceil(placards.length / 7);
  const canvasHeight = totalRows * 180 + 200;

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16">
      <header className="mb-12 text-center">
        <p className="font-script text-3xl text-gold md:text-4xl">For You</p>
        <h2 className="mt-2 font-display text-4xl text-foreground md:text-6xl">
          A Garden Of Quiet Things
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          Each placard holds something I should have said sooner. Touch any one of them — open them in any order. There is no wrong way through.
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          {opened.size} / {placards.length} opened
        </p>
      </header>

      <div className="relative mx-auto" style={{ height: `${canvasHeight}px` }}>
        {items.map((p) => {
          const wasOpened = opened.has(p.id);
          const color = accentColor[p.accent ?? "rose"];
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => {
                setActive(p);
                setOpened((s) => new Set(s).add(p.id));
              }}
              className="placard absolute -translate-x-1/2 cursor-pointer rounded-2xl px-5 py-4 text-left"
              style={
                {
                  left: `${p.leftPct}%`,
                  top: `${p.topPx}px`,
                  width: "min(220px, 42vw)",
                  ["--rot" as string]: `${p.rot}deg`,
                  ["--dx" as string]: `${p.dx}px`,
                  ["--dy" as string]: `${p.dy}px`,
                  animation: `float-slow ${p.dur}s ease-in-out ${p.delay}s infinite`,
                  borderColor: wasOpened ? color : undefined,
                } as React.CSSProperties
              }
              whileHover={{
                scale: 1.08,
                rotate: 0,
                boxShadow: `0 20px 60px ${color.replace(")", " / 0.45)")}, 0 0 80px ${color.replace(")", " / 0.3)")}`,
                zIndex: 30,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <span
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
                style={{
                  background: color,
                  boxShadow: `0 0 12px ${color}`,
                  opacity: wasOpened ? 1 : 0.65,
                }}
              />
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Placard № {String(p.id).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-lg leading-tight text-foreground md:text-xl">
                {p.title}
              </p>
              {wasOpened && (
                <p className="mt-2 text-[10px] uppercase tracking-widest text-gold">Read</p>
              )}
            </motion.button>
          );
        })}
      </div>

      <PlacardModal placard={active} onClose={() => setActive(null)} />
    </section>
  );
}

function PlacardModal({ placard, onClose }: { placard: Placard | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {placard && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.96 0.04 350 / 0.85), oklch(0.88 0.06 30 / 0.95))",
              backdropFilter: "blur(20px)",
            }}
          />
          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="placard relative z-10 w-full max-w-xl rounded-3xl p-10 md:p-14"
            style={{ animation: "pulse-glow 4s ease-in-out infinite" }}
          >
            {/* floating dust */}
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="pointer-events-none absolute rounded-full bg-white"
                style={{
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  opacity: 0.5,
                  boxShadow: "0 0 8px oklch(0.95 0.08 60)",
                  animation: `twinkle ${2 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              Placard № {String(placard.id).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-foreground md:text-5xl">
              {placard.title}
            </h3>
            <div
              className="my-6 h-px w-24 bg-gradient-gold"
              style={{ boxShadow: "0 0 12px oklch(0.85 0.12 80 / 0.6)" }}
            />
            <p className="font-serif-r text-lg italic leading-relaxed text-foreground/85 md:text-xl">
              {placard.message}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
            >
              Close softly
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

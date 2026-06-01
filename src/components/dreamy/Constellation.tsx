import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { constellationMessages } from "@/lib/placard-data";

function rand(seed: number) {
  const x = Math.sin(seed * 12.91) * 10000;
  return x - Math.floor(x);
}

export function Constellation() {
  const [active, setActive] = useState<{ x: number; y: number; msg: string } | null>(null);
  const [discovered, setDiscovered] = useState(0);

  const stars = useMemo(
    () =>
      constellationMessages.map((msg, i) => ({
        id: i,
        x: 8 + rand(i + 1) * 84,
        y: 12 + rand(i + 30) * 70,
        size: 5 + rand(i + 60) * 8,
        msg,
        delay: rand(i + 90) * 3,
      })),
    [],
  );

  // connecting lines between sequential stars
  const lines = stars.slice(0, -1).map((s, i) => ({
    x1: s.x,
    y1: s.y,
    x2: stars[i + 1].x,
    y2: stars[i + 1].y,
  }));

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-8 text-center">
        <p className="font-script text-3xl text-gold md:text-4xl">Look Up</p>
        <h2 className="mt-2 font-display text-4xl text-foreground md:text-6xl">
          Our Private Constellation
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Each star holds a small truth. Touch them in any order, all of them, none of them — they will wait.
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          {discovered} of {stars.length} discovered
        </p>
      </header>

      <div
        className="relative mx-auto overflow-hidden rounded-3xl border"
        style={{
          height: "min(70vh, 560px)",
          background:
            "radial-gradient(ellipse at center, oklch(0.30 0.07 290 / 0.4), oklch(0.25 0.08 280 / 0.85))",
          boxShadow: "inset 0 0 80px oklch(0.20 0.10 280 / 0.6)",
        }}
      >
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="oklch(0.95 0.06 60 / 0.25)"
              strokeWidth="0.15"
              strokeDasharray="0.5 0.8"
            />
          ))}
        </svg>
        {stars.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={(e) => {
              const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
              setActive({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
                msg: s.msg,
              });
              setDiscovered((d) => d + 1);
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              boxShadow: `0 0 ${s.size * 3}px oklch(0.95 0.10 60 / 0.9), 0 0 ${s.size * 6}px oklch(0.90 0.08 350 / 0.6)`,
              animation: `twinkle ${2.5 + (s.id % 3)}s ease-in-out ${s.delay}s infinite`,
            }}
            aria-label="Open a star"
          />
        ))}

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="placard pointer-events-none absolute z-20 max-w-[260px] -translate-x-1/2 rounded-2xl px-5 py-4 text-center"
              style={{
                left: `${Math.min(85, Math.max(15, active.x))}%`,
                top: `${Math.min(80, Math.max(15, active.y - 8))}%`,
              }}
              onAnimationComplete={() => {
                setTimeout(() => setActive(null), 3200);
              }}
            >
              <p className="font-display text-base leading-snug text-foreground md:text-lg">
                {active.msg}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

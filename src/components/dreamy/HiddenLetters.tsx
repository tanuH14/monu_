import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { letters } from "@/lib/placard-data";

function Envelope({
  onOpen,
  index,
  opened,
}: {
  onOpen: () => void;
  index: number;
  opened: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -8, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="group relative h-32 w-44 cursor-pointer"
      aria-label={`Open letter ${index + 1}`}
    >
      <div
        className="absolute inset-0 rounded-md"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.96 0.03 30), oklch(0.90 0.06 25))",
          boxShadow:
            "0 14px 35px -10px oklch(0.6 0.12 20 / 0.5), inset 0 0 0 1px oklch(1 0 0 / 0.5)",
        }}
      />
      {/* flap */}
      <div
        className="absolute inset-x-0 top-0 origin-top transition-transform duration-500 group-hover:rotate-x-180"
        style={{
          height: "60%",
          background:
            "linear-gradient(180deg, oklch(0.93 0.05 25), oklch(0.86 0.08 20))",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          transform: opened ? "rotateX(180deg)" : undefined,
          transformOrigin: "top",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
        }}
      />
      {/* wax seal */}
      <div
        className="absolute left-1/2 top-[55%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.78 0.16 20), oklch(0.55 0.18 15))",
          boxShadow:
            "0 0 12px oklch(0.78 0.16 20 / 0.6), inset -2px -3px 4px oklch(0.3 0.1 15 / 0.5)",
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center font-script text-xs text-white/90">
          ♥
        </span>
      </div>
    </motion.button>
  );
}

export function HiddenLetters() {
  const [active, setActive] = useState<number | null>(null);
  const [opened, setOpened] = useState<Set<number>>(new Set());

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-10 text-center">
        <p className="font-script text-3xl text-gold md:text-4xl">In Your Hands</p>
        <h2 className="mt-2 font-display text-4xl text-foreground md:text-6xl">
          Letters Hidden Across The Universe
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Five envelopes. Open them slowly. They are meant to be read like prayers, not paragraphs.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
        {letters.map((l, i) => (
          <div key={l.id} className="flex flex-col items-center gap-3">
            <Envelope
              index={i}
              opened={opened.has(i)}
              onOpen={() => {
                setActive(i);
                setOpened((s) => new Set(s).add(i));
              }}
            />
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {l.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.95 0.04 30 / 0.92), oklch(0.85 0.08 350 / 0.95))",
                backdropFilter: "blur(20px)",
              }}
            />
            <motion.div
              initial={{ scale: 0.6, rotateZ: -8, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
              exit={{ scale: 0.6, rotateZ: 8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-lg rounded-sm p-10 md:p-12"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.98 0.015 60), oklch(0.94 0.03 30))",
                boxShadow:
                  "0 30px 80px -20px oklch(0.5 0.12 20 / 0.5), 0 0 0 1px oklch(0.85 0.08 60 / 0.4) inset",
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent, transparent 31px, oklch(0.85 0.06 20 / 0.18) 32px)",
              }}
            >
              <p className="font-script text-xl text-gold">{letters[active].title}</p>
              <div className="my-3 h-px bg-gradient-gold opacity-60" />
              <p className="font-serif-r text-lg leading-relaxed text-foreground/90 md:text-xl">
                {letters[active].body}
              </p>
              <p className="mt-6 text-right font-script text-2xl text-gold">— Yours, still.</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
              >
                Fold it back
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

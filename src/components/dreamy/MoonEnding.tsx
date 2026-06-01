import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

function rand(seed: number) {
  const x = Math.sin(seed * 7.7) * 10000;
  return x - Math.floor(x);
}

export function MoonEnding() {
  const [activated, setActivated] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: rand(i + 1) * 100,
        delay: rand(i + 50) * 6,
        duration: 8 + rand(i + 100) * 8,
        size: 14 + rand(i + 150) * 18,
        sway: (rand(i + 200) - 0.5) * 200,
        hue: rand(i + 250) > 0.5 ? 350 : 25,
      })),
    [],
  );

  return (
    <section className="relative z-10 mx-auto flex w-full flex-col items-center px-4 py-24 text-center">
      <p className="font-script text-3xl text-gold md:text-4xl">One Last Thing</p>
      <h2 className="mt-2 font-display text-4xl text-foreground md:text-6xl">
        Touch The Moon
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
        If you have made it here, you have seen all of me. There is nothing left to hide. Just one final gesture, if you want it.
      </p>

      <motion.button
        type="button"
        onClick={() => setActivated(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative mt-12 h-64 w-64 cursor-pointer rounded-full md:h-80 md:w-80"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.99 0.02 80) 0%, oklch(0.92 0.06 60) 45%, oklch(0.80 0.10 40) 85%, oklch(0.65 0.14 25) 100%)",
          animation: "moon-pulse 5s ease-in-out infinite",
          boxShadow:
            "0 0 100px oklch(0.95 0.10 60 / 0.6), inset -20px -30px 60px oklch(0.55 0.15 20 / 0.4)",
        }}
        aria-label="Activate the final scene"
      >
        {/* craters */}
        {[
          { x: 30, y: 35, r: 16 },
          { x: 60, y: 50, r: 10 },
          { x: 50, y: 70, r: 14 },
          { x: 70, y: 25, r: 7 },
        ].map((c, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.r,
              height: c.r,
              background:
                "radial-gradient(circle, oklch(0.75 0.08 40 / 0.4), oklch(0.85 0.06 60 / 0) 80%)",
            }}
          />
        ))}
      </motion.button>

      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="fixed inset-0 z-[70] overflow-hidden"
          >
            {/* warm glowing sky */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.92 0.08 60) 0%, oklch(0.85 0.12 30) 45%, oklch(0.72 0.14 15) 100%)",
              }}
            />

            {/* twinkling stars over warm sky */}
            {Array.from({ length: 60 }).map((_, i) => (
              <span
                key={`fs-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${rand(i + 900) * 100}%`,
                  top: `${rand(i + 1000) * 100}%`,
                  width: 2 + rand(i + 1100) * 3,
                  height: 2 + rand(i + 1100) * 3,
                  boxShadow: "0 0 10px oklch(1 0 0 / 0.9)",
                  animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 7) * 0.3}s infinite`,
                }}
              />
            ))}

            {/* floating hearts */}
            {hearts.map((h, i) => (
              <div
                key={`h-${i}`}
                className="absolute bottom-0"
                style={{
                  left: `${h.left}%`,
                  ["--sway" as string]: `${h.sway}px`,
                  animation: `heart-rise ${h.duration}s ease-in ${h.delay}s infinite`,
                }}
              >
                <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill={`oklch(0.78 0.16 ${h.hue})`}>
                  <path d="M12 21s-7-4.35-9.5-9.5C.5 7.5 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 3.5 4 7.5C19 16.65 12 21 12 21z" />
                </svg>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="font-script text-4xl text-gold md:text-6xl">For Her, Always</p>
              <h3 className="mt-6 max-w-3xl font-display text-3xl leading-tight text-foreground/90 md:text-5xl">
                If There Is Still A Place For Me In Your Heart…
                <br />
                <span className="shimmer-text">I Promise To Protect It Better This Time.</span>
              </h3>
              <button
                type="button"
                onClick={() => setActivated(false)}
                className="mt-12 text-xs uppercase tracking-[0.3em] text-foreground/60 hover:text-foreground"
              >
                Return to the garden
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

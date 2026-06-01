import { motion } from "framer-motion";

export function Hero({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="relative z-10 flex min-h-[92vh] flex-col items-center justify-center px-4 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="font-script text-4xl text-gold md:text-5xl"
      >
        An Apology, In The Shape Of A Universe
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-foreground md:text-8xl"
      >
        Everything Soft <br />
        <span className="shimmer-text">I Should Have Said Out Loud.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1 }}
        className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
      >
        This is not a page to read. It is a small universe to explore. Open the placards. Touch the stars. Unfold the letters. Stay only as long as it feels kind.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        onClick={onBegin}
        className="mt-10 rounded-full border border-gold/60 bg-gradient-gold px-8 py-3 text-xs uppercase tracking-[0.4em] text-foreground/80"
        style={{
          boxShadow:
            "0 20px 60px -10px oklch(0.85 0.14 80 / 0.5), 0 0 60px oklch(0.88 0.10 350 / 0.4)",
          animation: "pulse-glow 5s ease-in-out infinite",
        }}
      >
        Begin Softly
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70"
      >
        Tap, hover, drift. Nothing here is in a hurry.
      </motion.div>
    </section>
  );
}

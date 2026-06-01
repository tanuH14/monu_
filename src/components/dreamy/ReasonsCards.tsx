import { motion } from "framer-motion";
import { reasons } from "@/lib/placard-data";

export function ReasonsCards() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-10 text-center">
        <p className="font-script text-3xl text-gold md:text-4xl">A Soft Truth</p>
        <h2 className="mt-2 font-display text-4xl text-foreground md:text-6xl">
          Reasons Why You Are Irreplaceable
        </h2>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 180, damping: 20 }}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow:
                "0 30px 70px -20px oklch(0.78 0.12 15 / 0.5), 0 0 80px oklch(0.85 0.12 80 / 0.35)",
            }}
            className="placard cursor-default rounded-2xl p-6"
          >
            <div
              className="mb-3 h-1 w-10 rounded-full bg-gradient-gold"
              style={{ boxShadow: "0 0 12px oklch(0.85 0.12 80 / 0.7)" }}
            />
            <p className="font-display text-lg leading-snug text-foreground md:text-xl">
              {r}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

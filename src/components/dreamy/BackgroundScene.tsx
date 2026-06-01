import { useEffect, useMemo, useState } from "react";

// Deterministic pseudo-random
function rand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function BackgroundScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        left: rand(i + 1) * 100,
        top: rand(i + 100) * 100,
        size: rand(i + 200) * 2 + 1,
        delay: rand(i + 300) * 4,
        duration: 2 + rand(i + 400) * 3,
      })),
    [],
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: rand(i + 500) * 100,
        delay: rand(i + 600) * 18,
        duration: 14 + rand(i + 700) * 12,
        sway: (rand(i + 800) - 0.5) * 200,
        hue: 340 + rand(i + 900) * 30,
        size: 10 + rand(i + 950) * 14,
      })),
    [],
  );

  const butterflies = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        left: 10 + rand(i + 1100) * 80,
        top: 15 + rand(i + 1200) * 60,
        delay: rand(i + 1300) * 6,
        duration: 8 + rand(i + 1400) * 6,
        hue: rand(i + 1500) > 0.5 ? 340 : 50,
      })),
    [],
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Clouds */}
      <div
        className="absolute -top-20 left-0 h-[60vh] w-[200vw] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 20% 50%, oklch(0.99 0.01 30 / 0.7), transparent), radial-gradient(ellipse 35% 25% at 60% 40%, oklch(0.97 0.02 350 / 0.6), transparent), radial-gradient(ellipse 30% 25% at 90% 60%, oklch(0.96 0.03 30 / 0.5), transparent)",
          animation: "drift 90s linear infinite",
        }}
      />
      <div
        className="absolute top-1/3 left-0 h-[40vh] w-[200vw] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 35% 25% at 30% 50%, oklch(0.95 0.04 300 / 0.5), transparent), radial-gradient(ellipse 30% 20% at 70% 40%, oklch(0.97 0.02 50 / 0.6), transparent)",
          animation: "drift 140s linear infinite reverse",
        }}
      />

      {/* Stars */}
      {stars.map((s, i) => (
        <div
          key={`s-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: `0 0 ${s.size * 3}px oklch(0.95 0.06 60 / 0.9)`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Petals */}
      {petals.map((p, i) => (
        <div
          key={`p-${i}`}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle at 30% 30%, oklch(0.92 0.10 ${p.hue}), oklch(0.78 0.14 ${p.hue}))`,
            borderRadius: "150% 0 150% 0",
            opacity: 0.8,
            ["--sway" as string]: `${p.sway}px`,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            filter: "blur(0.3px)",
          }}
        />
      ))}

      {/* Butterflies */}
      {butterflies.map((b, i) => (
        <div
          key={`b-${i}`}
          className="absolute"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            animation: `butterfly ${b.duration}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          <svg width="28" height="22" viewBox="0 0 28 22">
            <g style={{ transformOrigin: "center", animation: "twinkle 0.4s ease-in-out infinite" }}>
              <ellipse cx="8" cy="9" rx="7" ry="9" fill={`oklch(0.85 0.10 ${b.hue} / 0.75)`} />
              <ellipse cx="20" cy="9" rx="7" ry="9" fill={`oklch(0.85 0.10 ${b.hue} / 0.75)`} />
              <ellipse cx="8" cy="15" rx="5" ry="6" fill={`oklch(0.92 0.06 ${b.hue} / 0.7)`} />
              <ellipse cx="20" cy="15" rx="5" ry="6" fill={`oklch(0.92 0.06 ${b.hue} / 0.7)`} />
              <line x1="14" y1="4" x2="14" y2="20" stroke="oklch(0.4 0.08 20)" strokeWidth="1" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}

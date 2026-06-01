import { useEffect, useRef, useState } from "react";

// A soft ambient pad generated with Web Audio — no asset needed.
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => () => nodesRef.current?.stop(), []);

  const toggle = async () => {
    if (on) {
      nodesRef.current?.stop();
      nodesRef.current = null;
      setOn(false);
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
    master.connect(ctx.destination);

    const reverb = ctx.createBiquadFilter();
    reverb.type = "lowpass";
    reverb.frequency.value = 1400;
    reverb.connect(master);

    const freqs = [220, 277.18, 329.63, 415.3, 523.25];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.18 / freqs.length;
      // slow LFO on gain
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
      o.connect(g).connect(reverb);
      o.start();
      return { o, lfo };
    });

    nodesRef.current = {
      stop: () => {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => {
          oscs.forEach(({ o, lfo }) => {
            try { o.stop(); lfo.stop(); } catch { /* ignore */ }
          });
          master.disconnect();
        }, 1400);
      },
    };
    setOn(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-5 top-5 z-[55] flex items-center gap-2 rounded-full border border-gold/40 bg-card/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/80 backdrop-blur-md transition hover:scale-105"
      style={{ boxShadow: "0 10px 30px -10px oklch(0.78 0.10 15 / 0.4)" }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: on ? "oklch(0.85 0.12 80)" : "oklch(0.7 0.05 20)",
          boxShadow: on ? "0 0 12px oklch(0.85 0.12 80)" : undefined,
        }}
      />
      {on ? "Ambience On" : "Play Ambience"}
    </button>
  );
}

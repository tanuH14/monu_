import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  life: number;
  hue: number;
  vx: number;
  vy: number;
}

export function CursorSparkles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const sparkles = useRef<Sparkle[]>([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 30) return;
      last = now;
      for (let i = 0; i < 2; i++) {
        sparkles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 3 + 1.5,
          life: 1,
          hue: Math.random() > 0.5 ? 350 : 60,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -Math.random() * 0.8 - 0.2,
        });
      }
    };
    window.addEventListener("pointermove", onMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles.current = sparkles.current.filter((s) => s.life > 0);
      for (const s of sparkles.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.02;
        const alpha = Math.max(0, s.life);
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
        grd.addColorStop(0, `oklch(0.95 0.10 ${s.hue} / ${alpha})`);
        grd.addColorStop(1, `oklch(0.95 0.10 ${s.hue} / 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `oklch(1 0 0 / ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface Polaroid {
  id: string;
  src: string;
  caption: string;
}

const STORAGE_KEY = "dreamy.polaroids.v1";

const defaultCaptions = [
  "A Soft Afternoon",
  "Somewhere Worth Remembering",
  "Your Light, Mine To Witness",
  "One Of The Good Ones",
  "Add A Memory",
];

export function MemoryAlbum() {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([   
    {     
      id: "1",     
      src: "src/assets/photos/photo1.jpeg",     
      caption: "Our First Memory",   
    },   
    {     
      id: "2",     
      src: "src/assets/photos/photo2.jpeg",     
      caption: "You & Me",   
    },
    {     
      id: "3",     
      src: "src/assets/photos/photo3.jpeg",     
      caption: "Forever Soft",   
    }, 
    {     
      id: "4",     
      src: "src/assets/photos/photo4.jpeg",     
      caption: "Forever Soft",   
    }, 
  ]);
  const [opened, setOpened] = useState<Polaroid | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 12)
      .forEach((f) => {
        const reader = new FileReader();
        reader.onload = () => {
          const src = String(reader.result);
          setPolaroids((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random()}`,
              src,
              caption: defaultCaptions[prev.length % defaultCaptions.length],
            },
          ]);
        };
        reader.readAsDataURL(f);
      });
  }, []);

  const updateCaption = (id: string, caption: string) =>
    setPolaroids((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)));

  const remove = (id: string) => setPolaroids((prev) => prev.filter((p) => p.id !== id));

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-10 text-center">
        <p className="font-script text-3xl text-gold md:text-4xl">Our Album</p>
        <h2 className="mt-2 font-display text-4xl text-foreground md:text-6xl">
          A Scrapbook For The Quiet Days
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Drop in any photo of us — a moment, a Tuesday, a nothing-day that turned out to be everything. Captions can be rewritten by tapping the words.
        </p>
      </header>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("ring-2", "ring-gold");
        }}
        onDragLeave={(e) => e.currentTarget.classList.remove("ring-2", "ring-gold")}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("ring-2", "ring-gold");
          handleFiles(e.dataTransfer.files);
        }}
        className="placard relative min-h-[300px] rounded-3xl p-6 md:p-10"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {polaroids.length === 0
              ? "Drag photos here or use the button"
              : `${polaroids.length} memor${polaroids.length === 1 ? "y" : "ies"} kept`}
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full border border-gold/60 bg-gradient-gold px-5 py-2 text-xs uppercase tracking-[0.25em] text-foreground/80 shadow-md transition hover:scale-105"
          >
            Add Photos
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10">
          {polaroids.length === 0 && (
            <div className="grid w-full grid-cols-1 gap-6 opacity-70 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-sm bg-white/70 p-3 shadow-lg"
                  style={{ transform: `rotate(${(i - 1) * 4}deg)` }}
                >
                  <div className="aspect-square w-full rounded-sm bg-gradient-to-br from-rose-100 to-amber-100" />
                  <p className="mt-3 text-center font-script text-lg text-foreground/70">
                    {defaultCaptions[i]}
                  </p>
                </div>
              ))}
            </div>
          )}
          {polaroids.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: ((i % 5) - 2) * 4 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="group relative cursor-pointer rounded-sm bg-white p-3 shadow-2xl"
              style={{ width: 220 }}
              onClick={() => setOpened(p)}
            >
              <img
                src={p.src}
                alt={p.caption}
                className="aspect-square w-full rounded-sm object-cover"
              />
              <input
                value={p.caption}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => updateCaption(p.id, e.target.value)}
                className="mt-3 w-full bg-transparent text-center font-script text-xl text-foreground outline-none"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(p.id);
                }}
                className="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-foreground/80 text-xs text-background group-hover:flex"
                aria-label="Remove"
              >
                ×
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 backdrop-blur-xl"
              style={{ background: "oklch(0.30 0.06 20 / 0.55)" }}
            />
            <motion.img
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              src={opened.src}
              alt={opened.caption}
              className="relative z-10 max-h-[80vh] max-w-[90vw] rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

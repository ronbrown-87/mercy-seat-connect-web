import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { staticGalleryData, youthSundayImages } from '@/data/galleryData';

const MAX = 100;

export const HeroSlideshow = ({ children }: { children: ReactNode }) => {
  const images = useMemo(
    () => [...staticGalleryData, ...youthSundayImages].slice(0, MAX).map((g) => g.imageUrl),
    []
  );
  const [slides, setSlides] = useState<string[]>(images.slice(0, 12));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Keep only images that actually load
  useEffect(() => {
    let active = true;
    Promise.all(
      images.map(
        (src) =>
          new Promise<string | null>((res) => {
            const img = new Image();
            img.onload = () => res(src);
            img.onerror = () => res(null);
            img.src = src;
          })
      )
    ).then((r) => {
      const ok = r.filter(Boolean) as string[];
      if (active && ok.length) setSlides(ok);
    });
    return () => {
      active = false;
    };
  }, [images]);

  const count = slides.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(t);
  }, [paused, count]);

  const dots = Math.min(count, 8);
  const activeDot = Math.floor((index / count) * dots);

  return (
    <section
      className="relative isolate min-h-[70vh] w-full overflow-hidden bg-slate-900 md:min-h-[80vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={slides[index]}
            src={slides[index]}
            alt="Mercy Seat church life"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-950/60 to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 pb-20 pt-28 md:min-h-[80vh]">
        <div className="max-w-2xl rounded-xl bg-black/30 p-6 text-white drop-shadow-md backdrop-blur-sm md:p-10">
          {children}
        </div>
      </div>

      {count > 1 && (
        <>
          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {Array.from({ length: dots }).map((_, d) => (
              <button
                key={d}
                aria-label={`Go to slide group ${d + 1}`}
                onClick={() => setIndex(Math.floor((d * count) / dots))}
                className={`h-2 rounded-full transition-all ${
                  d === activeDot ? 'w-8 bg-orange-400' : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSlideshow;

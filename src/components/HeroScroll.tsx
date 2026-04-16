import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 96;

const allPaths = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames-hero-webp/frame-${String(i + 1).padStart(4, "0")}.webp`
);

const heroFadeStart = 0.72;
const heroFadeEnd = 0.84;

const scrollPhrases = [
  { text: "Strategy that compounds", start: 0.03, end: 0.22 },
  { text: "Creative that converts", start: 0.26, end: 0.45 },
  { text: "Growth you can measure", start: 0.49, end: heroFadeStart - 0.02 },
];

export default function HeroScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bitmapsRef = useRef<ImageBitmap[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bmp = bitmapsRef.current[index];
    if (!bmp) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = bmp.width / bmp.height;
    const containerRatio = cw / ch;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > containerRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.drawImage(bmp, drawX, drawY, drawW, drawH);
    currentFrameRef.current = index;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const bitmaps: ImageBitmap[] = new Array(allPaths.length);

    Promise.all(
      allPaths.map((src, i) =>
        fetch(src)
          .then((r) => r.blob())
          .then((blob) => createImageBitmap(blob))
          .then((bmp) => {
            bitmaps[i] = bmp;
          })
      )
    ).then(() => {
      if (cancelled) return;
      bitmapsRef.current = bitmaps;
      setLoaded(true);
      drawFrame(0);
    });

    return () => {
      cancelled = true;
      bitmaps.forEach((b) => b && b.close());
    };
  }, [drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  useEffect(() => {
    if (!loaded || !sectionRef.current || !containerRef.current) return;

    const phraseEls =
      sectionRef.current.querySelectorAll<HTMLElement>(".scroll-phrase");
    const heroContent = heroContentRef.current;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndex = Math.min(
          allPaths.length - 1,
          Math.floor(progress * allPaths.length)
        );

        if (frameIndex !== currentFrameRef.current) {
          drawFrame(frameIndex);
        }

        phraseEls.forEach((el, i) => {
          const phrase = scrollPhrases[i];
          const fadeIn = phrase.start;
          const fadeInEnd = phrase.start + 0.04;
          const fadeOutStart = phrase.end - 0.04;
          const fadeOut = phrase.end;

          let opacity = 0;
          let y = 30;

          if (progress >= fadeIn && progress <= fadeInEnd) {
            const t = (progress - fadeIn) / (fadeInEnd - fadeIn);
            opacity = t;
            y = 30 * (1 - t);
          } else if (progress > fadeInEnd && progress < fadeOutStart) {
            opacity = 1;
            y = 0;
          } else if (progress >= fadeOutStart && progress <= fadeOut) {
            const t = (progress - fadeOutStart) / (fadeOut - fadeOutStart);
            opacity = 1 - t;
            y = -20 * t;
          }

          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${y}px)`;
        });

        if (heroContent) {
          if (progress < heroFadeStart) {
            heroContent.style.opacity = "0";
            heroContent.style.transform = "translateY(40px)";
          } else if (progress >= heroFadeStart && progress <= heroFadeEnd) {
            const t = (progress - heroFadeStart) / (heroFadeEnd - heroFadeStart);
            heroContent.style.opacity = String(t);
            heroContent.style.transform = `translateY(${40 * (1 - t)}px)`;
          } else {
            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0px)";
          }
        }
      },
    });

    return () => trigger.kill();
  }, [loaded, drawFrame]);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div ref={containerRef} className="w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />

        <div className="absolute inset-0 pointer-events-none">
          {scrollPhrases.map((phrase, i) => (
            <div
              key={i}
              className="scroll-phrase absolute inset-0 flex items-center justify-center
                opacity-0 will-change-transform px-6"
            >
              <div className="text-center">
                <span className="eyebrow block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className="display-heading text-[clamp(2rem,5vw,4rem)] text-ink"
                  style={{
                    textShadow:
                      "0 2px 30px rgba(250,250,247,0.9), 0 0 60px rgba(250,250,247,0.6)",
                  }}
                >
                  {phrase.text.split(" ").map((word, wi, arr) => (
                    <span key={wi}>
                      {wi === arr.length - 1 ? (
                        <span className="serif-italic text-simian">{word}</span>
                      ) : (
                        word
                      )}{" "}
                    </span>
                  ))}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={heroContentRef}
          className="absolute inset-0 opacity-0 will-change-transform pointer-events-none"
        >

          <div className="relative z-10 h-full flex items-center justify-center pointer-events-auto">
            <div className="liquid-glass-hero max-w-xl w-full mx-6 text-center" style={{ padding: "3rem 3.5rem" }}>
              <div className="liquid-glass-hero__refraction" />
              <div className="liquid-glass-hero__specular" />
              <div className="relative z-10">
                <h1 className="font-display font-semibold
                  text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-tight leading-tight
                  text-ink mb-1">
                  Your ads are stuck.
                </h1>
                <h1 className="font-display font-semibold
                  text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-tight leading-tight
                  serif-italic text-simian">
                  We fix that.
                </h1>
                <p className="text-steel/80 text-[0.95rem] leading-[1.75] mt-6 max-w-[44ch] mx-auto">
                  Talk to us directly so we can analyze, build &amp; execute the
                  above industry standard marketing plan for you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {!loaded && (
          <div className="absolute inset-0 bg-canvas flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-simian/30 border-t-simian rounded-full animate-spin" />
              <span className="eyebrow text-muted">Loading</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPLODE_FRAMES = 76;
const FLOAT_FRAMES = 76;
const TOTAL_FRAMES = EXPLODE_FRAMES + FLOAT_FRAMES - 1;

const explodePaths = Array.from(
  { length: EXPLODE_FRAMES },
  (_, i) => `/frames-webp/frame-${String(i + 1).padStart(4, "0")}.webp`
);
const floatPaths = Array.from(
  { length: FLOAT_FRAMES },
  (_, i) => `/frames-float-webp/frame-${String(i + 1).padStart(4, "0")}.webp`
);

const allPaths = [...explodePaths, ...floatPaths.slice(1)];

const explodeEnd = EXPLODE_FRAMES / TOTAL_FRAMES;

const scrollPhrases = [
  { text: "Strategy that compounds", start: 0.02, end: 0.15 },
  { text: "Creative that converts", start: 0.18, end: 0.32 },
  { text: "Growth you can measure", start: 0.35, end: explodeEnd - 0.02 },
];

export default function HeroScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

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

    const imgRatio = img.naturalWidth / img.naturalHeight;
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

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    currentFrameRef.current = index;
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    allPaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === allPaths.length) {
          setLoaded(true);
          drawFrame(0);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  useEffect(() => {
    if (!loaded || !sectionRef.current || !containerRef.current) return;

    // Force scroll to top on load so animation starts at frame 0
    window.scrollTo(0, 0);
    drawFrame(0);

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
          const heroFadeIn = explodeEnd - 0.02;
          const heroFullIn = explodeEnd + 0.06;

          if (progress < heroFadeIn) {
            heroContent.style.opacity = "0";
            heroContent.style.transform = "translateY(40px)";
          } else if (progress >= heroFadeIn && progress <= heroFullIn) {
            const t = (progress - heroFadeIn) / (heroFullIn - heroFadeIn);
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
    <section ref={sectionRef} className="relative h-[500vh]">
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

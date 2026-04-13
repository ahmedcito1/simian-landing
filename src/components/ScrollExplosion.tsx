import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 151;
const framePaths = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/frame-${String(i + 1).padStart(4, "0")}.jpg`
);

const phrases = [
  { text: "Strategy that compounds", start: 0, end: 0.25 },
  { text: "Creative that converts", start: 0.3, end: 0.55 },
  { text: "Growth you can measure", start: 0.6, end: 0.85 },
];

export default function ScrollExplosion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      ctx.scale(dpr, dpr);
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

    framePaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          drawFrame(0);
        }
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, [drawFrame]);

  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  useEffect(() => {
    if (!loaded || !sectionRef.current || !containerRef.current) return;

    const phraseEls =
      sectionRef.current.querySelectorAll<HTMLElement>(".scroll-phrase");

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frameIndex !== currentFrameRef.current) {
          drawFrame(frameIndex);
        }

        phraseEls.forEach((el, i) => {
          const phrase = phrases[i];
          const fadeInStart = phrase.start;
          const fadeInEnd = phrase.start + 0.08;
          const fadeOutStart = phrase.end - 0.08;
          const fadeOutEnd = phrase.end;

          let opacity = 0;
          let y = 30;

          if (progress >= fadeInStart && progress <= fadeInEnd) {
            const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
            opacity = t;
            y = 30 * (1 - t);
          } else if (progress > fadeInEnd && progress < fadeOutStart) {
            opacity = 1;
            y = 0;
          } else if (progress >= fadeOutStart && progress <= fadeOutEnd) {
            const t =
              (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            opacity = 1 - t;
            y = -20 * t;
          }

          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${y}px)`;
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [loaded, drawFrame]);

  return (
    <section ref={sectionRef} className="relative h-[250vh]">
      <div ref={containerRef} className="w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {phrases.map((phrase, i) => (
            <div
              key={i}
              className="scroll-phrase absolute text-center opacity-0 will-change-transform
                px-6"
            >
              <span className="eyebrow block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                className="display-heading text-[clamp(2rem,5vw,4rem)] text-ink"
                style={{
                  textShadow: "0 2px 30px rgba(250,250,247,0.9), 0 0 60px rgba(250,250,247,0.6)",
                }}
              >
                {phrase.text.split(" ").map((word, wi) => (
                  <span key={wi}>
                    {wi === phrase.text.split(" ").length - 1 ? (
                      <span className="serif-italic text-simian">{word}</span>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ))}
              </h2>
            </div>
          ))}
        </div>

        {!loaded && (
          <div className="absolute inset-0 bg-canvas flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-simian/30 border-t-simian rounded-full animate-spin" />
              <span className="eyebrow text-muted">Loading experience</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

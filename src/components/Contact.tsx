import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";

interface ContactProps {
  onOpenForm: () => void;
}

export default function Contact({ onOpenForm }: ContactProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, [-100, 100], [-6, 6]);
  const y = useTransform(mouseY, [-100, 100], [-4, 4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      id="contact"
      className="contact-section relative overflow-hidden"
      style={{ paddingTop: "clamp(3rem, 8vw, 8rem)", paddingBottom: "clamp(1.5rem, 3vw, 3rem)" }}
    >
      {/* Liquid glass backdrop */}
      <div className="contact-backdrop" />
      <div className="contact-backdrop-orb contact-backdrop-orb--1" />
      <div className="contact-backdrop-orb contact-backdrop-orb--2" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="liquid-glass-cta-panel" style={{ padding: "clamp(2rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)" }}>
            <div className="liquid-glass-cta-panel__specular" />

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="liquid-glass-eyebrow inline-block" style={{ marginBottom: "2rem" }}>
                  Ready?
                </span>
                <h2 className="display-heading text-[clamp(2.25rem,5vw,4rem)]" style={{ marginBottom: "1rem" }}>
                  One call.
                  <br />
                  <span className="serif-italic text-simian">That's all it takes.</span>
                </h2>
                <p className="text-steel text-lg leading-relaxed max-w-[40ch] mx-auto"
                  style={{ marginBottom: "3rem" }}>
                  Talk to us directly so we can analyze, build, and execute
                  a marketing plan built for your business.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
              >
                <motion.button
                  ref={btnRef}
                  onClick={onOpenForm}
                  style={{ x, y }}
                  className="liquid-glass-cta-btn group"
                >
                  Start the conversation
                  <span
                    className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center
                    group-hover:translate-x-1 group-hover:-translate-y-[1px]
                    group-hover:scale-105
                    transition-transform duration-300"
                  >
                    <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1 9L9 1M9 1H3M9 1V7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xs text-muted tracking-wide"
                style={{ marginTop: "2rem" }}
              >
                No retainers. No long-term contracts. Results first.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

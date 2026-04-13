import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const panels = [
  {
    number: "01",
    title: "If you hate\nCommunication",
    description:
      "If you prefer agencies that disappear for weeks, give vague updates, or hide behind dashboards without context, we're not a good fit.",
    accent: "rgba(27, 156, 133, 0.06)",
  },
  {
    number: "02",
    title: "If you hate\nDelivery",
    description:
      "If missed deadlines, half-finished campaigns, and constant excuses feel acceptable, you won't enjoy working with us.",
    accent: "rgba(99, 102, 241, 0.05)",
  },
  {
    number: "03",
    title: "If you hate\nGrowth",
    description:
      "If you're comfortable staying stagnant, avoiding data, and making decisions based on gut feeling alone, we're not your agency.",
    accent: "rgba(245, 158, 11, 0.05)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.15,
    },
  }),
};

export default function WhyNotUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden why-not-section"
      style={{ paddingTop: "clamp(3rem, 7vw, 7rem)", paddingBottom: "clamp(1.5rem, 3vw, 3rem)" }}>
      {/* Backdrop orbs */}
      <div className="why-not-backdrop" />
      <div className="why-not-backdrop-orb why-not-backdrop-orb--1" />
      <div className="why-not-backdrop-orb why-not-backdrop-orb--2" />
      <div className="why-not-backdrop-orb why-not-backdrop-orb--3" />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-14 lg:px-20">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          <span className="liquid-glass-eyebrow inline-block" style={{ marginBottom: "1.5rem" }}>
            Why not us
          </span>
          <h2 className="display-heading text-[clamp(2rem,4vw,3.5rem)]">
            Don't work with us
            <br />
            <span className="serif-italic text-simian">if you hate...</span>
          </h2>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "clamp(1.25rem, 3vw, 2.5rem)" }}>
          {panels.map((panel, i) => (
            <motion.div
              key={panel.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="liquid-glass-card group"
            >
              {/* Specular highlight */}
              <div className="liquid-glass-card__specular" />

              {/* Colored ambient glow on hover */}
              <div
                className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100
                  transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${panel.accent} 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full" style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                <span className="font-mono text-sm text-simian/60 tracking-widest block"
                  style={{ marginBottom: "1.5rem" }}>
                  {panel.number}
                </span>

                <h3
                  className="font-display font-semibold text-[1.5rem] md:text-[1.75rem]
                    tracking-tight text-ink leading-tight"
                  style={{ marginBottom: "1.5rem" }}
                >
                  {panel.title.split("\n").map((line, li) => (
                    <span key={li}>
                      {li === 1 ? (
                        <span className="serif-italic text-simian block">{line}</span>
                      ) : (
                        <span className="block">{line}</span>
                      )}
                    </span>
                  ))}
                </h3>

                <p className="text-steel/80 text-[0.95rem] md:text-base leading-[1.75] flex-1">
                  {panel.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

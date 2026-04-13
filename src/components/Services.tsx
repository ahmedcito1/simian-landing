import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "Creative Strategy",
    description:
      "Data-driven creative strategies that align messaging, visuals, and funnels to your business goals. Every piece of content works together to attract attention, build trust, and drive qualified leads.",
    accent: "rgba(27, 156, 133, 0.06)",
  },
  {
    title: "Paid Ads",
    description:
      "High-performance paid advertising across Meta, Google, and other platforms focused on measurable ROI. Every ad is built around audience research, conversion tracking, and continuous optimization.",
    accent: "rgba(99, 102, 241, 0.05)",
  },
  {
    title: "Business Consultancy",
    description:
      "Smarter growth decisions by aligning marketing strategy with operations, sales, and scalability. We identify bottlenecks, improve systems, and build foundations for long-term growth.",
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

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative overflow-hidden services-section">
      {/* Mesh gradient backdrop — gives the glass something to refract */}
      <div className="services-backdrop" />
      <div className="services-backdrop-orb services-backdrop-orb--1" />
      <div className="services-backdrop-orb services-backdrop-orb--2" />
      <div className="services-backdrop-orb services-backdrop-orb--3" />

      <div
        className="relative max-w-[1400px] mx-auto px-5 md:px-14 lg:px-20"
        style={{ paddingTop: "clamp(3rem, 6vw, 4.5rem)", paddingBottom: "clamp(3rem, 6vw, 4.5rem)" }}
      >
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: "clamp(3rem, 6vw, 8rem)" }}
        >
          <span className="liquid-glass-eyebrow inline-block" style={{ marginBottom: "2rem" }}>
            What we do
          </span>
          <h2 className="display-heading text-[clamp(2.5rem,5vw,4rem)]">
            Three disciplines.
            <br />
            <span className="serif-italic text-simian">One growth engine.</span>
          </h2>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "clamp(1.25rem, 3vw, 2.5rem)" }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
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
                  background: `radial-gradient(ellipse at 50% 0%, ${service.accent} 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full" style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                <h3
                  className="font-display font-semibold text-[1.5rem] md:text-[1.75rem]
                    tracking-tight text-ink leading-tight"
                  style={{ marginBottom: "1.5rem" }}
                >
                  {service.title}
                </h3>

                <p className="text-steel/80 text-[0.95rem] md:text-base leading-[1.75] flex-1">
                  {service.description}
                </p>

                <div style={{ marginTop: "2.5rem", paddingTop: "1.75rem", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                  <span
                    className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-steel/50
                      group-hover:text-simian transition-colors duration-500"
                  >
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="group-hover:translate-x-1 transition-transform duration-500
                        ease-[var(--ease-out-expo)]"
                    >
                      <path
                        d="M1 7h12M8 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

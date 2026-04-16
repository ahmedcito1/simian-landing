import { motion } from "framer-motion";
import { useState } from "react";

export default function Founder() {
  const [videoActive, setVideoActive] = useState(false);

  return (
    <section id="about" className="founder-section relative overflow-hidden"
      style={{ paddingTop: "clamp(3rem, 6vw, 6rem)", paddingBottom: "0" }}>
      {/* Liquid glass backdrop */}
      <div className="founder-backdrop" />
      <div className="founder-backdrop-orb founder-backdrop-orb--1" />
      <div className="founder-backdrop-orb founder-backdrop-orb--2" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* ── Centered Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <span className="liquid-glass-eyebrow inline-block" style={{ marginBottom: "1.5rem" }}>
            Founder
          </span>
          <h2 className="display-heading text-[clamp(2rem,4vw,3.5rem)]">
            The vision <span className="serif-italic text-simian">behind Simian</span>
          </h2>
        </motion.div>

        {/* ── YouTube Video ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="liquid-glass-video-frame"
          style={{ marginBottom: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          <div className="liquid-glass-card__specular" />
          <div className="relative z-10">
            <div
              className="aspect-video rounded-[1.25rem] overflow-hidden relative cursor-pointer"
              onClick={() => setVideoActive(true)}
              onMouseLeave={() => setVideoActive(false)}
            >
              <iframe
                src="https://www.youtube.com/embed/U0Uy8zPQ7tE"
                title="Simian Solution"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none" }}
              />
              {/* Scroll guard — blocks iframe from stealing scroll events */}
              {!videoActive && (
                <div className="absolute inset-0 z-10" />
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Quote + Description + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="liquid-glass-card" style={{ padding: "0" }}>
              <div className="liquid-glass-card__specular" />
              <div className="relative z-10" style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                <blockquote className="font-serif text-[clamp(1.5rem,3vw,2.5rem)]
                  italic leading-[1.3] text-ink mb-8">
                  "A company always starts with one step, yet making sure you're
                  wearing the right shoes and heading towards the right destination
                  is what Simian Solution is all about."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-simian/10 border border-simian-border
                    flex items-center justify-center backdrop-blur-sm">
                    <span className="font-display font-bold text-simian text-sm">BH</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-ink text-sm tracking-tight">
                      Bader Ahmad Hammoud
                    </p>
                    <p className="font-mono text-xs text-muted tracking-wide">
                      CEO & Founder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:pt-4"
          >
            <p className="text-steel leading-relaxed mb-6 max-w-[55ch]">
              As a performance-driven digital marketing agency, Simian Solution
              helps businesses attract qualified leads using SEO-optimized content,
              data-backed marketing strategies, paid advertising, and
              conversion-focused funnels.
            </p>
            <p className="text-steel leading-relaxed max-w-[55ch]">
              By combining SEO, content marketing, and lead generation strategy,
              Simian Solution positions brands as authorities in their industry —
              turning knowledge into measurable growth and consistent inbound leads.
            </p>

            <div className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-4">
              {[
                { value: "3", label: "Core disciplines" },
                { value: "5+", label: "Active partners" },
                { value: "100%", label: "Performance-driven" },
              ].map((stat) => (
                <div key={stat.label} className="liquid-glass-stat" style={{ padding: "clamp(0.75rem, 2vw, 1.25rem)" }}>
                  <p className="font-display font-bold text-xl md:text-3xl text-ink tracking-tight">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[0.6875rem] text-ink/70 tracking-wide mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="overflow-hidden liquid-glass-marquee py-4" style={{ marginTop: "clamp(2.5rem, 5vw, 5rem)" }}>
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8" style={{ marginRight: "2rem" }}>
              {[
                "Strategy",
                "Creative",
                "Growth",
                "Data",
                "Performance",
                "Conversion",
                "Scale",
                "ROI",
              ].map((word) => (
                <span
                  key={`${i}-${word}`}
                  className="font-display font-semibold text-xl md:text-2xl text-ink/10
                    tracking-tight flex items-center gap-8"
                >
                  <span className="text-simian/30 text-sm">/</span>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

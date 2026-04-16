import { motion } from "framer-motion";
import { useState } from "react";

const partners = [
  { name: "Diagnosit", logo: "/partners/diagnosit.png", invert: false },
  { name: "WAVS", logo: "/partners/wavs.webp", invert: false },
  { name: "ETC Podcast", logo: "/partners/etc.jpg", invert: false, rounded: true },
  { name: "Aquadental", logo: "/partners/aquadental.png", invert: false },
  { name: "NotBoring", logo: "/partners/notboring.svg", invert: false },
  { name: "Specialized Practice", logo: "/partners/specialized-practice.png", invert: false },
];

export default function Partners() {
  const [videoActive, setVideoActive] = useState(false);

  // Double the array for seamless infinite loop
  const carouselItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section id="partners" className="relative overflow-hidden partners-section"
      style={{ paddingTop: "clamp(3rem, 6vw, 6rem)", paddingBottom: "clamp(2rem, 4vw, 4.5rem)" }}>
      {/* Backdrop orbs */}
      <div className="partners-backdrop" />
      <div className="partners-backdrop-orb partners-backdrop-orb--1" />
      <div className="partners-backdrop-orb partners-backdrop-orb--2" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* CEO Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: "3rem" }}
        >
          <span className="liquid-glass-eyebrow inline-block" style={{ marginBottom: "1.5rem" }}>
            The CEO of Simian Solution
          </span>
        </motion.div>

        {/* YouTube Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="liquid-glass-video-frame"
          style={{ marginBottom: "3.5rem" }}
        >
          <div className="liquid-glass-card__specular" />
          <div className="relative z-10">
            <div
              className="aspect-video rounded-[1.25rem] overflow-hidden relative cursor-pointer"
              onClick={() => setVideoActive(true)}
              onMouseLeave={() => setVideoActive(false)}
            >
              <iframe
                src="https://www.youtube.com/embed/wvoRT6L36ug"
                title="Simian Solution CEO"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: "none" }}
              />
              {!videoActive && (
                <div className="absolute inset-0 z-10" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Partners Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
          style={{ marginBottom: "2.5rem" }}
        >
          <h2 className="display-heading text-[clamp(2rem,4vw,3.5rem)]">
            Our <span className="serif-italic text-simian">Partners</span>
          </h2>
        </motion.div>

        {/* Liquid glass carousel strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="partners-glass-strip"
        >
          <div className="liquid-glass-card__specular" />

          {/* Fade edges */}
          <div className="partners-carousel-fade partners-carousel-fade--left" />
          <div className="partners-carousel-fade partners-carousel-fade--right" />

          <div className="partners-carousel-track">
            {carouselItems.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="partner-logo-cell group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`partner-logo-img ${partner.rounded ? 'rounded-2xl' : ''}`}
                />
                <span className="partner-logo-label">{partner.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

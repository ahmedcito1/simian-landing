import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/frames/frame-0151.jpg"
      >
        <source src="/floating-pieces.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-canvas/85 via-canvas/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/40 via-transparent to-canvas/20" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl pt-32 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <span className="eyebrow inline-block mb-6 px-3 py-1.5
              rounded-full border border-simian-border bg-simian-glow">
              Performance marketing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="display-heading text-[clamp(2.75rem,7vw,5.5rem)] mb-6"
          >
            Your ads are stuck.
            <br />
            <span className="serif-italic text-simian">We fix that.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
            className="text-steel text-lg md:text-xl leading-relaxed max-w-[50ch] mb-10"
          >
            Strategy, creative, and paid media that compounds.
            We turn marketing spend into measurable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-simian text-white
                font-semibold text-base px-7 py-3.5 rounded-full
                hover:bg-simian-hover active:scale-[0.97]
                transition-all duration-300 ease-[var(--ease-spring)]"
            >
              Start the conversation
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center
                group-hover:translate-x-0.5 group-hover:-translate-y-[1px]
                transition-transform duration-300">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <span className="text-muted text-sm font-mono tracking-wide">
              No retainers. No fluff.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

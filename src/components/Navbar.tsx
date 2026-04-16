import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenForm: () => void;
}

const navLinks = ["Services", "Partners", "About", "Contact"];

const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function Navbar({ onOpenForm }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── SVG filters for liquid glass refraction ── */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl"
      >
        <div
          className={`liquid-glass-nav ${scrolled ? "liquid-glass-nav--scrolled" : ""}`}
        >
          {/* Refraction / lensing layer */}
          <div className="liquid-glass-nav__refraction" />
          {/* Specular highlight sweep */}
          <div className="liquid-glass-nav__specular" />

          {/* ── Content ── */}
          <div className="relative z-10 flex items-center justify-between pl-7 pr-4 py-4">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="/new-logo-removebg-preview.png"
                alt="Simian Solution"
                className="h-7 md:h-8 w-auto object-contain"
              />
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="liquid-glass-btn"
                >
                  <span className="relative z-10">{link}</span>
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              {/* CTA */}
              <button
                onClick={onOpenForm}
                className="liquid-glass-cta hidden md:flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a project
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M1 9L9 1M9 1H3M9 1V7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden relative w-10 h-10 rounded-xl liquid-glass-btn-icon flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                  transition={spring}
                  className="absolute w-4 h-[1.5px] bg-ink/80 rounded-full"
                />
                <motion.span
                  animate={
                    open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }
                  }
                  transition={spring}
                  className="absolute w-4 h-[1.5px] bg-ink/80 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 liquid-glass-mobile-overlay flex flex-col items-center justify-center gap-3"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.07,
                }}
                onClick={() => scrollTo(link)}
                className="liquid-glass-mobile-link display-heading text-2xl md:text-4xl"
              >
                {link}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: navLinks.length * 0.07,
              }}
              onClick={() => { setOpen(false); onOpenForm(); }}
              className="liquid-glass-cta mt-6 text-base px-8 py-3"
            >
              <span className="relative z-10">Start a project</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

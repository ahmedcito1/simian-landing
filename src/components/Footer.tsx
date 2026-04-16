export default function Footer() {
  return (
    <footer className="relative" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="liquid-glass-card" style={{ padding: "0" }}>
          <div className="liquid-glass-card__specular" />

          <div className="relative z-10" style={{ padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2.5rem) clamp(1.25rem, 2vw, 2rem)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
              <div>
                <img
                  src="/new-logo-removebg-preview.png"
                  alt="Simian Solution"
                  className="h-6 md:h-7 w-auto object-contain mb-3"
                />
                <p className="text-steel/70 text-sm leading-relaxed max-w-[30ch]">
                  Performance-driven digital marketing agency.
                </p>
              </div>

              <nav className="flex flex-col gap-2">
                <span className="text-[0.625rem] text-muted tracking-[0.15em] uppercase font-medium mb-1">
                  Navigation
                </span>
                {["Services", "Partners", "About", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-steel text-sm hover:text-simian transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-2">
                <span className="text-[0.625rem] text-muted tracking-[0.15em] uppercase font-medium mb-1">
                  Connect
                </span>
                <a
                  href="https://simiansolution.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel text-sm hover:text-simian transition-colors duration-300"
                >
                  simiansolution.com
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
              style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <p className="text-[0.625rem] text-muted tracking-wide">
                &copy; 2026 Simian Solution. All rights reserved.
              </p>
              <p className="text-[0.625rem] text-muted/60 tracking-wide max-w-[60ch] text-right">
                Results not guaranteed. Performance depends on multiple factors including
                product-market fit, offer structure, and budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

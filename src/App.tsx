import { useEffect, useRef, useCallback, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

ScrollTrigger.config({ ignoreMobileResize: true });
import Navbar from "./components/Navbar";
import HeroScroll from "./components/HeroScroll";
import Services from "./components/Services";
import Partners from "./components/Partners";
import Founder from "./components/Founder";
import WhyNotUs from "./components/WhyNotUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ContactFormModal from "./components/ContactFormModal";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Recalculate all ScrollTrigger positions after layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <Navbar onOpenForm={openForm} />
      <main>
        <HeroScroll />
        <div className="liquid-glass-world">
          <Partners />
          <Services />
          <Founder />
          <WhyNotUs />
          <Contact onOpenForm={openForm} />
          <Footer />
        </div>
      </main>
      <ContactFormModal open={formOpen} onClose={closeForm} />
    </>
  );
}

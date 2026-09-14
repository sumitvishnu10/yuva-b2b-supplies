import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CTABanner.css';

gsap.registerPlugin(ScrollTrigger);

export function CTABanner() {
  const ctaRef = useRef(null);
  const btnRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-banner-wrapper",
          start: "top 85%",
        }
      });

      // Background Expand
      tl.from(".cta-banner", {
        scale: 0.96,
        borderRadius: "24px",
        duration: 1.2,
        ease: "power3.out"
      })
        // Mask Reveal Title
        .fromTo(".cta-title",
          { y: 30, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power3.out" },
          "-=0.8"
        )
        .from(".cta-text", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.5")
        .from(".cta-actions .btn", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.4");

      // Magnetic Button (Request a Quote)
      if (btnRef.current) {
        const xTo = gsap.quickTo(btnRef.current, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(btnRef.current, "y", { duration: 0.4, ease: "power3" });

        btnRef.current.addEventListener("mousemove", (e) => {
          const rect = btnRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          xTo(x * 5);
          yTo(y * 5);
        });

        btnRef.current.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
        });
      }
    });
  }, { scope: ctaRef });

  return (
    <div className="cta-banner-wrapper" ref={ctaRef} style={{ backgroundColor: 'var(--bg-white)', padding: '2px' }}>
      <section className="cta-banner">
        <div className="cta-abstract-line"></div>

        <div className="container relative z-10">
          <div className="cta-content">
            <h2 className="cta-title">Ready to simplify your procurement?</h2>

            <p className="cta-text">
              Tell us what your business needs. Let's build a dependable supply partnership around it.
            </p>

            <div className="cta-actions">
              <a href="/#contact" className="btn btn-primary cta-btn-primary" ref={btnRef}>Request a Quote</a>
              <a href="/#contact" className="btn btn-secondary cta-btn-secondary">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

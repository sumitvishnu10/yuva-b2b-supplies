import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Difference.css';

gsap.registerPlugin(ScrollTrigger);

export function Difference() {
  const diffRef = useRef(null);

  const pillars = [
    "RELIABLE SUPPLY",
    "COMPETITIVE PRICING",
    "SINGLE-POINT PROCUREMENT",
    "RESPONSIVE SERVICE"
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Intro Reveal
      gsap.from(".diff-intro-elem", {
        scrollTrigger: {
          trigger: ".difference",
          start: "top 80%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });

      // 4-Pillar Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pillars-container",
          start: "top 60%",
          end: "bottom 40%",
          scrub: true
        }
      });

      // Make all inactive first
      gsap.set(".pillar", { color: "var(--blue-gray)", opacity: 0.4 });

      // Stagger through them
      const items = gsap.utils.toArray(".pillar");

      items.forEach((item, index) => {
        // Activate
        tl.to(item, {
          color: "var(--classic-blue)",
          opacity: 1,
          duration: 1,
          ease: "none"
        });

        // Deactivate (unless it's the last one)
        if (index < items.length - 1) {
          tl.to(item, {
            color: "var(--blue-gray)",
            opacity: 0.4,
            duration: 1,
            ease: "none"
          });
        }
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".pillar", { color: "var(--classic-blue)", opacity: 1 });
    });

  }, { scope: diffRef });

  return (
    <section id="why-us" className="difference bg-white" ref={diffRef}>
      <div className="container">
        <div className="difference-content">
          <div className="diff-intro-elem">
            <span className="section-label">THE YUVA DIFFERENCE</span>
          </div>

          <div className="diff-intro-elem">
            <h2 className="difference-title">
              Your business shouldn't have to manage dozens of suppliers for everyday essentials.
            </h2>
          </div>

          <div className="diff-intro-elem">
            <p className="difference-text">
              YUVA B2B SUPPLIES brings multiple everyday procurement requirements together through one dependable supply partner.
            </p>
          </div>

          <div className="pillars-container mt-8" style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', alignItems: 'center' }}>
            {pillars.map((pillar, i) => (
              <h3 key={i} className="pillar" style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: '700', transition: 'none' }}>
                {pillar}
              </h3>
            ))}
          </div>

          <div className="diff-intro-elem">
            <a href="/#contact" className="btn btn-primary mt-8">Talk to Our Team</a>
          </div>
        </div>
      </div>
    </section>
  );
}

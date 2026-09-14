import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Quote } from 'lucide-react';
import './VisionMission.css';

gsap.registerPlugin(ScrollTrigger);

export function VisionMission() {
  const vmRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vision-mission",
          start: "top 70%",
        }
      });

      tl.fromTo(".vm-card-vision",
        { x: -50, opacity: 0, clipPath: "inset(0 100% 0 0)" },
        { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.out" }
      )
        .fromTo(".vm-card-mission",
          { x: 50, opacity: 0, clipPath: "inset(0 0 0 100%)" },
          { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.out" },
          "-=0.9"
        );

      // Background drift
      gsap.to(".vm-background-drift", {
        scrollTrigger: {
          trigger: ".vision-mission",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        x: -100,
        y: 100,
        ease: "none"
      });
    });
  }, { scope: vmRef });

  return (
    <section className="vision-mission" ref={vmRef}>
      <div className="vm-background-curves">
        <div className="vm-background-drift"></div>
      </div>

      <div className="container relative z-10">
        <div className="vm-grid">
          <div className="vm-card vm-card-vision">
            <Quote size={48} className="vm-quote-icon" />
            <span className="vm-label">VISION</span>
            <p className="vm-text">
              "To become a trusted and preferred B2B supply partner for businesses across South India, delivering reliable products, seamless procurement and dependable service that help our customers operate, grow and succeed."
            </p>
          </div>

          <div className="vm-card vm-card-mission">
            <Quote size={48} className="vm-quote-icon" />
            <span className="vm-label">MISSION</span>
            <p className="vm-text">
              "To simplify business procurement through quality products, competitive pricing, reliable supply and responsive service — helping our customers operate better, grow faster and succeed together."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

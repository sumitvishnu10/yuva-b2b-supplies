import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './TrustStrip.css';

gsap.registerPlugin(ScrollTrigger);

export function TrustStrip() {
  const stripRef = useRef(null);
  
  const metrics = [
    { value: "6", label: "PRODUCT CATEGORIES" },
    { value: "10", label: "INDUSTRIES SERVED" },
    { value: "SINGLE-POINT", label: "PROCUREMENT PARTNER" },
    { value: "RELIABLE", label: "BUSINESS SUPPLY" }
  ];

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".ts-item", {
        scrollTrigger: {
          trigger: ".trust-strip",
          start: "top 90%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    });
  }, { scope: stripRef });

  return (
    <div className="trust-strip" ref={stripRef}>
      <div className="container">
        <div className="trust-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="trust-item ts-item">
              <span className="trust-value">{metric.value}</span>
              <span className="trust-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
